import type { Inquiry } from '../types/inquiry';

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function statusClass(status: Inquiry['status']): string {
  switch (status) {
    case '未対応':
      return 'badge badge--pending';
    case '対応中':
      return 'badge badge--progress';
    case '完了':
      return 'badge badge--completed';
  }
}

export function priorityClass(priority: Inquiry['priority']): string {
  switch (priority) {
    case '高':
      return 'badge badge--priority-high';
    case '中':
      return 'badge badge--priority-medium';
    case '低':
      return 'badge badge--priority-low';
  }
}
