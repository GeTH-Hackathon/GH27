import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import {event} from '@site/src/data/event';
import Hero from '@site/src/components/sections/Hero';
import Objectives from '@site/src/components/sections/Objectives';
import Data from '@site/src/components/sections/Data';
import Road from '@site/src/components/sections/Road';
import Apply from '@site/src/components/sections/Apply';
import Organizers from '@site/src/components/sections/Organizers';

const siteUrl = 'https://gh27.bat.or.th';

// schema.org Event so search engines can show the date, place and organiser as a rich result.
const eventJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: event.name,
  description: event.description,
  startDate: event.startDate,
  endDate: event.endDate,
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  inLanguage: 'en',
  url: `${siteUrl}/`,
  image: `${siteUrl}/img/og.png`,
  location: {
    '@type': 'Place',
    name: event.venue.name ?? `${event.venue.city}, ${event.venue.country}`,
    address: {'@type': 'PostalAddress', addressLocality: event.venue.city, addressCountry: 'TH'},
  },
  organizer: event.partners
    .filter((p) => p.role === 'Organizer')
    .map((p) => ({'@type': 'Organization', name: p.name, ...(p.href ? {url: p.href} : {})})),
};

export default function Home() {
  return (
    <Layout title="Genomics hackathon, Chiang Mai 2027" description={event.description}>
      <Head>
        <script type="application/ld+json">{JSON.stringify(eventJsonLd)}</script>
      </Head>
      <main>
        <Hero />
        <Objectives />
        <Data />
        <Road />
        <Apply />
        <Organizers />
      </main>
    </Layout>
  );
}
