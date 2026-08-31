import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lekuresicastle.com';
  const lastModified = new Date('2026-08-31');

  const entries: MetadataRoute.Sitemap = [];

  const pages = [
    { path: '', priority: 1 },
    { path: '/privacy-policy', priority: 0.5 },
    { path: '/terms-of-service', priority: 0.5 },
    { path: '/cookie-settings', priority: 0.5 },
  ];

  for (const locale of routing.locales) {
    for (const page of pages) {
      const url = `${baseUrl}/${locale}${page.path}`;
      entries.push({
        url,
        lastModified,
        changeFrequency: 'weekly',
        priority: page.priority,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [
              l === 'en' ? 'en' : l,
              `${baseUrl}/${l}${page.path}`,
            ])
          ),
        },
      });
    }
  }

  // x-default 指向默认语言（sq）
  entries[0].alternates!.languages!['x-default'] = `${baseUrl}/sq`;

  return entries;
}
