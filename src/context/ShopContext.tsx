import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { socketService } from '../services/socketService';

interface ShopContextType {
  bgColor: string;
  setBgColor: (color: string) => void;
  broadcastActive: boolean;
  setBroadcastActive: (active: boolean) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const isColorLight = (color: string) => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128;
};

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [bgColor, setBgColor] = useState('#050505');
  const [broadcastActive, setBroadcastActive] = useState(false);

  useEffect(() => {
    // Connect to socket
    socketService.connect();

    // Listen for real-time updates
    socketService.onContentUpdate((newContent) => {
      if (newContent.theme && newContent.theme.bgColor) {
        setBgColor(newContent.theme.bgColor);
      }
    });

    // Initial fetch
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        if (data.theme && data.theme.bgColor) {
          setBgColor(data.theme.bgColor);
        }
      })
      .catch(err => console.error('Failed to fetch initial theme:', err));
  }, []);

  return (
    <ShopContext.Provider value={{ bgColor, setBgColor, broadcastActive, setBroadcastActive }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within a ShopProvider');
  return context;
};
