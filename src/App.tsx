/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import AdminNavbar from './components/AdminNavbar';
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
import AdminDashboard from './pages/AdminDashboard';
import { useTheme } from './context/ThemeContext';
import { useShop, isColorLight } from './context/ShopContext';

export default function App() {
  const location = useLocation();
  const { theme } = useTheme();
  const { bgColor, broadcastActive } = useShop();

  const isLight = isColorLight(bgColor);
  const textColor = isLight ? '#171E27' : '#FFFFFF';
  const isAdminPage = location.pathname === '/admin';

  return (
    <div 
      className="relative"
      style={{ 
        backgroundColor: bgColor, 
        color: textColor,
        transition: 'background-color 0.8s ease-in-out, color 0.8s ease-in-out',
        paddingTop: (isAdminPage ? 48 : 0) + (broadcastActive ? 36 : 0) + 'px'
      }}
    >
      {isAdminPage && <AdminNavbar />}
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
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </div>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
