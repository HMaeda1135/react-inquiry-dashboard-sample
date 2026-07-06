import type { InquiryCategory, InquiryPriority, InquiryStatus } from '../types/inquiry';
import { INQUIRY_CATEGORIES, INQUIRY_PRIORITIES, INQUIRY_STATUSES } from '../types/inquiry';
import { Select } from './Select';

type InquiryFiltersProps = {
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

export function InquiryFilters({
  keyword,
  statusFilter,
  categoryFilter,
  priorityFilter,
  onKeywordChange,
  onStatusChange,
  onCategoryChange,
  onPriorityChange,
  onResetData,
}: InquiryFiltersProps) {
  return (
    <section className="filters" aria-label="検索・フィルター">
      <div className="filters__header">
        <h2 className="filters__title">検索・フィルター</h2>
        <p className="filters__hint">氏名、会社名、件名、本文を対象に絞り込みできます</p>
      </div>

      <div className="filters__field filters__field--search">
        <label htmlFor="search-keyword">キーワード検索</label>
        <input
          id="search-keyword"
          type="search"
          placeholder="氏名・会社名・件名・本文で検索"
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
        />
      </div>

      <div className="filters__row">
        <Select
          id="filter-status"
          label="ステータス"
          className="filters__field"
          value={statusFilter}
          options={withAllOption(INQUIRY_STATUSES)}
          onChange={onStatusChange}
        />

        <Select
          id="filter-category"
          label="カテゴリ"
          className="filters__field"
          value={categoryFilter}
          options={withAllOption(INQUIRY_CATEGORIES)}
          onChange={onCategoryChange}
        />

        <Select
          id="filter-priority"
          label="優先度"
          className="filters__field"
          value={priorityFilter}
          options={withAllOption(INQUIRY_PRIORITIES)}
          onChange={onPriorityChange}
        />
      </div>

      <div className="filters__actions">
        <button type="button" className="btn btn--subtle" onClick={onResetData}>
          サンプルデータに戻す
        </button>
      </div>
    </section>
  );
}
