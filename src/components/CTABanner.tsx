import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface CTABannerProps {
  onAuthOpen: () => void;
}

export default function CTABanner({ onAuthOpen }: CTABannerProps) {
  return (
    <section className="py-24 px-10">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto rounded-[3rem] overflow-hidden relative bg-gradient-to-br from-red-800 via-netflix-red to-red-900 group shadow-[0_0_80px_rgba(229,9,20,0.3)]"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2670&auto=format&fit=crop')] opacity-10 bg-cover bg-center group-hover:scale-105 transition-transform duration-1000"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
        
        <div className="relative z-10 p-12 md:p-24 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl space-y-6">
            <h2 className="text-4xl md:text-6xl font-display italic leading-none tracking-tighter text-shadow-hero">
              Your next obsession <br />
              is one click away
            </h2>
            <p className="text-white/80 text-lg md:text-xl font-light">
              Join 10 million+ cinema enthusiasts and start your 7-day free trial today. No commitments, cancel anytime.
            </p>
          </div>

          <div className="w-full md:w-auto space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-5 rounded-sm flex-1 md:min-w-[300px] focus:outline-none focus:ring-2 ring-white/50 text-placeholder:white/50"
              />
              <button 
                onClick={onAuthOpen}
                className="bg-white text-netflix-red px-10 py-5 rounded-sm font-black uppercase tracking-widest text-sm hover:bg-zinc-100 transition-all flex items-center justify-center gap-2"
              >
                Get Started Free <ArrowRight size={18} />
              </button>
            </div>
            <p className="text-[10px] text-white/50 uppercase tracking-[0.2em] font-bold text-center sm:text-left">
              New Members only. T&Cs Apply.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
