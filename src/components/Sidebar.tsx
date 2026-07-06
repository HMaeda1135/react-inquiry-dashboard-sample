import type { ActiveTab } from '../types/navigation';

type SidebarProps = {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
};

const TABS: { id: ActiveTab; label: string; icon: string }[] = [
  { id: 'overview', label: '概要', icon: '▦' },
  { id: 'inquiries', label: '問い合わせ一覧', icon: '☰' },
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="sidebar" aria-label="サイドナビゲーション">
      <nav className="sidebar__nav">
        <p className="sidebar__label">メニュー</p>
        <ul className="sidebar__list" role="tablist" aria-label="画面切り替え">
          {TABS.map((tab) => (
            <li key={tab.id} role="presentation">
              <button
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                className={`sidebar__item${activeTab === tab.id ? ' sidebar__item--active' : ''}`}
                onClick={() => onTabChange(tab.id)}
              >
                <span className="sidebar__icon" aria-hidden="true">
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
        <p className="sidebar__note">
          実際の送信・保存処理は行わない自主制作サンプルです
        </p>
      </nav>
    </aside>
  );
}
