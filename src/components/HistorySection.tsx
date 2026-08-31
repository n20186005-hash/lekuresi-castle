'use client';

import { useTranslations, useMessages } from 'next-intl';

export default function HistorySection() {
  const t = useTranslations('history');
  const messages = useMessages() as any;
  const timeline = (messages?.history?.timeline || []) as Array<{
    era: string;
    title: string;
    content: string;
  }>;

  return (
    <section id="history" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-4" style={{ background: 'var(--accent)' }} />
        <p className="text-lg leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
          {t('subtitle')}
        </p>

        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-5 top-0 bottom-0 w-0.5 md:left-1/2 md:-translate-x-1/2"
            style={{ background: 'var(--border-color)' }}
          />

          <div className="space-y-10">
            {timeline.map((item, i) => (
              <div key={i} className={`relative md:flex md:items-start ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Timeline dot */}
                <div
                  className="absolute left-5 -translate-x-1/2 w-4 h-4 rounded-full border-2 z-10 md:left-1/2"
                  style={{ background: 'var(--bg-primary)', borderColor: 'var(--accent)', top: '0.5rem' }}
                />

                {/* Era badge + content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <span
                    className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3"
                    style={{ background: 'var(--tag-bg)', color: 'var(--tag-text)' }}
                  >
                    {item.era}
                  </span>
                  <h3
                    className="font-display text-xl font-semibold mb-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
