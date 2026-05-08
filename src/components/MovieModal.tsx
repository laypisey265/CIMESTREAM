import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Plus, Star, Calendar, Clock, Share2, Youtube, Lock } from 'lucide-react';
import { Movie } from '../lib/types';
import { movies } from '../lib/data';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  if (!movie) return null;

  const related = movies.filter(m => m.id !== movie.id).slice(0, 4);

  const handleWatchNow = () => {
    if (user?.isPremium) {
      onClose();
      navigate(`/movie/${movie.id}`);
    } else {
      // Smooth scroll to pricing
      onClose();
      setTimeout(() => {
        const pricing = document.getElementById('pricing');
        pricing?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-6xl bg-card-bg rounded-xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto scrollbar-thin"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-20 p-2 bg-black/50 hover:bg-black/80 rounded-full transition-colors"
          >
            <X size={24} />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px]">
            {/* Main Content */}
            <div className="p-8 md:p-12 space-y-10">
              <div className="flex flex-col md:flex-row gap-8">
                <img 
                  src={movie.poster} 
                  alt={movie.title}
                  className="w-full md:w-64 aspect-[2/3] object-cover rounded-lg shadow-2xl"
                />
                
                <div className="flex-1 space-y-6">
                  <h2 className="text-4xl md:text-6xl font-display uppercase italic tracking-tighter leading-none">
                    {movie.title}
                  </h2>
                  <p className="text-gold italic text-lg font-light">"{movie.tagline}"</p>
                  
                  <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-400">
                    <div className="flex items-center gap-2">
                       <Calendar size={16} /> {movie.year}
                    </div>
                    <div className="flex items-center gap-2">
                       <Clock size={16} /> {movie.runtime}
                    </div>
                    <div className="flex items-center gap-2 text-gold font-bold">
                       <Star size={16} fill="currentColor" /> {movie.imdbRating}
                    </div>
                    <div className="px-2 py-0.5 border border-zinc-700 rounded text-[10px] uppercase font-bold tracking-widest">
                       {movie.rtRating}% Fresh
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {movie.genres.map(g => (
                      <span key={g} className="px-3 py-1 bg-white/5 rounded-full text-xs">{g}</span>
                    ))}
                  </div>

                  <p className="text-zinc-300 leading-relaxed text-lg">
                    {movie.synopsis}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <button 
                      onClick={handleWatchNow}
                      className="flex items-center gap-2 bg-netflix-red hover:bg-red-700 px-8 py-3 rounded-sm font-bold transition-all group"
                    >
                      {user?.isPremium ? (
                        <><Play size={18} fill="currentColor" /> Watch Now</>
                      ) : (
                        <><Lock size={18} /> Upgrade to Watch</>
                      )}
                    </button>
                    <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-8 py-3 rounded-sm font-bold transition-all border border-white/5">
                      <Plus size={18} /> Add to Watchlist
                    </button>
                    <button className="p-3 bg-white/10 hover:bg-white/20 rounded-sm border border-white/5 transition-all">
                      <Youtube size={20} />
                    </button>
                    <button className="p-3 bg-white/10 hover:bg-white/20 rounded-sm border border-white/5 transition-all">
                      <Share2 size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Cast */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold border-l-4 border-netflix-red pl-4">Full Cast</h3>
                <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                  {movie.cast.map((c, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 shrink-0">
                      <img src={c.avatar} alt={c.name} className="w-16 h-16 rounded-full object-cover grayscale hover:grayscale-0 transition-all border-2 border-white/10" />
                      <div className="text-center">
                        <p className="text-xs font-bold text-white">{c.name}</p>
                        <p className="text-[10px] text-zinc-500">{c.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar: More Like This */}
            <div className="bg-black/20 p-8 border-l border-white/5 space-y-8">
              <h3 className="text-xl font-bold">More Like This</h3>
              <div className="grid grid-cols-1 gap-6">
                {related.map(m => (
                  <div key={m.id} className="flex gap-4 group cursor-pointer" onClick={() => onClose()}>
                    <div className="w-20 aspect-[2/3] rounded overflow-hidden flex-shrink-0">
                      <img src={m.poster} alt={m.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="flex flex-col justify-center gap-1">
                      <h4 className="text-sm font-bold line-clamp-1">{m.title}</h4>
                      <p className="text-xs text-zinc-500">{m.year}</p>
                      <div className="flex items-center gap-1 text-gold text-[10px]">
                        <Star size={10} fill="currentColor" /> {m.imdbRating}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-8 space-y-4">
                <div className="p-6 bg-gradient-to-br from-netflix-red/20 to-transparent border border-netflix-red/30 rounded-lg">
                   <h4 className="font-bold text-sm mb-2">Streaming in 4K Ultra HD</h4>
                   <p className="text-xs text-zinc-400 leading-relaxed">Included with Premium membership. Enjoy theatrical quality sound with Spatial Audio.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
