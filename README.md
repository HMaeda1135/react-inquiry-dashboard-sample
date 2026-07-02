# Web制作相談ダッシュボード

## 概要

React / TypeScriptで作成した、Web制作相談を管理する架空ダッシュボードサンプルです。ポートフォリオ掲載用に、相談一覧、検索・絞り込み、ステータス管理、詳細モーダル、メモ編集、localStorage保存など、業務画面で使われる基本的なUIと状態管理を実装しています。

## 使用技術

- React 19
- TypeScript
- Vite
- CSS（App.css）

## このサンプルで確認できること

- 相談データの一覧表示（PC: テーブル / スマホ: カード）
- キーワード検索（タイトル・顧客名・概要）
- ステータス・カテゴリ・優先度による絞り込み
- 10件単位のページネーション
- 優先度フィルター
- 検索・絞り込み条件に応じた表示件数の更新
- サマリーカードによる件数表示
- 共通 `Select` コンポーネントによるセレクトボックス（カスタム矢印アイコン付き）
- 詳細モーダルでのステータス・メモ編集
- localStorage へのデータ永続化
- サンプルデータへのリセット機能
- モーダルのアクセシビリティ対応（Escキー、背景クリック、スクロール抑制）

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

ビルド成果物は `dist` フォルダに出力されます。プレビューする場合は以下を実行します。

```bash
npm run preview
```

## 主なファイル構成

```
src/
├─ components/
│  ├─ Header.tsx          # ヘッダー
│  ├─ SummaryCards.tsx    # サマリーカード
│  ├─ FilterPanel.tsx     # 検索・絞り込み
│  ├─ Select.tsx          # 共通セレクトボックス
│  ├─ InquiryList.tsx     # 相談一覧
│  ├─ InquiryCard.tsx     # 相談カード（スマホ表示）
│  ├─ Pagination.tsx      # ページネーション
│  ├─ InquiryModal.tsx    # 詳細モーダル
│  └─ Footer.tsx          # フッター
├─ data/
│  └─ inquiries.ts        # モックデータ
├─ types/
│  └─ inquiry.ts          # 型定義
├─ utils/
│  ├─ storage.ts          # localStorage 操作
│  └─ inquiryDisplay.ts   # 表示用ヘルパー
├─ App.tsx                # メインコンポーネント
├─ App.css                # スタイル
└─ main.tsx               # エントリーポイント
```

## 共通 Select コンポーネント

セレクトボックスは `src/components/Select.tsx` に共通コンポーネントとして切り出しています。

- **利用箇所:** フィルターパネル（ステータス・カテゴリ・優先度）、詳細モーダル（ステータス変更）
- **スタイル:** ブラウザ標準の矢印を非表示にし、SVG のカスタムシェブロンアイコンを適用（`App.css` の `.select`）
- **props:** `id` / `label` / `value` / `options` / `onChange` に加え、ラッパーのクラス指定用 `className`、セレクト直下の追加表示用 `footer` に対応
- **型:** ジェネリクス `Select<T>` で選択値の型を指定可能（例: `Select<InquiryStatus>`）

## 補足

このアプリは実在する業務システムではなく、ポートフォリオ掲載用の架空ダッシュボードサンプルです。実在する顧客情報は含まれていません。

## 参考

- [React 公式ドキュメント](https://react.dev/)
- [Vite 公式ドキュメント](https://vite.dev/)
- [TypeScript 公式ドキュメント](https://www.typescriptlang.org/)
