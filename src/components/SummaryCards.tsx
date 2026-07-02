import type { Inquiry } from '../types/inquiry';

type SummaryCardsProps = {
  inquiries: Inquiry[];
};

export function SummaryCards({ inquiries }: SummaryCardsProps) {
  const pending = inquiries.filter((i) => i.status === '未対応').length;
  const inProgress = inquiries.filter((i) => i.status === '対応中').length;
  const completed = inquiries.filter((i) => i.status === '完了').length;
  const highPriority = inquiries.filter((i) => i.priority === '高').length;

  const cards = [
    { label: '未対応', count: pending, variant: 'pending' as const },
    { label: '対応中', count: inProgress, variant: 'progress' as const },
    { label: '完了', count: completed, variant: 'completed' as const },
    { label: '高優先度', count: highPriority, variant: 'priority' as const },
  ];

  return (
    <section className="summary" aria-label="相談件数サマリー">
      <div className="summary__grid">
        {cards.map((card) => (
          <div key={card.label} className={`summary__card summary__card--${card.variant}`}>
            <span className="summary__label">{card.label}</span>
            <span className="summary__count">{card.count}</span>
            <span className="summary__unit">件</span>
          </div>
        ))}
      </div>
    </section>
  );
}
