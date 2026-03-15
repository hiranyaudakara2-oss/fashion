/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import BroadcastBanner from './components/BroadcastBanner';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import WelcomeModal from './components/WelcomeModal';
import ClickExplosion from './components/ClickExplosion';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Offers from './pages/Offers';
import About from './pages/About';
import Shop from './pages/Shop';
import { useShop, isColorLight } from './context/ShopContext';

export default function App() {
  const location = useLocation();
  const { bgColor, broadcastActive } = useShop();

  const isLight = isColorLight(bgColor);
  const textColor = isLight ? '#171E27' : '#FFFFFF';

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 2.5, // Slow down scroll speed
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.7, // Slow down wheel scroll
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const forceVisibility = () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        img.style.display = 'block';
        img.style.visibility = 'visible';
        img.style.opacity = '1';
      });
    };

    // Run once on mount
    forceVisibility();

    // Also watch for DOM changes to catch dynamically added images
    const observer = new MutationObserver(forceVisibility);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      lenis.destroy();
    };
  }, []);

  return (
    <div 
      className="relative"
      style={{ 
        backgroundColor: bgColor, 
        color: textColor,
        transition: 'background-color 0.8s ease-in-out, color 0.8s ease-in-out',
        paddingTop: (broadcastActive ? 36 : 0) + 'px'
      }}
    >
      <BroadcastBanner />
      <CustomCursor />
      <ClickExplosion />
      <WelcomeModal />
      <Preloader />
      <Navbar />
      <AnimatePresence mode="wait">
        <div key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<Shop />} />
          </Routes>
        </div>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
