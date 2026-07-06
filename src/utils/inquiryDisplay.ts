import type { Inquiry, InquiryPriority, InquiryStatus } from '../types/inquiry';

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function statusVariant(status: InquiryStatus): string {
  switch (status) {
    case '未対応':
      return 'pending';
    case '対応中':
      return 'progress';
    case '確認待ち':
      return 'waiting';
    case '完了':
      return 'completed';
  }
}

export function priorityVariant(priority: InquiryPriority): string {
  switch (priority) {
    case '高':
      return 'high';
    case '中':
      return 'medium';
    case '低':
      return 'low';
  }
}

export function isReceivedThisWeek(receivedAt: string, referenceDate = new Date()): boolean {
  const received = new Date(receivedAt);
  const start = new Date(referenceDate);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - 6);
  const end = new Date(referenceDate);
  end.setHours(23, 59, 59, 999);
  return received >= start && received <= end;
}

export function countByStatus(inquiries: Inquiry[], status: InquiryStatus): number {
  return inquiries.filter((inquiry) => inquiry.status === status).length;
}
