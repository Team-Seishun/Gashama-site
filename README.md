# Gashama 紹介サイト

ガシャポン在庫共有・交換アプリ「Gashama」の紹介ランディングページです。
HTML / CSS / JS のみで作られた静的サイトなので、ビルド不要でそのまま GitHub Pages に公開できます。

## ファイル構成

```
gashama-site/
├── index.html
├── css/
│   └── style.css
└── js/
    └── script.js
```

## ローカルで確認する

ブラウザで `index.html` を直接開くか、簡易サーバーを立てて確認できます。

```bash
python3 -m http.server 8000
# http://localhost:8000 を開く
```

## GitHub Pages へのデプロイ手順（Deploy from a branch）

1. GitHub で新しいリポジトリを作成する（例: `gashama-site`）。Public / Private どちらでも可（Pagesを無料公開するなら Public 推奨）。
2. このフォルダの中身（`index.html` / `css/` / `js/`）をリポジトリ直下に配置し、コミット & プッシュする。

   ```bash
   cd gashama-site
   git init
   git add .
   git commit -m "Add Gashama landing page"
   git branch -M main
   git remote add origin https://github.com/<ユーザー名>/<リポジトリ名>.git
   git push -u origin main
   ```

3. GitHub 上でリポジトリの **Settings** タブを開く。
4. 左メニューの **Pages**（Code and automation セクション内）を開く。
5. **Build and deployment** の **Source** で **Deploy from a branch** を選択する。
6. **Branch** で `main` を選び、フォルダは `/ (root)` のまま **Save** をクリックする。
7. 数十秒〜数分待つと、ページ上部に公開URL（`https://<ユーザー名>.github.io/<リポジトリ名>/`）が表示される。

以降は `main` ブランチに push するたびに自動的にサイトが更新されます。

## 更新の反映

内容を編集したら、以下でプッシュするだけで反映されます。

```bash
git add .
git commit -m "Update content"
git push
```

## 補足

- 独自ドメインを使いたい場合は、Pages の設定画面の **Custom domain** 欄にドメインを入力し、DNS側にCNAME/Aレコードを設定してください。
- ビルドツール（React/Next.jsなど）を使う構成に変えた場合は、「Deploy from a branch」ではなく「GitHub Actions」をソースに選び、`actions/upload-pages-artifact` → `actions/deploy-pages` を使うワークフローに切り替えるのがおすすめです。
