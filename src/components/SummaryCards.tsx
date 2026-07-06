import type { Inquiry } from '../types/inquiry';
import {
  countByStatus,
  isReceivedThisWeek,
} from '../utils/inquiryDisplay';

type SummaryCardsProps = {
  inquiries: Inquiry[];
};

export function SummaryCards({ inquiries }: SummaryCardsProps) {
  const cards = [
    {
      label: '総問い合わせ数',
      count: inquiries.length,
      note: '登録されている相談の合計',
      variant: 'total' as const,
    },
    {
      label: '未対応',
      count: countByStatus(inquiries, '未対応'),
      note: '初回確認が必要な件数',
      variant: 'pending' as const,
    },
    {
      label: '対応中',
      count: countByStatus(inquiries, '対応中'),
      note: '現在進行中の対応',
      variant: 'progress' as const,
    },
    {
      label: '完了',
      count: countByStatus(inquiries, '完了'),
      note: '対応済みの件数',
      variant: 'completed' as const,
    },
    {
      label: '優先度高',
      count: inquiries.filter((i) => i.priority === '高').length,
      note: '優先的に確認したい相談',
      variant: 'priority' as const,
    },
    {
      label: '今週の新規相談',
      count: inquiries.filter((i) => isReceivedThisWeek(i.receivedAt)).length,
      note: '直近7日以内の受信',
      variant: 'recent' as const,
    },
  ];

  return (
    <section className="summary" aria-label="問い合わせサマリー">
      <div className="summary__grid">
        {cards.map((card) => (
          <article key={card.label} className={`summary__card summary__card--${card.variant}`}>
            <p className="summary__label">{card.label}</p>
            <p className="summary__count">
              {card.count}
              <span className="summary__unit">件</span>
            </p>
            <p className="summary__note">{card.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
