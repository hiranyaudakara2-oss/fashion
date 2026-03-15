import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Offers', href: '/offers' },
  { name: 'About Us', href: '/about' },
];

function isColorLight(color: string) {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128;
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { bgColor: shopBgColor, broadcastActive } = useShop();

  const isShopPage = location.pathname === '/shop';
  const isLight = isShopPage ? isColorLight(shopBgColor) : false;
  
  // Adjusted colors for theme support
  const textColor = 'text-white';
  const hoverColor = 'hover:text-white/70';
  
  const boxBgColor = isLight ? 'bg-[#FAFAFA]/10 border-[#1A1A1A]/10' : 'bg-black/20 border-white/10';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed left-0 right-0 mx-auto w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] max-w-6xl z-50 transition-all duration-500 overflow-hidden ${boxBgColor} backdrop-blur-xl border py-4 px-6 md:px-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]`}
        style={{ top: (broadcastActive ? 36 + 24 : 24) + 'px' }}
      >
        <div className="flex items-center justify-between w-full relative z-10">
          
          {/* Stylized Logo - Left */}
          <Link 
            to="/" 
            onClick={handleLinkClick}
            className={`font-display text-2xl tracking-[0.15em] uppercase z-50 relative ${textColor}`}
          >
            Dragho
          </Link>

          {/* Desktop Links - Right */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={handleLinkClick}
                className={`group relative text-xs font-sans font-medium tracking-widest uppercase transition-colors duration-300 ${textColor} ${hoverColor}`}
              >
                {link.name}
                <span className={`absolute -bottom-1.5 left-0 w-full h-[1.5px] scale-x-0 origin-right group-hover:origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] rounded-full bg-red-600`} />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`md:hidden z-50 relative p-2 -mr-2 transition-colors ${textColor} ${hoverColor}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className={`fixed inset-0 z-40 flex flex-col items-center justify-center ${isLight ? 'bg-[#FAFAFA]/90' : 'bg-[#1A1A1A]/90'}`}
            style={{ top: (broadcastActive ? 36 : 0) + 'px' }}
          >
            <div className="flex flex-col items-center gap-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={link.href}
                    onClick={handleLinkClick}
                    className={`group relative text-2xl font-sans font-medium tracking-widest uppercase transition-colors ${textColor} ${hoverColor}`}
                  >
                    {link.name}
                    <span className={`absolute -bottom-2 left-0 w-full h-[2px] scale-x-0 origin-right group-hover:origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] rounded-full bg-red-600`} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
