import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useShop } from '../context/ShopContext';
import { socketService } from '../services/socketService';

export default function ProductGallery() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const { theme } = useTheme();
  const { setBgColor } = useShop();
  const navigate = useNavigate();

  useEffect(() => {
    // Connect to socket
    socketService.connect();

    // Listen for real-time updates
    socketService.onContentUpdate((newContent) => {
      if (newContent.products) {
        setProducts(newContent.products);
      }
    });

    // Initial fetch
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        if (data.products) {
          setProducts(data.products);
        }
      })
      .catch(err => console.error('Failed to fetch products:', err));
  }, []);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-32 px-6 md:px-12 transition-colors duration-800">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <motion.h2 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-display text-6xl md:text-8xl uppercase tracking-tighter"
        >
          Products
        </motion.h2>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`px-6 py-3 rounded-full border ${theme === 'light' ? 'border-[#171E27]/20 bg-white text-[#171E27]' : 'border-white/20 bg-[#1A1A1A] text-white'} focus:outline-none focus:border-white/50 transition-colors`}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group cursor-pointer"
            whileHover="hover"
            onClick={() => {
              setBgColor(product.color);
              navigate(`/product/${product.id}`);
            }}
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 mb-6">
              <motion.img
                variants={{
                  hover: { scale: 1.08 }
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover opacity-100 group-hover:opacity-50 transition-opacity duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-transparent group-hover:bg-black/40 transition-colors duration-500 pointer-events-none" />
              
              <div className="absolute bottom-0 left-0 w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex justify-center">
                <button className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest w-full transition-colors ${theme === 'light' ? 'bg-[#171E27] text-white hover:bg-[#171E27]/80' : 'bg-white text-black hover:bg-gray-200'}`}>
                  Quick Add
                </button>
              </div>
            </div>
            
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-[10px] uppercase tracking-widest mb-1 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>{product.category}</p>
                <h3 className="text-lg font-medium">{product.name}</h3>
              </div>
              <p className="text-lg font-light">{product.price}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
