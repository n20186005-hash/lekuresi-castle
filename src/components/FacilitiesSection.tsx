'use client';

import { useTranslations, useMessages } from 'next-intl';

const icons: Record<string, React.ReactNode> = {
  wc: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <circle cx="15" cy="10" r="1.5" />
      <line x1="9" y1="8" x2="9" y2="8" />
    </>
  ),
  parking: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
    </>
  ),
  dining: (
    <>
      <path d="M8 3v6c0 1.5-.8 2.5-2 2.5S4 10.5 4 9V3" />
      <path d="M6 11.5V21" />
      <path d="M16 3c2 0 4 2 4 6s-2 6-4 6" />
    </>
  ),
  cafes: (
    <>
      <path d="M4 8h11v7a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8z" />
      <path d="M15 10h1.5a2.5 2.5 0 0 1 0 5H15" />
    </>
  ),
  accommodation: (
    <>
      <path d="M3 18v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5" />
      <path d="M3 18h18" />
      <path d="M6 11V7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v4" />
    </>
  ),
  shopping: (
    <>
      <path d="M6 7h12l1 13H5L6 7z" />
      <path d="M9 10V6a3 3 0 0 1 6 0v4" />
    </>
  ),
  fuel: (
    <>
      <path d="M6 21V6a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v15" />
      <path d="M6 12h9" />
      <path d="M15 9l3 2v8a2 2 0 0 0 2 2h0a1 1 0 0 0 1-1v-7" />
    </>
  ),
  atm: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <circle cx="12" cy="12" r="3" />
      <line x1="7" y1="9" x2="7" y2="9" />
      <line x1="17" y1="15" x2="17" y2="15" />
    </>
  ),
};

export default function FacilitiesSection() {
  const t = useTranslations('facilities');
  const messages = useMessages() as any;
  const items = (messages?.facilities?.items || []) as Array<{
    id: string;
    title: string;
    description: string;
  }>;

  return (
    <section id="facilities" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-4" style={{ background: 'var(--accent)' }} />
        <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
          {t('subtitle')}
        </p>

        {/* Neutrality declaration */}
        <p
          className="text-sm leading-relaxed rounded-lg p-4 mb-10"
          style={{ background: 'var(--bg-tertiary)', border: '1px dashed var(--border-color)', color: 'var(--text-muted)' }}
        >
          {t('note')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {items.map((item) => (
            <article
              key={item.id}
              className="rounded-xl p-6 flex gap-4"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <div
                className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center"
                style={{ background: 'var(--accent)', color: '#fff' }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {icons[item.id]}
                </svg>
              </div>
              <div>
                <h3
                  className="font-display text-base font-semibold mb-1.5"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
