import { motion } from 'motion/react';

export default function Marquee() {
  return (
    <div className="w-full overflow-hidden bg-white text-black py-4 border-y border-black/10 flex">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 40
        }}
        className="flex whitespace-nowrap"
      >
        {[...Array(20)].map((_, i) => (
          <span key={i} className="font-display text-2xl uppercase tracking-widest mx-8">
            Free Worldwide Shipping on Orders Over $500 • 
          </span>
        ))}
      </motion.div>
    </div>
  );
}
