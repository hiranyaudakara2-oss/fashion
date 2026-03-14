import React from 'react';
import { motion } from 'motion/react';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ clipPath: 'circle(0% at 50% 100%)' }}
      animate={{ clipPath: 'circle(150% at 50% 100%)' }}
      exit={{ clipPath: 'circle(0% at 50% 0%)' }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className="w-full min-h-screen"
    >
      {children}
    </motion.div>
  );
}
