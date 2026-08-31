'use client';

import { useTranslations, useMessages } from 'next-intl';
import type { ReactNode } from 'react';

const icons: Record<string, ReactNode> = {
  entranceFee: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 9a3 3 0 0 1 0 6v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-3a3 3 0 0 1 0-6V7a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z" />
      <path d="M13 5v2M17 5v2" />
    </svg>
  ),
  openingHours: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  distance: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  bestTime: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 18a5 5 0 0 0-10 0" />
      <line x1="12" y1="9" x2="12" y2="2" />
      <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
      <line x1="1" y1="18" x2="3" y2="18" />
      <line x1="21" y1="18" x2="23" y2="18" />
      <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
      <line x1="23" y1="22" x2="1" y2="22" />
      <polyline points="16 5 12 9 8 5" />
    </svg>
  ),
  facilities: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
    </svg>
  ),
};

export default function QuickFacts() {
  const t = useTranslations('quickFacts');
  const messages = useMessages() as any;
  const items = (messages?.quickFacts?.items || []) as Array<{
    key: string;
    label: string;
    value: string;
  }>;

  return (
    <section className="section-padding pt-12" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-6xl mx-auto">
        <h2
          className="font-display text-2xl sm:text-3xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {items.map((item) => (
            <div
              key={item.key}
              className="rounded-xl p-5 shadow-sm"
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                borderTop: '3px solid var(--accent)',
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                style={{ background: 'var(--accent)', color: 'white' }}
              >
                {icons[item.key] || null}
              </div>
              <p
                className="text-xs font-semibold uppercase tracking-wide mb-1"
                style={{ color: 'var(--text-muted)' }}
              >
                {item.label}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
