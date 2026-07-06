import type { InquiryStatus } from '../types/inquiry';
import { statusVariant } from '../utils/inquiryDisplay';

type StatusBadgeProps = {
  status: InquiryStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`status-badge status-badge--${statusVariant(status)}`}>{status}</span>
  );
}
