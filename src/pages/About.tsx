import PageTransition from '../components/PageTransition';
import { motion } from 'motion/react';

export default function About() {
  return (
    <PageTransition>
      <div className="bg-[#F9F6EF] min-h-screen text-[#1A1A1A] selection:bg-[#E0BFB8] selection:text-white pt-32 px-6 md:px-12 pb-24">
        <main className="container mx-auto max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h1 className="font-display text-5xl md:text-7xl text-[#1A1A1A] mb-6">Our Story</h1>
            <p className="font-sans text-lg text-[#878681] max-w-2xl mx-auto leading-relaxed">
              Founded on the principles of minimalist elegance and uncompromising quality, DRAGHO redefines modern luxury.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/40 backdrop-blur-xl rounded-3xl p-8 border border-white/60 shadow-[0_8px_30px_rgba(224,191,184,0.15)]"
            >
              <h3 className="font-display text-2xl mb-4 text-[#E0BFB8]">Craftsmanship</h3>
              <p className="text-[#878681] leading-relaxed">
                Every piece is meticulously crafted using the finest materials sourced globally. We believe in creating garments that not only look beautiful but stand the test of time.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-white/40 backdrop-blur-xl rounded-3xl p-8 border border-white/60 shadow-[0_8px_30px_rgba(224,191,184,0.15)]"
            >
              <h3 className="font-display text-2xl mb-4 text-[#E0BFB8]">Sustainability</h3>
              <p className="text-[#878681] leading-relaxed">
                Our commitment to the environment is woven into every fabric. We prioritize ethical production methods and sustainable sourcing to minimize our footprint.
              </p>
            </motion.div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
}
