import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, User, Menu, X, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onAuthOpen: () => void;
}

export default function Navbar({ onAuthOpen }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 px-6 py-4 flex items-center justify-between",
        isScrolled ? "bg-dark-bg/95 backdrop-blur-md shadow-2xl py-3" : "bg-gradient-to-b from-black/80 to-transparent"
      )}
    >
      <div className="flex items-center gap-10">
        <Link to="/" className="text-netflix-red font-display text-4xl tracking-tighter hover:scale-105 transition-transform">
          CINESTREAM
        </Link>
        
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-300">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/search" className="hover:text-white transition-colors">Movies</Link>
          <Link to="/search" className="hover:text-white transition-colors">TV Shows</Link>
          <Link to="/search" className="hover:text-white transition-colors">Trending</Link>
          <Link to="/search" className="hover:text-white transition-colors">Watchlist</Link>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={() => navigate('/search')}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <Search size={20} />
          </button>
          
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-netflix-red rounded-full ring-2 ring-dark-bg"></span>
          </button>

          {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-3 p-1 pl-4 hover:bg-white/10 rounded-full transition-all group"
              >
                <div className="text-right hidden xl:block">
                  <p className="text-xs font-bold text-white line-clamp-1">{user.name}</p>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Premium</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-netflix-red flex items-center justify-center font-bold text-white shadow-lg shadow-red-900/20">
                  {user.name.charAt(0)}
                </div>
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-4 w-56 bg-card-bg border border-white/5 rounded-2xl p-2 shadow-2xl py-3"
                  >
                    <div className="px-4 py-3 border-b border-white/5 mb-2">
                       <p className="text-sm font-bold truncate">{user.name}</p>
                       <p className="text-[10px] text-zinc-500 truncate">{user.email}</p>
                    </div>
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-white/5 rounded-xl transition-colors flex items-center gap-3">
                       <User size={16} /> Profile
                    </button>
                    <button 
                      onClick={() => { logout(); setIsUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-netflix-red hover:bg-red-500/10 rounded-xl transition-colors flex items-center gap-3"
                    >
                       <LogOut size={16} /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button 
              onClick={onAuthOpen}
              className="bg-netflix-red text-white px-8 py-2.5 rounded-sm font-black uppercase tracking-widest text-xs hover:bg-red-700 transition-all hover:scale-105"
            >
              Sign In
            </button>
          )}
        </div>
        
        <button 
          className="lg:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-card-bg border-t border-white/10 flex flex-col p-6 gap-4 lg:hidden"
          >
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-lg font-bold">Home</Link>
            <Link to="/search" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-lg">Movies</Link>
            <Link to="/search" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-lg">TV Shows</Link>
            {user ? (
               <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="text-netflix-red font-bold text-left py-2">Sign Out</button>
            ) : (
               <button onClick={() => { onAuthOpen(); setIsMobileMenuOpen(false); }} className="bg-netflix-red text-white py-4 rounded-sm font-bold">Sign In</button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
