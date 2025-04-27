---
title: "ruby:3.4.2-slimイメージをいじってrails環境に必要なパッケージを探ってみる"
pubDate: "2025-04-27"
description: ""
author: "Takumi"
image:
  url: "/blog-placeholder-1.jpg"
  alt: "ブログのプレースホルダー画像"
categories: ["Rails", "Ruby", "Docker", "コンテナ"]
---

Dockerfile作成
```dockerfile
FROM ruby:3.4.2-slim
```

imageビルド

```bash
docker image build . -t ruby_slim
```

コンテナ起動&接続
```bash
docker container run -it ruby_slim /bin/bash
```

準備 OK

## 必要なパッケージを探る

**osバージョン確認**
```bash
cat /etc/os-release 
PRETTY_NAME="Debian GNU/Linux 12 (bookworm)"
NAME="Debian GNU/Linux"
VERSION_ID="12"
VERSION="12 (bookworm)"
VERSION_CODENAME=bookworm
ID=debian
HOME_URL="https://www.debian.org/"
SUPPORT_URL="https://www.debian.org/support"
BUG_REPORT_URL="https://bugs.debian.org/"
```

**bundlerはインストール済み**
```bash
which bundle
-> /usr/local/bin/bundle
```

**パッケージの更新**
```bash
apt-get update 
```

**build-essential install**
Cコンパイラやmakeなど、ネイティブ拡張をコンパイルするために必要らしい
```bash
apt-get install -y build-essential
```

**db client**
dbはmysqlを使用したいので`libmysqlclient-dev` をインストールしようとしたが、以下のエラー
```bash
Package libmysqlclient-dev is not available, but is referred to by another package.
This may mean that the package is missing, has been obsoleted, or
is only available from another source
However the following packages replace it:
  libmariadb-dev-compat libmariadb-dev

E: Package 'libmysqlclient-dev' has no installation candidate
```

`libmariadb-dev-compact`, `libmariadb-dev` どちらか置き換えれば行けそう

devの方をインストール
compactで試してみたけど以下のエラー発生
```bash
An error occurred while installing mysql2 (0.5.6), and Bundler cannot continue.
In Gemfile:
  mysql2
```

```bash
apt-get install libmariadb-dev
```

**curl, git, vim install**
```bash
apt-get install curl git vim
```

**rails install**
```bash
gem install rails
 
rails --version
Rails 8.0.1
 ```
👍

**rails new**
rails newでプロジェクト作成
```bash
rails new . --api -d mysql
```

以下のエラー発生
```bash
Could not find solid_cache-1.0.7, solid_queue-1.1.3, solid_cable-3.0.7, irb-1.15.1, rdoc-6.12.0, psych-5.2.3 in locally installed gems
Run `bundle install` to install missing gems.
```

bundle install実行

```bash
Fetching gem metadata from https://rubygems.org/.........
Installing psych 5.2.3 with native extensions
Gem::Ext::BuildError: ERROR: Failed to build gem native extension.

    current directory: /usr/local/bundle/gems/psych-5.2.3/ext/psych
/usr/local/bin/ruby extconf.rb
checking for pkg-config for yaml-0.1... not found
checking for yaml.h... no
yaml.h not found
*** extconf.rb failed ***
Could not create Makefile due to some reason, probably lack of necessary
libraries and/or headers.  Check the mkmf.log file for more details.  You may
need configuration options.

Provided configuration options:
        --with-opt-dir
        --without-opt-dir
        --with-opt-include=${opt-dir}/include
        --without-opt-include
        --with-opt-lib=${opt-dir}/lib
        --without-opt-lib
        --with-make-prog
        --without-make-prog
        --srcdir=.
        --curdir
        --ruby=/usr/local/bin/$(RUBY_BASE_NAME)
        --with-libyaml-source-dir
        --without-libyaml-source-dir
        --with-yaml-0.1-dir
        --without-yaml-0.1-dir
        --with-yaml-0.1-include=${yaml-0.1-dir}/include
        --without-yaml-0.1-include
        --with-yaml-0.1-lib=${yaml-0.1-dir}/lib
        --without-yaml-0.1-lib
        --with-yaml-0.1-config
        --without-yaml-0.1-config
        --with-pkg-config
        --without-pkg-config
        --with-libyaml-dir
        --without-libyaml-dir
        --with-libyaml-include=${libyaml-dir}/include
        --without-libyaml-include
        --with-libyaml-lib=${libyaml-dir}/lib
        --without-libyaml-lib

To see why this extension failed to compile, please check the mkmf.log which can be found here:

  /usr/local/bundle/extensions/aarch64-linux/3.4.0/psych-5.2.3/mkmf.log

extconf failed, exit code 1

Gem files will remain installed in /usr/local/bundle/gems/psych-5.2.3 for inspection.
Results logged to /usr/local/bundle/extensions/aarch64-linux/3.4.0/psych-5.2.3/gem_make.out

  /usr/local/lib/ruby/3.4.0/rubygems/ext/builder.rb:126:in 'Gem::Ext::Builder.run'
  /usr/local/lib/ruby/3.4.0/rubygems/ext/ext_conf_builder.rb:30:in 'Gem::Ext::ExtConfBuilder.build'
  /usr/local/lib/ruby/3.4.0/rubygems/ext/builder.rb:195:in 'Gem::Ext::Builder#build_extension'
  /usr/local/lib/ruby/3.4.0/rubygems/ext/builder.rb:229:in 'block in Gem::Ext::Builder#build_extensions'
  /usr/local/lib/ruby/3.4.0/rubygems/ext/builder.rb:226:in 'Array#each'
  /usr/local/lib/ruby/3.4.0/rubygems/ext/builder.rb:226:in 'Gem::Ext::Builder#build_extensions'
  /usr/local/lib/ruby/3.4.0/rubygems/installer.rb:844:in 'Gem::Installer#build_extensions'
  /usr/local/lib/ruby/3.4.0/bundler/rubygems_gem_installer.rb:111:in 'Bundler::RubyGemsGemInstaller#build_extensions'
  /usr/local/lib/ruby/3.4.0/bundler/rubygems_gem_installer.rb:30:in 'Bundler::RubyGemsGemInstaller#install'
  /usr/local/lib/ruby/3.4.0/bundler/source/rubygems.rb:205:in 'Bundler::Source::Rubygems#install'
  /usr/local/lib/ruby/3.4.0/bundler/installer/gem_installer.rb:55:in 'Bundler::GemInstaller#install'
  /usr/local/lib/ruby/3.4.0/bundler/installer/gem_installer.rb:17:in 'Bundler::GemInstaller#install_from_spec'
  /usr/local/lib/ruby/3.4.0/bundler/installer/parallel_installer.rb:133:in 'Bundler::ParallelInstaller#do_install'
  /usr/local/lib/ruby/3.4.0/bundler/installer/parallel_installer.rb:124:in 'block in Bundler::ParallelInstaller#worker_pool'
  /usr/local/lib/ruby/3.4.0/bundler/worker.rb:62:in 'Bundler::Worker#apply_func'
  /usr/local/lib/ruby/3.4.0/bundler/worker.rb:57:in 'block in Bundler::Worker#process_queue'
  <internal:kernel>:168:in 'Kernel#loop'
  /usr/local/lib/ruby/3.4.0/bundler/worker.rb:54:in 'Bundler::Worker#process_queue'
  /usr/local/lib/ruby/3.4.0/bundler/worker.rb:90:in 'block (2 levels) in Bundler::Worker#create_threads'

An error occurred while installing psych (5.2.3), and Bundler cannot continue.

In Gemfile:
  debug was resolved to 1.10.0, which depends on
    irb was resolved to 1.15.1, which depends on
      rdoc was resolved to 6.12.0, which depends on
        psych
```

どうやらruby 3.2.0でlibyamlのような3rdパティライブラリの同梱は廃止されたみたい
なので自分でlibyaml-devをインストールする
```bash
apt-get install libyaml-dev
```

その後にbundle installでOK!

**rails s**
rails sでサーバ起動
```bash
rails s -b 0.0.0.0 -p 3000
```

アクセスするとNotEstablishedエラー
mysqlは別コンテナで動かす想定なのでOK
[https://scrapbox.io/files/67c2a32aa0d3be108fa28b3c.png]

## Dockerfile作成
上記を参考にしてDockerfile作っていく
rails newするとDockerfileは上書きされるのでファイル名はDockerfile.devとしておく
```dockerfile
FROM ruby:3.4.2-slim

RUN apt-get update -y && \
    apt-get install -y build-essential \
    libmariadb-dev \
    libyaml-dev \
    curl \
    git \
    vim

WORKDIR /app

COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock

RUN bundle install

COPY . /app
```

compose.yaml
```yaml
version: '3'
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - .:/app
    command: bash -c "rm -f tmp/pids/server.pid && bundle exec rails s -b 0.0.0.0"
    depends_on:
      - mysql
    environment:
      - MYSQL_HOST=mysql
      - MYSQL_PORT=3306
      - MYSQL_USER=root
      - MYSQL_PASSWORD=password
      - MYSQL_DATABASE=app_development

  mysql:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=password
      - MYSQL_DATABASE=app_development
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

Dockerfile内でGemfileとGemfile.lockのコピーが必要なので作成
```gemfile
source "https://rubygems.org"
gem "rails", "~> 8.0.1"
```

Gemfile.lockは空のまま

docker container run
```bash
 docker-compose run app rails new . --api --database=mysql
```

これで実行するとGemfileをoverrideするかどうか聞かれるのでYes
```bash
Overwrite /app/Gemfile? (enter "h" for help) [Ynaqdhm] Y
```

Gemfileが更新されたため再度bundle installするためにdocker compose build
その後にdocker compose up -dでlocalhost:3000にアクセスすると以下の画面

[https://scrapbox.io/files/67c2b75a47461a24306c4213.png]

🎉🎉🎉🎉
