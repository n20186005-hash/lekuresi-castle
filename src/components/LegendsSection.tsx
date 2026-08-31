'use client';

import { useTranslations, useMessages } from 'next-intl';

export default function LegendsSection() {
  const t = useTranslations('legends');
  const messages = useMessages() as any;
  const items = (messages?.legends?.items || []) as Array<{
    id: string;
    kind: string;
    kindLabel: string;
    title: string;
    content: string;
  }>;

  return (
    <section id="legends" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-4" style={{ background: 'var(--accent)' }} />

        {/* Neutrality / provenance note */}
        <p
          className="text-sm leading-relaxed rounded-lg p-4 mb-10"
          style={{ background: 'var(--bg-tertiary)', border: '1px dashed var(--border-color)', color: 'var(--text-muted)' }}
        >
          {t('note')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <article
              key={item.id}
              className="rounded-xl p-6"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <span
                className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3"
                style={{ background: 'var(--tag-bg)', color: 'var(--tag-text)' }}
              >
                {item.kindLabel}
              </span>
              <h3
                className="font-display text-lg font-semibold mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {item.content}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
