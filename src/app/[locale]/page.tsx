import { getMessages, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import QuickFacts from '@/components/QuickFacts';
import Intro from '@/components/Intro';
import BasicInfo from '@/components/BasicInfo';
import HoursSection from '@/components/HoursSection';
import WeatherSection from '@/components/WeatherSection';
import TicketsSection from '@/components/TicketsSection';
import TransportSection from '@/components/TransportSection';
import HistorySection from '@/components/HistorySection';
import InfoSection from '@/components/InfoSection';
import LegendsSection from '@/components/LegendsSection';
import FacilitiesSection from '@/components/FacilitiesSection';
import RouteSection from '@/components/RouteSection';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import MapEmbed from '@/components/MapEmbed';
import FAQSection from '@/components/FAQSection';
import SourcesSection from '@/components/SourcesSection';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';

const baseUrl = 'https://lekuresicastle.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'zh': `${baseUrl}/zh`,
        'en': `${baseUrl}/en`,
        'sq': `${baseUrl}/sq`,
        'x-default': `${baseUrl}/sq`,
      },
    },
  };
}

const ALL_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = (await getMessages()) as any;
  const url = `${baseUrl}/${locale}`;
  const mapsLink = messages?.hero?.mapsLink || 'https://maps.app.goo.gl/Vh8wMe2L3UsdvpAC8';
  const faqItems = (messages?.faq?.items || []) as Array<{
    question: string;
    answer: string;
  }>;
  const inLanguage =
    locale === 'zh' ? 'zh-CN' : locale === 'sq' ? 'sq-AL' : 'en';

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'TouristAttraction',
      '@id': `${baseUrl}/#attraction`,
      name: 'Lëkurësi Castle',
      alternateName: ['Lekursi Castle', 'Kalaja e Lëkurësit'],
      description: messages?.meta?.description || '',
      url,
      image: `${baseUrl}/gallery/lekuresi-castle-02.jpg`,
      isAccessibleForFree: true,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Sarandë',
        addressRegion: 'Vlorë County',
        postalCode: '9701',
        addressCountry: 'AL',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 39.86587795,
        longitude: 20.0257742,
      },
      hasMap: mapsLink,
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ALL_DAYS,
          opens: '08:00',
          closes: '23:00',
        },
      ],
      sameAs: [mapsLink, 'https://albania.al/'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: messages?.meta?.title || '',
      description: messages?.meta?.description || '',
      inLanguage,
      datePublished: '2026-01-15',
      dateModified: '2026-08-31',
      isPartOf: { '@id': `${baseUrl}/#website` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
      url: `${baseUrl}/`,
      name: 'Lëkurësi Castle Visitor Guide',
      description: messages?.meta?.description || '',
      inLanguage: ['en', 'zh', 'sq'],
      publisher: {
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        name: 'Lëkurësi Castle Visitor Guide',
        url: `${baseUrl}/`,
      },
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <Header />
      <main>
        <Hero />
        <QuickFacts />
        <Intro />
        <BasicInfo />
        <HoursSection />
        <WeatherSection />
        <TicketsSection />
        <TransportSection />
        <HistorySection />
        <InfoSection />
        <LegendsSection />
        <FacilitiesSection />
        <RouteSection />
        <Gallery />
        <Reviews />
        <FAQSection />
        <SourcesSection />
        <MapEmbed />
      </main>
      <Footer />
    </>
  );
}
