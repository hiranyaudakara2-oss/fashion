import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export default function DraghoHero() {
  const navigate = useNavigate();

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center justify-center text-center">
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm md:text-lg text-white/80 tracking-[0.3em] uppercase mb-6 font-sans"
        >
          Fall / Winter 2026
        </motion.p>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-7xl md:text-[12rem] text-white leading-none tracking-tighter mb-8 drop-shadow-2xl"
        >
          DRAGHO
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-3xl text-white/90 font-display italic mb-12 max-w-2xl drop-shadow-lg"
        >
          Elegance in motion. Redefining the boundaries of modern high fashion.
        </motion.p>
        
        <motion.button
          onClick={() => navigate('/products')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{ scale: 1.05, backgroundColor: "#ffffff", color: "#8b0000" }}
          whileTap={{ scale: 0.95 }}
          className="bg-transparent border border-white text-white px-12 py-4 rounded-full text-sm tracking-[0.2em] uppercase font-medium transition-colors duration-300 backdrop-blur-sm"
        >
          Explore Collection
        </motion.button>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-xs uppercase tracking-[0.2em] text-white/60 mb-2">Scroll</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-white/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
