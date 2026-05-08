import React from 'react';
import { motion } from 'motion/react';
import { Play, Info } from 'lucide-react';
import { movies } from '../lib/data';

export default function Hero() {
  const featured = movies[0];

  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden">
      {/* Background with Vignette */}
      <div className="absolute inset-0">
        <img 
          src={featured.backdrop} 
          alt={featured.title}
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-10 md:px-20 max-w-4xl space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4"
        >
          <span className="inline-block px-3 py-1 bg-netflix-red/20 border border-netflix-red/30 text-netflix-red text-xs font-black uppercase tracking-[0.2em] rounded-sm">
            Exclusive Premiere
          </span>
          <h1 className="font-display text-7xl md:text-[8rem] leading-[0.8] tracking-tighter text-shadow-hero italic uppercase">
            Cinema Without <br />
            <span className="text-netflix-red not-italic">Limits</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 max-w-xl font-light leading-relaxed">
            {featured.tagline} Stream the most anticipated blockbusters and critically acclaimed originals in stunning 4K HDR.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center gap-4"
        >
          <button className="flex items-center gap-3 bg-white text-black px-10 py-4 rounded-sm font-bold hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 group">
            <Play fill="currentColor" /> Start Watching Free
          </button>
          <button className="flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-10 py-4 rounded-sm font-bold transition-all border border-white/10">
            <Info /> Browse Catalogue
          </button>
        </motion.div>
      </div>

      {/* Hero Movie Carousel (Infinite Marquee) */}
      <div className="absolute bottom-12 left-0 w-full overflow-hidden mask-fade-edges">
        <motion.div 
          animate={{ x: [0, -1920] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-6 whitespace-nowrap"
        >
          {[...movies, ...movies].map((movie, i) => (
            <div key={`marquee-${i}`} className="w-32 h-48 rounded-md overflow-hidden shrink-0 border border-white/5 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
              <img src={movie.poster} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
