import { useTranslations, useMessages } from 'next-intl';

export default function FAQSection() {
  const t = useTranslations('faq');
  const messages = useMessages() as any;
  const items = (messages?.faq?.items || []) as Array<{ question: string; answer: string }>;

  return (
    <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6 text-center"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-12 mx-auto" style={{ background: 'var(--accent)' }} />

        <div className="space-y-6">
          {items.map((item, index) => (
            <div 
              key={index}
              className="p-6 rounded-xl border"
              style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--accent)' }}
            >
              <h3
                className="font-display text-xl font-semibold mb-3 flex items-start gap-3"
                style={{ color: 'var(--text-primary)' }}
              >
                <span className="text-[var(--accent)] font-bold">Q:</span>
                {item.question}
              </h3>
              <div
                className="text-lg leading-relaxed flex items-start gap-3"
                style={{ color: 'var(--text-secondary)' }}
              >
                <span className="text-[var(--accent)] font-bold">A:</span>
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
