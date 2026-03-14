import { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
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
  const { theme } = useTheme();
  const { bgColor: shopBgColor } = useShop();
  const location = useLocation();

  const isShopPage = location.pathname === '/shop';
  const isLight = isShopPage ? isColorLight(shopBgColor) : theme === 'light';

  // Use motion values for the cursor position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    // Only show custom cursor on devices with a fine pointer (mouse)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
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
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  const borderColor = isLight ? '#171E27' : '#FFFFFF';
  const bgColor = isLight ? 'rgba(23, 30, 39, 0.15)' : 'rgba(255, 255, 255, 0.15)';
  const hoverBgColor = isLight ? 'rgba(23, 30, 39, 0.4)' : 'rgba(255, 255, 255, 0.4)';

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[10000] flex items-center justify-center backdrop-blur-md"
      style={{
        x: cursorX,
        y: cursorY,
        left: -16, // half of 32px
        top: -16,
        border: `1.5px solid ${borderColor}`,
      }}
      animate={{
        scale: isHovering ? 1.8 : 1,
        backgroundColor: isHovering ? hoverBgColor : bgColor,
      }}
      transition={{
        scale: { type: 'spring', stiffness: 300, damping: 20 },
        backgroundColor: { duration: 0.2 }
      }}
    >
      {/* Inner dot for precision */}
      <motion.div 
        className="w-1 h-1 rounded-full"
        style={{ backgroundColor: borderColor }}
        animate={{
          opacity: isHovering ? 0 : 1,
          scale: isHovering ? 0 : 1
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}
