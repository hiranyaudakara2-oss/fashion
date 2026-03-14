import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { socketService } from '../services/socketService';

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
      {/* Liquid Front Element */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none z-0 overflow-hidden flex justify-end items-center">
        <motion.svg 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewBox="0 0 800 800" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-[120%] md:w-[80%] h-auto opacity-60 translate-x-1/4"
        >
          <path fill="#E8E9EB" d="M45.7,-76.1C58.9,-69.3,69.1,-55.3,77.1,-40.8C85.1,-26.3,90.8,-11.3,88.9,3.1C87,17.5,77.5,31.3,67.1,43.4C56.7,55.5,45.4,65.9,31.8,73.1C18.2,80.3,2.3,84.3,-12.4,81.5C-27.1,78.7,-40.6,69.1,-52.8,58.3C-65,47.5,-75.9,35.5,-81.9,21.3C-87.9,7.1,-89,-9.3,-83.5,-23.5C-78,-37.7,-65.9,-49.7,-52.5,-56.8C-39.1,-63.9,-24.4,-66.1,-9.6,-66.9C5.2,-67.7,20.4,-67.1,32.5,-71.4C44.6,-75.7,53.6,-84.9,45.7,-76.1Z" transform="translate(400 400) scale(4.5)" />
          <path fill="#878681" opacity="0.3" d="M39.1,-63.8C51.8,-56.5,63.9,-47.4,72.6,-35.4C81.3,-23.4,86.6,-8.5,84.4,5.6C82.2,19.7,72.5,33,61.5,43.9C50.5,54.8,38.2,63.3,24.5,69.4C10.8,75.5,-4.3,79.2,-18.8,76.5C-33.3,73.8,-47.2,64.7,-58.3,53.1C-69.4,41.5,-77.7,27.4,-81.4,12.2C-85.1,-3,-84.2,-19.3,-77.1,-32.9C-70,-46.5,-56.7,-57.4,-42.6,-64.1C-28.5,-70.8,-13.6,-73.3,0.8,-74.4C15.2,-75.5,30.4,-75.2,39.1,-63.8Z" transform="translate(400 400) scale(4.2)" />
        </motion.svg>
      </div>

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
            {heroData.title}
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
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[400px] md:max-w-[500px] h-full rounded-[2rem] overflow-hidden border-[8px] border-white shadow-2xl"
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
