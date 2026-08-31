import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Lëkurësi Castle — Visitor Guide',
    short_name: 'Lëkurësi Castle',
    description: 'Comprehensive visitor guide to Lëkurësi Castle in Sarandë, Albania.',
    start_url: '/sq',
    display: 'standalone',
    background_color: '#faf8f4',
    theme_color: '#3a7a8d',
    lang: 'sq',
    categories: ['travel', 'tourism', 'history'],
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
