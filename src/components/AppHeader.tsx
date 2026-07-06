export function AppHeader() {
  return (
    <header className="app-header">
      <div className="app-header__inner">
        <div className="app-header__main">
          <div className="app-header__badges">
            <span className="app-header__badge">React / TypeScript Sample</span>
            <span className="app-header__badge app-header__badge--subtle">自主制作サンプル</span>
          </div>
          <h1 className="app-header__title">問い合わせ管理ダッシュボード</h1>
          <p className="app-header__description">
            Web制作相談を想定した問い合わせ管理UIです。ステータス、カテゴリ、優先度で相談内容を整理できます。
            React / TypeScriptによる業務画面UIの実装サンプルです。
          </p>
        </div>
      </div>
    </header>
  );
}
