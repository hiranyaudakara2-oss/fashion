import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bell, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { socketService } from '../services/socketService';

export default function BroadcastBanner() {
  const [content, setContent] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(true);
  const { setBroadcastActive } = useShop();
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  useEffect(() => {
    // Connect to socket
    const socket = socketService.connect();

    // Listen for real-time updates
    socketService.onContentUpdate((newContent) => {
      setContent(newContent);
      if (newContent.broadcast && newContent.broadcast.enabled && isVisible) {
        setBroadcastActive(true);
      } else {
        setBroadcastActive(false);
      }
    });

    // Initial fetch (optional, as socket sends initial state)
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        setContent(data);
        if (data.broadcast && data.broadcast.enabled && isVisible) {
          setBroadcastActive(true);
        } else {
          setBroadcastActive(false);
        }
      })
      .catch(err => console.error(err));

    return () => {
      // We don't necessarily want to disconnect the socket here 
      // if other components use it, but we can stop listening if needed.
    };
  }, [isVisible, setBroadcastActive]);

  const handleClose = () => {
    setIsVisible(false);
    setBroadcastActive(false);
  };

  if (!content || !content.broadcast || !content.broadcast.enabled || !isVisible) {
    return null;
  }

  const getTypeStyles = () => {
    switch (content.broadcast.type) {
      case 'warning':
        return { bg: 'bg-yellow-500', icon: <AlertTriangle size={16} /> };
      case 'success':
        return { bg: 'bg-green-500', icon: <CheckCircle size={16} /> };
      case 'error':
        return { bg: 'bg-red-600', icon: <Bell size={16} /> };
      default:
        return { bg: 'bg-blue-600', icon: <Info size={16} /> };
    }
  };

  const styles = getTypeStyles();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        className={`fixed left-0 right-0 z-[100] ${styles.bg} text-white py-2 px-6 flex items-center justify-between shadow-lg`}
        style={{ top: isAdminPage ? '48px' : '0' }}
      >
        <div className="container mx-auto flex items-center justify-center gap-3">
          <span className="animate-pulse">{styles.icon}</span>
          <p className="text-xs font-sans font-medium tracking-wider uppercase">
            {content.broadcast.message}
          </p>
        </div>
        <button 
          onClick={handleClose}
          className="p-1 hover:bg-white/20 rounded-full transition-colors"
        >
          <X size={16} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
