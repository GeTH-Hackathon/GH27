import Hero from '@site/src/components/sections/Hero';
import Objectives from '@site/src/components/sections/Objectives';
import Data from '@site/src/components/sections/Data';
import Road from '@site/src/components/sections/Road';
import Apply from '@site/src/components/sections/Apply';
import Organizers from '@site/src/components/sections/Organizers';

// The home page's five-act scroll story, hydrated as one island so the motion scenes share one React root.
export default function Home() {
  return (
    <main>
      <Hero />
      <Objectives />
      <Data />
      <Road />
      <Apply />
      <Organizers />
    </main>
  );
}
