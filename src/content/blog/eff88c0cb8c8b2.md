---
title: "[分散システム] Transactional Outbox パターンの復習"
pubDate: "2025-10-05"
description: ""
author: "Takumi"
image:
  url: "/blog-placeholder-1.jpg"
  alt: "ブログのプレースホルダー画像"
categories: ["分散システム", "outbox"]
---

業務でTransactional Outboxパターンを使う機会があったのでそれの復習

## 雑メモ
- outboxパターンとは
  - データベース更新とメッセージ送信をアトミックに行うための分散システムにおけるアーキテクチャパターン
- 解決する問題
  - 業務データベースの更新とメッセージ送信（例えば通知とか）の不整合
    - データベース更新できてるけど通知が送信されない
    - データベース更新できてないのに通知が送信される
- 仕組み
  - 登場コンポーネント
    - Sender→メッセージを送信するサービス
    - Database→ORDERテーブルと送信メッセージを格納するOUTBOXテーブル
    - Message Relay→OUTBOXのレコードをMessage Brokerに送信する（パブリッシュする）
    - Message Broker

![alt text](<../../assets/outbox.png>)
(出典元: [microservices.io](https://microservices.io/patterns/data/transactional-outbox.html))

  - データベース更新（図のORDERテーブル）と送信したいメッセージの記録（OUTBOXテーブル）を同一トランザクションで実行する 
  - メッセージ送信はトランザクション外で非同期に行い、再送・冪等処理で整合をとる
- Q&A
  - トランザクション内でメッセージ送信すると信頼性が保証されないのはなぜか？
    - トランザクションがコミットされる保証はなく、コミットはされないがメッセージ送信がされる可能性がある。また、コミットされたがメッセージ送信前にクラッシュしてメッセージが送信されない可能性もある。
  - 2PCでアトミックに処理できないのか？
    - 理論上は可能だが、データベースやメッセージブローカーが2PCをサポートしていない可能性がある。Kafka/PubSub等はXAに対応しておらずOutboxパターンを使う方が現実的
      - XA→分散トランザクションの標準

## 参考資料
- [Pattern: Transactional outbox](https://microservices.io/patterns/data/transactional-outbox.html)
- [Cloud SpannerとCloud Pub/Subとで実装するTransactional outboxパターン](https://engineering.mercari.com/blog/entry/20211221-transactional-outbox/)
