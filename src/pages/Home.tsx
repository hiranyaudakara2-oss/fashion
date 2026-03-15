import PageTransition from '../components/PageTransition';
import RedClothBackground from '../components/RedClothBackground';
import DraghoHero from '../components/DraghoHero';
import DraghoCollections from '../components/DraghoCollections';

export default function Home() {
  return (
    <PageTransition>
      <div className="bg-transparent min-h-screen text-white selection:bg-red-900 selection:text-white relative z-0">
        <RedClothBackground />
        <main className="relative z-10">
          <DraghoHero />
          <DraghoCollections />
        </main>
      </div>
    </PageTransition>
  );
}
