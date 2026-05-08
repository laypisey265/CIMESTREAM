import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, X } from 'lucide-react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-10 md:w-[400px] z-[150]"
        >
          <div className="bg-zinc-900/90 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-netflix-red/20 rounded-full flex items-center justify-center text-netflix-red shrink-0">
                <ShieldCheck size={20} />
              </div>
              <h4 className="font-bold text-sm">We value your privacy</h4>
            </div>
            
            <p className="text-xs text-zinc-400 leading-relaxed">
              We use cookies to improve your cinematic experience and deliver personalized content. By clicking "Accept All", you agree to our use of cookies.
            </p>
            
            <div className="flex gap-3">
              <button 
                onClick={accept}
                className="flex-1 bg-white text-black py-2.5 rounded-sm text-xs font-bold hover:bg-zinc-200 transition-colors"
              >
                Accept All
              </button>
              <button 
                onClick={() => setIsVisible(false)}
                className="flex-1 bg-white/5 border border-white/10 text-white py-2.5 rounded-sm text-xs font-bold hover:bg-white/10 transition-colors"
              >
                Preferences
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
