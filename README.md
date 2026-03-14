# Next.js 画像ギャラリー（SSG）

Next.js によって作られた画像ギャラリーサイトです。**SSG（Static Site Generation）** でビルドするプロジェクトです。

## 機能

- **トップページ（/）**: ギャラリー一覧。初回表示分はビルド時に静的生成され、スクロールで追加読み込み（クライアント側）。
- **画像詳細（/image/[id]）**: `generateStaticParams` により id 0～199 のページをビルド時に静的生成。キーボード（Esc / ← →）対応。
- ヘッダーの「？」から「このギャラリーについて」モーダル表示。

## セットアップ

```bash
cd nextjs_image_gallary_site
npm install
```

## 開発

```bash
npm run dev
```

http://localhost:3000 で表示されます。

## ビルド（SSG）

```bash
npm run build
```

静的サイトとしてビルドされます。`/` と `/image/0` ～ `/image/199` がプリレンダリングされます。

## 本番プレビュー

```bash
npm run build
npm run start
```

## 技術スタック

- Next.js 15（App Router）
- TypeScript
- Tailwind CSS
- lucide-react（アイコン）

画像は Unsplash のサンプルURLを使用しています。
