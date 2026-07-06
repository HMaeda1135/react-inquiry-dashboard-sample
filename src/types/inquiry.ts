export type InquiryStatus = '未対応' | '対応中' | '確認待ち' | '完了';
export type InquiryPriority = '高' | '中' | '低';
export type InquiryCategory =
  | 'LP制作'
  | 'WordPress修正'
  | 'React画面実装'
  | '既存サイト改善'
  | 'その他';

export type Inquiry = {
  id: number;
  contactName: string;
  companyOrType: string;
  subject: string;
  category: InquiryCategory;
  status: InquiryStatus;
  priority: InquiryPriority;
  receivedAt: string;
  body: string;
  memo: string;
  nextAction: string;
};

export const INQUIRY_STATUSES: InquiryStatus[] = ['未対応', '対応中', '確認待ち', '完了'];
export const INQUIRY_PRIORITIES: InquiryPriority[] = ['高', '中', '低'];
export const INQUIRY_CATEGORIES: InquiryCategory[] = [
  'LP制作',
  'WordPress修正',
  'React画面実装',
  '既存サイト改善',
  'その他',
];
