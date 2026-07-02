import { initialInquiries } from '../data/inquiries';
import type { Inquiry } from '../types/inquiry';

const STORAGE_KEY = 'inquiry-dashboard-data';

export function loadInquiries(): Inquiry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Inquiry[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // localStorage の読み込みに失敗した場合は初期データを返す
  }
  return [...initialInquiries];
}

export function saveInquiries(inquiries: Inquiry[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiries));
}

export function resetInquiries(): Inquiry[] {
  localStorage.removeItem(STORAGE_KEY);
  return [...initialInquiries];
}
