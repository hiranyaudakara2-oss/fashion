import FeaturedCollection from '../components/FeaturedCollection';
import PageTransition from '../components/PageTransition';

export default function Offers() {
  return (
    <PageTransition>
      <div className="bg-black min-h-screen text-white selection:bg-cyan-500 selection:text-white pt-24 pb-24 relative overflow-hidden">
        {/* Holographic background */}
        <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-900 rounded-full mix-blend-multiply filter blur-[100px] animate-blob" />
          <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-red-700 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-2000" />
          <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] bg-orange-900 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-4000" />
        </div>
        <main className="relative z-10">
          <FeaturedCollection />
        </main>
      </div>
    </PageTransition>
  );
}
