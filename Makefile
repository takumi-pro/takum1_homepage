.PHONY: new-post install-deps help

# デフォルトのヘルプコマンド
help:
	@echo "使用可能なコマンド:"
	@echo "  make new-post title='記事のタイトル' - 新しいブログ記事を作成します"
	@echo "  make install-deps - 必要な依存パッケージをインストールします"

# 新しいブログ記事を作成するコマンド
new-post:
	npm run create-post

# 依存パッケージをインストールするコマンド
install-deps:
	npm install --save-dev ts-node @types/node