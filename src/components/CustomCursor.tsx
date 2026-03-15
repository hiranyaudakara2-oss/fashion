import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

function isColorLight(color: string) {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128;
}

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { bgColor: shopBgColor } = useShop();
  const location = useLocation();
  const cursorRef = useRef<HTMLDivElement>(null);

  const isShopPage = location.pathname === '/shop';
  const isLight = isShopPage ? isColorLight(shopBgColor) : false;

  useEffect(() => {
    // Only show custom cursor on devices with a fine pointer (mouse)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        // Update position instantly without React state or Framer Motion overhead
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over interactive elements
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const redColor = '#FF3B30'; // Stylish iOS-style red
  const borderColor = redColor;
  const bgColor = 'rgba(255, 59, 48, 0.15)';
  const hoverBgColor = 'rgba(255, 59, 48, 0.4)';

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-[10000] flex items-center justify-center"
      style={{
        left: -100,
        top: -100,
        transform: 'translate(-50%, -50%)',
        transition: 'none', // Explicitly ensure NO CSS transitions on left or top
        willChange: 'left, top',
      }}
    >
      <motion.div
        className="w-6 h-6 rounded-full flex items-center justify-center"
        style={{
          border: `2px solid ${borderColor}`,
          boxShadow: `0 0 15px ${redColor}44`,
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? hoverBgColor : bgColor,
          borderWidth: isHovering ? '1px' : '2px',
        }}
        transition={{
          scale: { type: 'spring', stiffness: 250, damping: 25 },
          backgroundColor: { duration: 0.2 },
          borderWidth: { duration: 0.2 }
        }}
      >
        {/* Inner dot for precision */}
        <motion.div 
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: borderColor }}
          animate={{
            scale: isHovering ? 0.5 : 1,
            opacity: isHovering ? 0.5 : 1
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </div>
  );
}
