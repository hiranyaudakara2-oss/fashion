import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { socketService } from '../services/socketService';
import RedCloth from './RedCloth';

export default function Hero() {
  const navigate = useNavigate();
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    // Connect to socket
    socketService.connect();

    // Listen for real-time updates
    socketService.onContentUpdate((newContent) => {
      setContent(newContent);
    });

    // Initial fetch
    fetch('/api/content')
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(err => console.error('Failed to fetch CMS content:', err));
  }, []);

  const heroData = content?.hero || {
    title: "DRAGHO",
    subtitle: "Fashion Shop",
    buttonText: "Shop Now"
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#FAFAFA] flex items-center">
      {/* Dynamic Flowing Red Cloth Background */}
      <RedCloth />

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center justify-between h-full pt-20">
        
        {/* Left Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start z-20">
          <motion.h1 
            key={heroData.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-display text-5xl md:text-6xl text-[#1A1A1A] leading-[0.9] tracking-tight mb-4"
          >
            <motion.span
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              {heroData.title}
            </motion.span>
          </motion.h1>
          
          <motion.p 
            key={heroData.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-2xl md:text-4xl text-[#878681] font-display italic mb-12"
          >
            {heroData.subtitle}
          </motion.p>
          
          <motion.button
            key={heroData.buttonText}
            onClick={() => navigate('/products')}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ scale: 1.05, backgroundColor: "#1A1A1A" }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#878681] text-white px-12 py-4 rounded-full text-sm tracking-[0.2em] uppercase font-medium shadow-xl shadow-[#878681]/20 transition-colors duration-300"
          >
            {heroData.buttonText}
          </motion.button>
        </div>

        {/* Right/Central Image */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-[75vh] relative z-10 mt-12 md:mt-0 flex justify-center md:justify-end items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.5, 
              ease: [0.16, 1, 0.3, 1],
              scale: { duration: 0.4, ease: "easeOut" },
              rotate: { duration: 0.4, ease: "easeOut" }
            }}
            className="relative w-[280px] sm:w-[322.762px] max-w-full h-full rounded-[2rem] overflow-hidden border-[8px] border-white shadow-2xl cursor-pointer"
          >
            <img 
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop" 
              alt="Woman in modern winter clothing"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#878681]/30 to-transparent mix-blend-overlay" />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
