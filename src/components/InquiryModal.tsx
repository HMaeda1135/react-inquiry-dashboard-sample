import { useEffect, useState, type MouseEvent } from 'react';
import type { Inquiry, InquiryPriority, InquiryStatus } from '../types/inquiry';
import { INQUIRY_PRIORITIES, INQUIRY_STATUSES } from '../types/inquiry';
import { formatDate, priorityClass, statusClass } from '../utils/inquiryDisplay';
import { Select } from './Select';

type InquiryModalProps = {
  inquiry: Inquiry;
  onClose: () => void;
  onSave: (id: number, status: InquiryStatus, priority: InquiryPriority, memo: string) => void;
};

export function InquiryModal({ inquiry, onClose, onSave }: InquiryModalProps) {
  const [status, setStatus] = useState<InquiryStatus>(inquiry.status);
  const [priority, setPriority] = useState<InquiryPriority>(inquiry.priority);
  const [memo, setMemo] = useState(inquiry.memo);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSave = () => {
    onSave(inquiry.id, status, priority, memo);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal__header">
          <h2 id="modal-title" className="modal__title">
            相談詳細
          </h2>
          <button
            type="button"
            className="modal__close"
            onClick={onClose}
            aria-label="モーダルを閉じる"
          >
            <svg
              className="modal__close-icon"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              aria-hidden="true"
            >
              <path
                d="M4 4l8 8M12 4l-8 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="modal__body">
          <dl className="modal__details">
            <div className="modal__detail-row">
              <dt>タイトル</dt>
              <dd>{inquiry.title}</dd>
            </div>
            <div className="modal__detail-row">
              <dt>顧客名</dt>
              <dd>{inquiry.clientName}</dd>
            </div>
            <div className="modal__detail-row">
              <dt>カテゴリ</dt>
              <dd>
                <span className="badge badge--category">{inquiry.category}</span>
              </dd>
            </div>
            <div className="modal__detail-row">
              <dt>受付日</dt>
              <dd>{formatDate(inquiry.receivedAt)}</dd>
            </div>
            <div className="modal__detail-row modal__detail-row--full">
              <dt>概要</dt>
              <dd>{inquiry.summary}</dd>
            </div>
          </dl>

          <div className="modal__form">
            <Select<InquiryStatus>
              id="modal-status"
              label="ステータス"
              className="modal__field"
              value={status}
              options={INQUIRY_STATUSES.map((s) => ({ value: s, label: s }))}
              onChange={(value) => setStatus(value)}
              footer={
                <span className={`modal__status-preview ${statusClass(status)}`}>{status}</span>
              }
            />

            <Select<InquiryPriority>
              id="modal-priority"
              label="優先度"
              className="modal__field"
              value={priority}
              options={INQUIRY_PRIORITIES.map((p) => ({ value: p, label: p }))}
              onChange={(value) => setPriority(value)}
              footer={
                <span className={`modal__status-preview ${priorityClass(priority)}`}>
                  {priority}
                </span>
              }
            />

            <div className="modal__field">
              <label htmlFor="modal-memo">メモ</label>
              <textarea
                id="modal-memo"
                rows={4}
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="対応メモを入力..."
              />
            </div>
          </div>
        </div>

        <div className="modal__footer">
          <button type="button" className="btn btn--outline" onClick={onClose}>
            キャンセル
          </button>
          <button type="button" className="btn btn--primary" onClick={handleSave}>
            保存
          </button>
        </div>
      </div>
    </div>
  );
}
