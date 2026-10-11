import Layout from '@theme/Layout';
import {event} from '@site/src/data/event';
import Hero from '@site/src/components/sections/Hero';
import Objectives from '@site/src/components/sections/Objectives';
import Data from '@site/src/components/sections/Data';
import Road from '@site/src/components/sections/Road';
import Apply from '@site/src/components/sections/Apply';
import Organizers from '@site/src/components/sections/Organizers';

export default function Home() {
  return (
    <Layout description={event.description}>
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
