import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function ClickExplosion() {
  const [explosions, setExplosions] = useState<{id: number, x: number, y: number}[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newExplosion = { id: Date.now(), x: e.clientX, y: e.clientY };
      setExplosions(prev => [...prev, newExplosion]);
      
      // Remove from DOM after 1.5 seconds
      setTimeout(() => {
        setExplosions(prev => prev.filter(exp => exp.id !== newExplosion.id));
      }, 1500);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      {explosions.map(exp => (
        <div 
          key={exp.id} 
          className="fixed inset-0 pointer-events-none z-50"
          style={{ left: exp.x, top: exp.y }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{ backgroundColor: i % 2 === 0 ? '#878681' : '#D4AF37' }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ 
                x: Math.cos((i / 8) * Math.PI * 2) * 100, 
                y: Math.sin((i / 8) * Math.PI * 2) * 100,
                opacity: 0,
                scale: 0
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          ))}
        </div>
      ))}
    </>
  );
}
