import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate a loading process
    const duration = 3500; // 3.5 seconds for a more cinematic feel
    const interval = 30;
    const step = (100 / duration) * interval;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Wait a brief moment at 100% before fading out
          setTimeout(() => setIsVisible(false), 800);
          return 100;
        }
        // Add slight randomness for a more organic, realistic loading feel
        return Math.min(prev + step * (Math.random() * 1.5 + 0.5), 100);
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(20px)", scale: 1.05 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050507] overflow-hidden"
        >
          {/* Cinematic Lighting / Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-red-900/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
          
          {/* Fashion Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 1.1, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="relative w-full max-w-5xl aspect-[21/9] flex items-center justify-center mb-8"
          >
            {/* Vignette to blend the image seamlessly into the midnight background */}
            <div 
              className="absolute inset-0 z-10 pointer-events-none" 
              style={{
                background: 'radial-gradient(circle at center, transparent 10%, #050507 65%)'
              }}
            />
            <img 
              src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2000&auto=format&fit=crop" 
              alt="High Fashion" 
              className="w-full h-full object-cover opacity-50 grayscale-[50%] contrast-125"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          <div className="relative z-20 flex flex-col items-center -mt-32">
            {/* Elegant Minimalist Typography */}
            <motion.h1 
              initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl md:text-7xl text-white tracking-[0.3em] uppercase ml-[0.3em] mb-12 font-light"
            >
              Dragho
            </motion.h1>

            {/* Subtle Glowing Progress Indicator */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="flex flex-col items-center gap-5"
            >
              <div className="w-48 md:w-64 h-[1px] bg-white/10 relative">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-white"
                  style={{ 
                    width: `${progress}%`,
                    boxShadow: '0 0 12px 1px rgba(255,255,255,0.6)'
                  }}
                />
              </div>
              
              {/* Percentage Counter */}
              <div className="text-white/40 text-[9px] tracking-[0.5em] font-sans font-light uppercase">
                Loading {Math.round(progress)}%
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
