import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hasShown = sessionStorage.getItem('welcomeModalShown');
    if (!hasShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('welcomeModalShown', 'true');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-white/90 dark:bg-[#1A1A1A]/90 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/20"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>
            <h2 className="font-serif text-4xl mb-4">Welcome to DRAGHO</h2>
            <p className="text-lg opacity-80 mb-8">
              Experience the intersection of timeless elegance and contemporary design.
            </p>
            <button
              onClick={() => {
                setIsOpen(false);
                navigate('/products');
              }}
              className="w-full py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium tracking-widest uppercase hover:opacity-90 transition-opacity"
            >
              Discover Collection
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
