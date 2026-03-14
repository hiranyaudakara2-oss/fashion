import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Home, LogOut, Settings } from 'lucide-react';

export default function AdminNavbar() {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 h-12 bg-[#1A1A1A] text-red-600 z-[60] flex items-center px-6 text-xs font-sans tracking-widest uppercase"
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-red-800">
            <Settings size={14} />
            <span>Admin Mode</span>
          </div>
          <Link to="/" className="flex items-center gap-2 hover:text-red-400 transition-colors">
            <Home size={14} />
            <span>View Site</span>
          </Link>
          <Link to="/admin" className="flex items-center gap-2 hover:text-red-400 transition-colors">
            <LayoutDashboard size={14} />
            <span>Dashboard</span>
          </Link>
        </div>
        
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 hover:text-red-400 transition-colors"
        >
          <LogOut size={14} />
          <span>Exit Admin</span>
        </button>
      </div>
    </motion.div>
  );
}
