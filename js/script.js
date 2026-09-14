// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Measure the sticky header and section-tabs bar so CSS can offset
// anchor scrolling (--sticky-h) and place the tabs bar right under the
// header once it sticks (--header-h).
const headerEl = document.querySelector(".site-header");
const sectionTabsEl = document.querySelector(".section-tabs");

const updateStickyOffsets = () => {
  const headerH = headerEl ? headerEl.offsetHeight : 0;
  const tabsH = sectionTabsEl ? sectionTabsEl.offsetHeight : 0;
  document.documentElement.style.setProperty("--header-h", `${headerH}px`);
  document.documentElement.style.setProperty("--sticky-h", `${headerH + tabsH}px`);
};

updateStickyOffsets();
window.addEventListener("resize", updateStickyOffsets);

// Shrink the hero banner and swap its catchphrase for the app overview
// once the page has scrolled a little, echoing the reference site's
// transforming hero. Toggled via a class so all animation lives in CSS.
const heroEl = document.querySelector(".hero");
if (heroEl) {
  const COMPACT_SCROLL_THRESHOLD = 10;
  let ticking = false;

  const updateHeroState = () => {
    heroEl.classList.toggle("is-compact", window.scrollY > COMPACT_SCROLL_THRESHOLD);
    ticking = false;
  };

  updateHeroState();
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(updateHeroState);
        ticking = true;
      }
    },
    { passive: true }
  );
}

// Add a shadow to the section-tabs bar once it has actually stuck to
// the header, using a 1px sentinel placed right above it.
const tabsSentinel = document.querySelector(".section-tabs-sentinel");

if ("IntersectionObserver" in window && sectionTabsEl && tabsSentinel) {
  const stuckObserver = new IntersectionObserver(
    ([entry]) => {
      sectionTabsEl.classList.toggle("is-stuck", !entry.isIntersecting);
    },
    { threshold: 0, rootMargin: `-${sectionTabsEl.offsetHeight + 1}px 0px 0px 0px` }
  );
  stuckObserver.observe(tabsSentinel);
}

// Highlight the tab link for whichever section is currently in view,
// and slide a sliding indicator bar underneath it so the current
// section is obvious at a glance (mirrors the reference site's tabs).
const tabLinks = document.querySelectorAll(".tab-link");
const tabIndicator = document.querySelector(".tab-indicator");
const tabSections = Array.from(tabLinks)
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if (tabLinks.length) {
  const moveIndicatorTo = (link) => {
    if (!tabIndicator || !link) return;
    tabIndicator.style.left = `${link.offsetLeft}px`;
    tabIndicator.style.width = `${link.offsetWidth}px`;
    tabIndicator.classList.add("is-ready");
  };

  const setActiveTab = (id) => {
    let activeLink = null;
    tabLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("is-active", isActive);
      if (isActive) activeLink = link;
    });
    moveIndicatorTo(activeLink);
  };

  // Start the indicator under the first tab so it isn't hidden before
  // the user has scrolled into any section.
  setActiveTab(tabLinks[0].getAttribute("href").slice(1));
  window.addEventListener("resize", () => {
    const current = document.querySelector(".tab-link.is-active");
    moveIndicatorTo(current || tabLinks[0]);
  });

  if ("IntersectionObserver" in window && tabSections.length) {
    const spyObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length) {
          setActiveTab(visible[0].target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    tabSections.forEach((section) => spyObserver.observe(section));
  }
}

// Subtle reveal-on-scroll for cards/sections.
// Content is fully visible by default (via the .reveal CSS class below),
// so it never depends on JavaScript running — this only adds a soft
// fade/slide polish when supported.
const revealTargets = document.querySelectorAll(
  ".pain-card, .feature-card, .step, .member-card"
);

if ("IntersectionObserver" in window && revealTargets.length) {
  revealTargets.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
  );

  revealTargets.forEach((el) => observer.observe(el));
}
