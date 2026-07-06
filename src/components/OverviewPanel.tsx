import type { Inquiry } from '../types/inquiry';
import { INQUIRY_STATUSES } from '../types/inquiry';
import { countByStatus, formatDate } from '../utils/inquiryDisplay';
import { StatusBadge } from './StatusBadge';

type OverviewPanelProps = {
  inquiries: Inquiry[];
  onGoToInquiries: () => void;
};

export function OverviewPanel({ inquiries, onGoToInquiries }: OverviewPanelProps) {
  const recentInquiries = [...inquiries]
    .sort((a, b) => b.receivedAt.localeCompare(a.receivedAt))
    .slice(0, 3);

  return (
    <section className="overview" aria-label="概要">
      <div className="overview__section">
        <div className="overview__section-header">
          <h2 className="overview__title">最近の問い合わせ</h2>
          <p className="overview__subtitle">直近で受信した相談内容です</p>
        </div>
        <ul className="overview-recent">
          {recentInquiries.map((inquiry) => (
            <li key={inquiry.id} className="overview-recent__item">
              <div className="overview-recent__meta">
                <span className="overview-recent__id">
                  #{String(inquiry.id).padStart(4, '0')}
                </span>
                <StatusBadge status={inquiry.status} />
              </div>
              <p className="overview-recent__subject">{inquiry.subject}</p>
              <p className="overview-recent__info">
                {inquiry.contactName} ・ {formatDate(inquiry.receivedAt)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="overview__section">
        <div className="overview__section-header">
          <h2 className="overview__title">ステータス別の状況</h2>
          <p className="overview__subtitle">現在の対応状況の内訳です</p>
        </div>
        <ul className="overview-status">
          {INQUIRY_STATUSES.map((status) => (
            <li key={status} className="overview-status__item">
              <StatusBadge status={status} />
              <span className="overview-status__count">
                {countByStatus(inquiries, status)}件
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="overview__actions">
        <button type="button" className="btn btn--primary" onClick={onGoToInquiries}>
          問い合わせ一覧を見る
        </button>
      </div>
    </section>
  );
}
