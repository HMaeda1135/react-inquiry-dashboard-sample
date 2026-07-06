import { useEffect, useState, type MouseEvent } from 'react';
import type { Inquiry, InquiryPriority, InquiryStatus } from '../types/inquiry';
import { INQUIRY_PRIORITIES, INQUIRY_STATUSES } from '../types/inquiry';
import { formatDate } from '../utils/inquiryDisplay';
import { PriorityBadge } from './PriorityBadge';
import { Select } from './Select';
import { StatusBadge } from './StatusBadge';

type InquiryDetailProps = {
  inquiry: Inquiry;
  mode: 'panel' | 'modal';
  onClose?: () => void;
  onSave: (
    id: number,
    status: InquiryStatus,
    priority: InquiryPriority,
    memo: string,
  ) => void;
};

function DetailContent({
  inquiry,
  status,
  priority,
  memo,
  onStatusChange,
  onPriorityChange,
  onMemoChange,
  onSave,
  onClose,
  showCloseButton,
}: {
  inquiry: Inquiry;
  status: InquiryStatus;
  priority: InquiryPriority;
  memo: string;
  onStatusChange: (value: InquiryStatus) => void;
  onPriorityChange: (value: InquiryPriority) => void;
  onMemoChange: (value: string) => void;
  onSave: () => void;
  onClose?: () => void;
  showCloseButton: boolean;
}) {
  return (
    <>
      <div className="detail__header">
        <div>
          <p className="detail__id">ID: {String(inquiry.id).padStart(4, '0')}</p>
          <h2 className="detail__subject">{inquiry.subject}</h2>
        </div>
        {showCloseButton && onClose && (
          <button
            type="button"
            className="detail__close"
            onClick={onClose}
            aria-label="詳細を閉じる"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M4 4l8 8M12 4l-8 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
      </div>

      <dl className="detail__meta">
        <div className="detail__meta-row">
          <dt>相談者名</dt>
          <dd>{inquiry.contactName}</dd>
        </div>
        <div className="detail__meta-row">
          <dt>会社名 / 種別</dt>
          <dd>{inquiry.companyOrType}</dd>
        </div>
        <div className="detail__meta-row">
          <dt>カテゴリ</dt>
          <dd>
            <span className="category-badge">{inquiry.category}</span>
          </dd>
        </div>
        <div className="detail__meta-row">
          <dt>受信日</dt>
          <dd>{formatDate(inquiry.receivedAt)}</dd>
        </div>
        <div className="detail__meta-row detail__meta-row--badges">
          <dt>現在の状態</dt>
          <dd className="detail__badge-group">
            <StatusBadge status={status} />
            <PriorityBadge priority={priority} />
          </dd>
        </div>
      </dl>

      <section className="detail__section">
        <h3 className="detail__section-title">本文</h3>
        <p className="detail__body">{inquiry.body}</p>
      </section>

      <section className="detail__section">
        <h3 className="detail__section-title">想定される次アクション</h3>
        <p className="detail__next-action">{inquiry.nextAction}</p>
      </section>

      <section className="detail__form" aria-label="対応情報の編集">
        <h3 className="detail__section-title">対応情報の更新</h3>

        <Select<InquiryStatus>
          id={`detail-status-${inquiry.id}`}
          label="ステータス"
          className="detail__field"
          value={status}
          options={INQUIRY_STATUSES.map((s) => ({ value: s, label: s }))}
          onChange={onStatusChange}
          footer={<StatusBadge status={status} />}
        />

        <Select<InquiryPriority>
          id={`detail-priority-${inquiry.id}`}
          label="優先度"
          className="detail__field"
          value={priority}
          options={INQUIRY_PRIORITIES.map((p) => ({ value: p, label: p }))}
          onChange={onPriorityChange}
          footer={<PriorityBadge priority={priority} />}
        />

        <div className="detail__field">
          <label htmlFor={`detail-memo-${inquiry.id}`}>対応メモ</label>
          <textarea
            id={`detail-memo-${inquiry.id}`}
            rows={4}
            value={memo}
            onChange={(e) => onMemoChange(e.target.value)}
            placeholder="対応内容や確認事項を記録..."
          />
        </div>

        <button type="button" className="btn btn--primary detail__save" onClick={onSave}>
          メモを保存
        </button>
      </section>
    </>
  );
}

export function InquiryDetail({ inquiry, mode, onClose, onSave }: InquiryDetailProps) {
  const [status, setStatus] = useState<InquiryStatus>(inquiry.status);
  const [priority, setPriority] = useState<InquiryPriority>(inquiry.priority);
  const [memo, setMemo] = useState(inquiry.memo);

  useEffect(() => {
    if (mode !== 'modal' || !onClose) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [mode, onClose]);

  const handleSave = () => {
    onSave(inquiry.id, status, priority, memo);
    if (mode === 'modal' && onClose) onClose();
  };

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && onClose) onClose();
  };

  const contentProps = {
    inquiry,
    status,
    priority,
    memo,
    onStatusChange: setStatus,
    onPriorityChange: setPriority,
    onMemoChange: setMemo,
    onSave: handleSave,
    onClose,
    showCloseButton: mode === 'modal',
  };

  if (mode === 'modal') {
    return (
      <div className="detail-overlay" onClick={handleBackdropClick}>
        <div
          className="detail detail--modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`detail-title-${inquiry.id}`}
        >
          <div id={`detail-title-${inquiry.id}`} className="visually-hidden">
            {inquiry.subject}の詳細
          </div>
          <DetailContent {...contentProps} />
        </div>
      </div>
    );
  }

  return (
    <aside className="detail detail--panel" aria-label="問い合わせ詳細">
      <DetailContent {...contentProps} />
    </aside>
  );
}

export function InquiryDetailPlaceholder() {
  return (
    <aside
      className="detail detail--panel detail--placeholder"
      aria-label="問い合わせ詳細"
    >
      <div className="detail-placeholder">
        <div className="detail-placeholder__icon" aria-hidden="true">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <rect x="6" y="8" width="28" height="24" rx="3" stroke="currentColor" strokeWidth="2" />
            <path d="M12 16h16M12 22h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <p className="detail-placeholder__title">問い合わせを選択してください</p>
        <p className="detail-placeholder__text">
          一覧から項目を選ぶと、詳細情報と対応メモの編集がここに表示されます。
        </p>
      </div>
    </aside>
  );
}
