import type { InquiryCategory, InquiryPriority, InquiryStatus } from '../types/inquiry';
import { INQUIRY_CATEGORIES, INQUIRY_PRIORITIES, INQUIRY_STATUSES } from '../types/inquiry';
import { Select } from './Select';

type FilterPanelProps = {
  keyword: string;
  statusFilter: InquiryStatus | 'すべて';
  categoryFilter: InquiryCategory | 'すべて';
  priorityFilter: InquiryPriority | 'すべて';
  onKeywordChange: (value: string) => void;
  onStatusChange: (value: InquiryStatus | 'すべて') => void;
  onCategoryChange: (value: InquiryCategory | 'すべて') => void;
  onPriorityChange: (value: InquiryPriority | 'すべて') => void;
  onResetData: () => void;
};

function withAllOption<T extends string>(items: readonly T[]) {
  return [
    { value: 'すべて' as T | 'すべて', label: 'すべて' },
    ...items.map((item) => ({ value: item, label: item })),
  ];
}

export function FilterPanel({
  keyword,
  statusFilter,
  categoryFilter,
  priorityFilter,
  onKeywordChange,
  onStatusChange,
  onCategoryChange,
  onPriorityChange,
  onResetData,
}: FilterPanelProps) {
  return (
    <section className="filter" aria-label="検索・絞り込み">
      <div className="filter__field filter__field--search">
        <label htmlFor="search-keyword">キーワード検索</label>
        <input
          id="search-keyword"
          type="search"
          placeholder="タイトル・顧客名・概要で検索"
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
        />
      </div>

      <div className="filter__row">
        <Select
          id="filter-status"
          label="ステータス"
          className="filter__field"
          value={statusFilter}
          options={withAllOption(INQUIRY_STATUSES)}
          onChange={onStatusChange}
        />

        <Select
          id="filter-category"
          label="カテゴリ"
          className="filter__field"
          value={categoryFilter}
          options={withAllOption(INQUIRY_CATEGORIES)}
          onChange={onCategoryChange}
        />

        <Select
          id="filter-priority"
          label="優先度"
          className="filter__field"
          value={priorityFilter}
          options={withAllOption(INQUIRY_PRIORITIES)}
          onChange={onPriorityChange}
        />
      </div>

      <div className="filter__actions">
        <button type="button" className="btn btn--subtle" onClick={onResetData}>
          サンプルデータに戻す
        </button>
      </div>
    </section>
  );
}
