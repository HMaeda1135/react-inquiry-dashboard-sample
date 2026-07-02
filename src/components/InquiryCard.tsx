import type { Inquiry } from '../types/inquiry';
import { formatDate, priorityClass, statusClass } from '../utils/inquiryDisplay';

type InquiryCardProps = {
  inquiry: Inquiry;
  onOpenDetail: (inquiry: Inquiry) => void;
};

export function InquiryCard({ inquiry, onOpenDetail }: InquiryCardProps) {
  return (
    <article className="inquiry-card">
      <div className="inquiry-card__header">
        <h3 className="inquiry-card__title">{inquiry.title}</h3>
        <div className="inquiry-card__badges">
          <span className={statusClass(inquiry.status)}>{inquiry.status}</span>
          <span className={priorityClass(inquiry.priority)}>優先度: {inquiry.priority}</span>
        </div>
      </div>

      <dl className="inquiry-card__meta">
        <div className="inquiry-card__meta-row">
          <dt>顧客名</dt>
          <dd>{inquiry.clientName}</dd>
        </div>
        <div className="inquiry-card__meta-row">
          <dt>カテゴリ</dt>
          <dd>
            <span className="badge badge--category">{inquiry.category}</span>
          </dd>
        </div>
        <div className="inquiry-card__meta-row">
          <dt>受付日</dt>
          <dd>{formatDate(inquiry.receivedAt)}</dd>
        </div>
      </dl>

      <p className="inquiry-card__summary">{inquiry.summary}</p>

      <button
        type="button"
        className="btn btn--primary btn--sm"
        onClick={() => onOpenDetail(inquiry)}
      >
        詳細を見る
      </button>
    </article>
  );
}
