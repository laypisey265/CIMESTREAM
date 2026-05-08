import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, User, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

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
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <User size={20} />
          </button>
          <button className="bg-netflix-red text-white px-5 py-2 rounded-sm font-medium text-sm hover:bg-red-700 transition-colors">
            Sign In
          </button>
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
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/search" onClick={() => setIsMobileMenuOpen(false)}>Movies</Link>
            <Link to="/search" onClick={() => setIsMobileMenuOpen(false)}>TV Shows</Link>
            <button className="bg-netflix-red text-white py-3 rounded-sm">Sign In</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
