import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export default function FeaturedCollection() {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-6 md:px-12 bg-zinc-950 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative aspect-[4/5] overflow-hidden"
        >
          <img 
            src="https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1000&auto=format&fit=crop" 
            alt="Exclusive Offers" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div className="flex flex-col justify-center lg:pl-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm text-gray-400 uppercase tracking-widest mb-4">Limited Time</p>
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter mb-8 leading-[0.9]">
              Exclusive <br/> Offers
            </h2>
            <p className="text-gray-300 font-light leading-relaxed mb-10 max-w-md">
              Discover our latest markdowns on premium streetwear. From textured overshirts to tailored trousers, elevate your everyday wardrobe with our exclusive seasonal offers.
            </p>
            
            <button 
              onClick={() => navigate('/offers')}
              className="relative overflow-hidden group border border-white px-8 py-4 text-sm font-medium tracking-widest uppercase"
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">Shop Offers</span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
