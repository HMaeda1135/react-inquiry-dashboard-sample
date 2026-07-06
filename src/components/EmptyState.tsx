type EmptyStateProps = {
  title?: string;
  description?: string;
};

export function EmptyState({
  title = '条件に一致する問い合わせはありません',
  description = '検索条件やフィルターを変更してください',
}: EmptyStateProps) {
  return (
    <div className="empty-state" role="status">
      <div className="empty-state__icon" aria-hidden="true">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect x="8" y="10" width="32" height="28" rx="4" stroke="currentColor" strokeWidth="2" />
          <path d="M16 20h16M16 26h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <p className="empty-state__title">{title}</p>
      <p className="empty-state__description">{description}</p>
    </div>
  );
}
