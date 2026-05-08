import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Gift } from 'lucide-react';

export default function ExitIntent() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseOut = (e: MouseEvent) => {
      if (hasShown) return;
      if (e.clientY <= 0 || e.clientX <= 0 || e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseOut);
    return () => document.removeEventListener('mouseleave', handleMouseOut);
  }, [hasShown]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
          onClick={() => setIsVisible(false)}
        />
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          className="relative max-w-lg w-full bg-netflix-red p-12 rounded-3xl text-center space-y-8 shadow-[0_0_100px_rgba(229,9,20,0.5)] overflow-hidden"
        >
          {/* Fun background circle */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          
          <div className="relative z-10 space-y-6">
            <div className="mx-auto w-20 h-20 bg-white rounded-full flex items-center justify-center text-netflix-red shadow-2xl animate-bounce">
              <Gift size={40} />
            </div>
            
            <h2 className="text-4xl font-display italic tracking-tight uppercase">Wait! Before You Go...</h2>
            <p className="text-white/90 text-lg font-light leading-relaxed">
              Don't miss out on the season's biggest premieres. Start your <span className="font-bold underline">7-Day Free Trial</span> tonight and see what everyone's talking about.
            </p>
            
            <div className="space-y-4 pt-4">
              <button 
                onClick={() => setIsVisible(false)}
                className="w-full bg-white text-netflix-red py-4 rounded-sm font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-xl"
              >
                Claim Offer Now
              </button>
              <button 
                onClick={() => setIsVisible(false)}
                className="text-white/60 text-xs hover:text-white transition-colors"
              >
                Maybe later, take me back
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
