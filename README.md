# 問い合わせ管理ダッシュボード

## 概要

React / TypeScriptで作成した、Web制作相談を想定した問い合わせ管理ダッシュボードの架空サンプルです。ポートフォリオ掲載用に、サイドバー付きの業務画面レイアウト、サマリーカード、一覧・検索・フィルター、詳細パネル（PC）/ モーダル（スマホ）、ステータス・優先度・メモの編集、localStorage保存などを実装しています。

## 使用技術

- React 19
- TypeScript
- Vite
- CSS（App.css）

## このサンプルで確認できること

- サイドバー + メインエリアの業務画面レイアウト
- サマリーカード（総数・未対応・対応中・完了・高優先度・今週の新規）
- 問い合わせ一覧（PC: テーブル / スマホ: カード）
- キーワード検索（氏名・会社名・件名・本文）
- ステータス・カテゴリ・優先度フィルター
- 10件単位のページネーション
- 選択行ハイライト・詳細パネル / モーダル表示
- ステータス・優先度・メモの編集と localStorage 保存
- 空状態（該当なし）表示
- 共通 Select コンポーネント（カスタム矢印アイコン付き）
- アクセシビリティ対応（label、aria属性、キーボード操作）

## セットアップ

```bash
npm install
```

## 起動方法

```bash
npm run dev
```

ブラウザで表示されたローカルURL（通常は `http://localhost:5173`）にアクセスしてください。

## ビルド

```bash
npm run build
```

## 主なファイル構成

```
src/
├─ components/
│  ├─ AppHeader.tsx        # ヘッダー
│  ├─ Sidebar.tsx          # サイドナビゲーション
│  ├─ SummaryCards.tsx     # サマリーカード
│  ├─ InquiryFilters.tsx   # 検索・フィルター
│  ├─ InquiryList.tsx      # 問い合わせ一覧
│  ├─ InquiryCard.tsx      # カード表示（スマホ）
│  ├─ InquiryDetail.tsx    # 詳細パネル / モーダル
│  ├─ StatusBadge.tsx      # ステータスバッジ
│  ├─ PriorityBadge.tsx    # 優先度バッジ
│  ├─ EmptyState.tsx       # 空状態
│  ├─ Select.tsx           # 共通セレクトボックス
│  ├─ Pagination.tsx       # ページネーション
│  └─ Footer.tsx           # フッター
├─ data/
│  └─ inquiries.ts         # モックデータ
├─ types/
│  └─ inquiry.ts           # 型定義
├─ utils/
│  ├─ storage.ts           # localStorage 操作
│  └─ inquiryDisplay.ts    # 表示用ヘルパー
├─ assets/
│  └─ select-chevron.svg   # セレクト矢印アイコン
├─ App.tsx
├─ App.css
└─ main.tsx
```

## 共通 Select コンポーネント

セレクトボックスは `src/components/Select.tsx` に共通コンポーネントとして切り出しています。矢印アイコンは `src/assets/select-chevron.svg` を参照しています。

## 補足

このアプリは実在する業務システムではなく、ポートフォリオ掲載用の架空ダッシュボードサンプルです。実在する顧客情報は含まれておらず、実際の送信・保存処理は行いません。

## 参考

- [React 公式ドキュメント](https://react.dev/)
- [Vite 公式ドキュメント](https://vite.dev/)
- [TypeScript 公式ドキュメント](https://www.typescriptlang.org/)
