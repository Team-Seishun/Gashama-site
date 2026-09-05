// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Subtle reveal-on-scroll for cards/sections.
// Content is fully visible by default (via the .reveal CSS class below),
// so it never depends on JavaScript running — this only adds a soft
// fade/slide polish when supported.
const revealTargets = document.querySelectorAll(
  ".pain-card, .feature-card, .step, .team-card"
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
