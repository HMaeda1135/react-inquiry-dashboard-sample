import type { InquiryPriority } from '../types/inquiry';
import { priorityVariant } from '../utils/inquiryDisplay';

type PriorityBadgeProps = {
  priority: InquiryPriority;
};

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  return (
    <span className={`priority-badge priority-badge--${priorityVariant(priority)}`}>
      {priority}
    </span>
  );
}
