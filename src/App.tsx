import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SearchPage from './pages/Search';
import MovieDetail from './pages/MovieDetail';
import CookieBanner from './components/CookieBanner';
import ExitIntent from './components/ExitIntent';
import { AnimatePresence, motion } from 'motion/react';

function AppLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen relative">
      <div className="grain-overlay" />
      <Navbar />
      
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <CookieBanner />
      <ExitIntent />
      
      {/* Mobile Bottom CTA Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full p-4 bg-dark-bg/80 backdrop-blur-md border-t border-white/10 z-[60]">
        <button className="w-full bg-netflix-red py-3 rounded-sm font-bold text-sm flex items-center justify-center gap-2">
          Start Watching Free <span className="text-xl">→</span>
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
