import type { Inquiry } from '../types/inquiry';
import { formatDate } from '../utils/inquiryDisplay';
import { EmptyState } from './EmptyState';
import { InquiryCard } from './InquiryCard';
import { Pagination } from './Pagination';
import { PriorityBadge } from './PriorityBadge';
import { StatusBadge } from './StatusBadge';

type InquiryListProps = {
  inquiries: Inquiry[];
  totalItems: number;
  selectedId: number | null;
  currentPage: number;
  totalPages: number;
  rangeStart: number;
  rangeEnd: number;
  onPageChange: (page: number) => void;
  onSelect: (inquiry: Inquiry) => void;
};

export function InquiryList({
  inquiries,
  totalItems,
  selectedId,
  currentPage,
  totalPages,
  rangeStart,
  rangeEnd,
  onPageChange,
  onSelect,
}: InquiryListProps) {
  return (
    <section className="inquiry-list" aria-label="問い合わせ一覧">
      <div className="inquiry-list__header">
        <div>
          <h2 className="inquiry-list__heading">問い合わせ一覧</h2>
          <p className="inquiry-list__subheading">行を選択すると詳細を確認できます</p>
        </div>
        {totalItems > 0 && <span className="inquiry-list__count">{totalItems}件</span>}
      </div>

      {totalItems === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="inquiry-list__table-wrap">
            <table className="inquiry-table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">相談者名</th>
                  <th scope="col">会社 / 種別</th>
                  <th scope="col">件名</th>
                  <th scope="col">カテゴリ</th>
                  <th scope="col">ステータス</th>
                  <th scope="col">優先度</th>
                  <th scope="col">受信日</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inquiry) => {
                  const isSelected = inquiry.id === selectedId;
                  return (
                    <tr
                      key={inquiry.id}
                      className={isSelected ? 'inquiry-table__row--selected' : undefined}
                    >
                      <td>
                        <button
                          type="button"
                          className="inquiry-table__select"
                          onClick={() => onSelect(inquiry)}
                          aria-pressed={isSelected}
                        >
                          #{String(inquiry.id).padStart(4, '0')}
                        </button>
                      </td>
                      <td>{inquiry.contactName}</td>
                      <td className="inquiry-table__company">{inquiry.companyOrType}</td>
                      <td className="inquiry-table__subject">{inquiry.subject}</td>
                      <td>
                        <span className="category-badge">{inquiry.category}</span>
                      </td>
                      <td>
                        <StatusBadge status={inquiry.status} />
                      </td>
                      <td>
                        <PriorityBadge priority={inquiry.priority} />
                      </td>
                      <td className="inquiry-table__date">{formatDate(inquiry.receivedAt)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="inquiry-list__cards">
            {inquiries.map((inquiry) => (
              <InquiryCard
                key={inquiry.id}
                inquiry={inquiry}
                isSelected={inquiry.id === selectedId}
                onSelect={onSelect}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            onPageChange={onPageChange}
          />
        </>
      )}
    </section>
  );
}
