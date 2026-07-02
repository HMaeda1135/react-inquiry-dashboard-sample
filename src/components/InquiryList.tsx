import type { Inquiry } from '../types/inquiry';
import { formatDate, priorityClass, statusClass } from '../utils/inquiryDisplay';
import { InquiryCard } from './InquiryCard';
import { Pagination } from './Pagination';

type InquiryListProps = {
  inquiries: Inquiry[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
  rangeStart: number;
  rangeEnd: number;
  onPageChange: (page: number) => void;
  onOpenDetail: (inquiry: Inquiry) => void;
};

export function InquiryList({
  inquiries,
  totalItems,
  currentPage,
  totalPages,
  rangeStart,
  rangeEnd,
  onPageChange,
  onOpenDetail,
}: InquiryListProps) {
  if (totalItems === 0) {
    return (
      <section className="inquiry-list" aria-label="相談一覧">
        <div className="inquiry-list__header">
          <h2 className="inquiry-list__heading">相談一覧</h2>
        </div>
        <div className="inquiry-list__empty">
          <p>条件に一致する相談はありません。</p>
        </div>
        <Pagination
          currentPage={1}
          totalPages={1}
          totalItems={0}
          rangeStart={0}
          rangeEnd={0}
          onPageChange={onPageChange}
        />
      </section>
    );
  }

  return (
    <section className="inquiry-list" aria-label="相談一覧">
      <div className="inquiry-list__header">
        <h2 className="inquiry-list__heading">相談一覧</h2>
        <span className="inquiry-list__count">{totalItems}件</span>
      </div>

      <div className="inquiry-list__table-wrap">
        <table className="inquiry-table">
          <thead>
            <tr>
              <th scope="col">タイトル</th>
              <th scope="col">顧客名</th>
              <th scope="col">カテゴリ</th>
              <th scope="col">ステータス</th>
              <th scope="col">優先度</th>
              <th scope="col">受付日</th>
              <th scope="col">概要</th>
              <th scope="col">
                <span className="visually-hidden">操作</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inquiry) => (
              <tr key={inquiry.id}>
                <td className="inquiry-table__title">{inquiry.title}</td>
                <td>{inquiry.clientName}</td>
                <td>
                  <span className="badge badge--category">{inquiry.category}</span>
                </td>
                <td>
                  <span className={statusClass(inquiry.status)}>{inquiry.status}</span>
                </td>
                <td>
                  <span className={priorityClass(inquiry.priority)}>{inquiry.priority}</span>
                </td>
                <td className="inquiry-table__date">{formatDate(inquiry.receivedAt)}</td>
                <td className="inquiry-table__summary">{inquiry.summary}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn--primary btn--sm"
                    onClick={() => onOpenDetail(inquiry)}
                  >
                    詳細を見る
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="inquiry-list__cards">
        {inquiries.map((inquiry) => (
          <InquiryCard key={inquiry.id} inquiry={inquiry} onOpenDetail={onOpenDetail} />
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
    </section>
  );
}
