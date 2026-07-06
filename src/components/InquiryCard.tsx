import type { Inquiry } from '../types/inquiry';
import { formatDate } from '../utils/inquiryDisplay';
import { PriorityBadge } from './PriorityBadge';
import { StatusBadge } from './StatusBadge';

type InquiryCardProps = {
  inquiry: Inquiry;
  isSelected: boolean;
  onSelect: (inquiry: Inquiry) => void;
};

export function InquiryCard({ inquiry, isSelected, onSelect }: InquiryCardProps) {
  return (
    <article
      className={`inquiry-card${isSelected ? ' inquiry-card--selected' : ''}`}
    >
      <button
        type="button"
        className="inquiry-card__button"
        onClick={() => onSelect(inquiry)}
        aria-pressed={isSelected}
      >
        <div className="inquiry-card__header">
          <span className="inquiry-card__id">#{String(inquiry.id).padStart(4, '0')}</span>
          <div className="inquiry-card__badges">
            <StatusBadge status={inquiry.status} />
            <PriorityBadge priority={inquiry.priority} />
          </div>
        </div>
        <h3 className="inquiry-card__subject">{inquiry.subject}</h3>
        <dl className="inquiry-card__meta">
          <div>
            <dt>相談者</dt>
            <dd>{inquiry.contactName}</dd>
          </div>
          <div>
            <dt>会社 / 種別</dt>
            <dd>{inquiry.companyOrType}</dd>
          </div>
          <div>
            <dt>カテゴリ</dt>
            <dd>
              <span className="category-badge">{inquiry.category}</span>
            </dd>
          </div>
          <div>
            <dt>受信日</dt>
            <dd>{formatDate(inquiry.receivedAt)}</dd>
          </div>
        </dl>
        <p className="inquiry-card__body">{inquiry.body}</p>
      </button>
    </article>
  );
}
