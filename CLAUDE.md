# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要
Takumiの個人ポートフォリオ・ブログサイト。Astro 5.6.0で構築され、ローカルのMarkdownファイルと外部のZenn投稿を統合して表示します。https://takumidiary.com にデプロイされています。

## よく使うコマンド

### 開発
```bash
npm run dev          # 開発サーバー起動（ポート4321）
npm run build        # 本番ビルド（./dist/へ出力）
npm run preview      # 本番ビルドのプレビュー
```

### コンテンツ作成
```bash
npm run create-post  # 新しいブログ記事を作成（自動でスラッグ生成）
# または
make new-post        # Makefileを使った代替方法
```

## アーキテクチャ概要

### 技術スタック
- **フレームワーク**: Astro 5.6.0（静的サイトジェネレーター）
- **スタイリング**: Tailwind CSS 4.1.3（Viteプラグイン統合）
- **言語**: TypeScript（strict設定）
- **コンテンツ**: Markdown（Shikiシンタックスハイライト、Mermaidダイアグラム対応）

### コンテンツ管理システム
Astroのコンテンツコレクションを使用した型安全なコンテンツ管理：

1. **ブログ記事** (`src/content/blog/`): ローカルのMarkdownファイル
   - スキーマ定義: `src/content/config.ts`
   - 動的ルーティング: `src/pages/posts/[slug].astro`
   - RSSフィード生成機能
   - カテゴリとAI生成コンテンツのラベリング対応

2. **作品** (`src/content/works/`): ポートフォリオアイテム
   - 作品ページでカスタムスタイリングで表示

3. **外部投稿**: Zennプラットフォームとの統合
   - データ取得元: `src/data/zenn-posts.ts`
   - 投稿ページでローカル投稿と統合表示

### 主要コンポーネント構成

**レイアウトシステム**:
- `src/layouts/Layout.astro`: SEOメタタグ、Open Graph、Twitterカード対応のベースレイアウト

**ページコンポーネント**:
- ホームページ (`src/pages/index.astro`): 年齢計算、プロフィール、最近の投稿を表示
- 投稿ページ: ローカルとZennの投稿を統合表示
- 個別投稿ページ: シンタックスハイライト付きMarkdownレンダリング

**コンポーネント構造**:
- 再利用可能コンポーネント: `src/components/`
- UIプリミティブ: `src/components/ui/`
- リストコンポーネント: 投稿と作品のレンダリング処理

### ルーティングとデータフロー
1. 静的ルート: `src/pages/`で定義
2. 動的ブログルート: コンテンツコレクションから生成
3. コンテンツ: ビルド時に取得（静的生成）
4. 外部Zenn投稿: 静的データインポートで統合

### スタイリングとテーマ
- グローバルスタイル: `src/styles/global.css`
- Tailwind CSS: ユーティリティファーストスタイリング
- カスタムフォント: M PLUS Rounded 1c
- アイコンシステム: astro-icon統合

### ビルドプロセス
- TypeScriptコンパイル（パスエイリアス: `@/*` → `./src/*`）
- Astroが処理:
  - 静的サイト生成
  - アセット最適化
  - サイトマップ生成
  - RSSフィード作成
- 出力ディレクトリ: `./dist/`

## 重要なパターン

### 新しいブログ記事の作成
提供されているスクリプトの動作:
1. crypto.randomUUID()でユニークなスラッグ生成
2. 適切なfrontmatterを持つMarkdownファイル作成
3. エディタでファイルを開く

### 外部コンテンツソースの追加
`src/data/zenn-posts.ts`のパターンに従う:
1. コンテンツ用のTypeScriptインターフェース定義
2. 静的データ配列をエクスポート
3. ページコンポーネントでインポートして統合

### コンポーネント開発
- 静的コンポーネントには`.astro`ファイルを使用
- 既存のprops型定義パターンに従う
- コンテンツ投影にはAstroのコンポーネントスロットを活用
- コンポーネントは集中的で再利用可能に保つ