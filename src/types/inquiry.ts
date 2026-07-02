export type InquiryStatus = '未対応' | '対応中' | '完了';
export type InquiryPriority = '低' | '中' | '高';
export type InquiryCategory = '新規制作' | '修正・改善' | '機能追加' | 'フロントエンド実装';

export type Inquiry = {
  id: number;
  title: string;
  clientName: string;
  category: InquiryCategory;
  status: InquiryStatus;
  priority: InquiryPriority;
  receivedAt: string;
  summary: string;
  memo: string;
};

export const INQUIRY_STATUSES: InquiryStatus[] = ['未対応', '対応中', '完了'];
export const INQUIRY_PRIORITIES: InquiryPriority[] = ['低', '中', '高'];
export const INQUIRY_CATEGORIES: InquiryCategory[] = [
  '新規制作',
  '修正・改善',
  '機能追加',
  'フロントエンド実装',
];
