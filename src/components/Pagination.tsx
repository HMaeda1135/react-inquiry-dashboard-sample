type PaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  rangeStart: number;
  rangeEnd: number;
  onPageChange: (page: number) => void;
};

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  rangeStart,
  rangeEnd,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="pagination" aria-label="ページネーション">
      <p className="pagination__info">
        {totalItems === 0
          ? '全0件中 0件を表示'
          : `全${totalItems}件中 ${rangeStart}〜${rangeEnd}件を表示`}
      </p>

      {totalPages > 1 && (
        <div className="pagination__controls">
          <button
            type="button"
            className="btn btn--outline btn--sm pagination__btn"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            aria-label="前のページへ"
          >
            前へ
          </button>

          <div className="pagination__pages" role="group" aria-label="ページ番号">
            {pages.map((page) => (
              <button
                key={page}
                type="button"
                className={`pagination__page${page === currentPage ? ' pagination__page--active' : ''}`}
                onClick={() => onPageChange(page)}
                aria-label={`${page}ページ目`}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="btn btn--outline btn--sm pagination__btn"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            aria-label="次のページへ"
          >
            次へ
          </button>
        </div>
      )}
    </nav>
  );
}
