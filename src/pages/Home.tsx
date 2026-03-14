import Hero from '../components/Hero';
import Snowfall from '../components/Snowfall';
import Marquee from '../components/Marquee';
import PageTransition from '../components/PageTransition';

export default function Home() {
  return (
    <PageTransition>
      <div className="bg-[#1A1A1A] min-h-screen text-white selection:bg-[#878681] selection:text-white relative pb-24">
        <Snowfall />
        <main>
          <Hero />
          <Marquee />
        </main>
      </div>
    </PageTransition>
  );
}
