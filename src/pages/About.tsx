import PageTransition from '../components/PageTransition';
import AnimatedText from '../components/AnimatedText';
import { motion } from 'motion/react';

export default function About() {
  return (
    <PageTransition>
      <div className="bg-[#050000] min-h-screen text-white selection:bg-red-900 selection:text-white pt-32 px-6 md:px-12 pb-24">
        <main className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-16">
            <h1 className="font-display text-5xl md:text-7xl text-white mb-6">
              <AnimatedText text="Our Story" delay={0.2} />
            </h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="font-sans text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
            >
              Founded on the principles of unapologetic elegance and uncompromising quality, DRAGHO redefines modern luxury.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl"
            >
              <h3 className="font-display text-2xl mb-4 text-red-600">Craftsmanship</h3>
              <p className="text-white/60 leading-relaxed">
                Every piece is meticulously crafted using the finest materials sourced globally. We believe in creating garments that not only look beautiful but stand the test of time.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl"
            >
              <h3 className="font-display text-2xl mb-4 text-red-600">Sustainability</h3>
              <p className="text-white/60 leading-relaxed">
                Our commitment to the environment is woven into every fabric. We prioritize ethical production methods and sustainable sourcing to minimize our footprint.
              </p>
            </motion.div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
}
