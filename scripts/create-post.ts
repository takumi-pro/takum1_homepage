import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// 設定
const POSTS_DIR = path.join(process.cwd(), 'src/content/blog');

// slugを生成 (crypto.randomBytesを使用)
const randomSlug = crypto.randomBytes(7).toString('hex');

// ファイル名を作成
const fileName = `${randomSlug}.md`;
const filePath = path.join(POSTS_DIR, fileName);

// 現在の日時を取得
const now = new Date();
const formattedDate = now.toISOString().split('T')[0]; // YYYY-MM-DD 形式

// フロントマターを含む記事テンプレート
const template = `---
title: "slug:${randomSlug}"
pubDate: "${formattedDate}"
description: ""
author: "Takumi"
image:
  url: "/blog-placeholder-1.jpg"
  alt: "ブログのプレースホルダー画像"
tags: []
---

ここに記事の内容を書きます。
`;

// ディレクトリが存在するか確認し、なければ作成
if (!fs.existsSync(POSTS_DIR)) {
  fs.mkdirSync(POSTS_DIR, { recursive: true });
}

// ファイルを書き込む
fs.writeFileSync(filePath, template);

console.log(`✅ 新しい記事が作成されました: ${filePath}`);
console.log(`🔗 slug: ${randomSlug}`);