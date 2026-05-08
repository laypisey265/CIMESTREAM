import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { movies } from '../lib/data';
import { Movie } from '../lib/types';
import { Play, Plus, Star, Calendar, Clock, ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';
import MovieRow from '../components/MovieRow';

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const found = movies.find(m => m.id === id);
    if (found) {
      setMovie(found);
      window.scrollTo(0, 0);
    } else {
      navigate('/search');
    }
  }, [id, navigate]);

  if (!movie) return null;

  const related = movies.filter(m => m.id !== movie.id).slice(0, 8);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-20"
    >
      {/* Backdrop Section */}
      <div className="relative h-[80vh] w-full overflow-hidden">
        <img 
          src={movie.backdrop} 
          alt={movie.title}
          className="w-full h-full object-cover scale-105 blur-[2px] opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-dark-bg/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent"></div>
        
        {/* Detail Content */}
        <div className="absolute inset-x-10 bottom-20 z-10 max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-end">
          <motion.img 
            layoutId={`movie-poster-${movie.id}`}
            src={movie.poster} 
            alt={movie.title}
            className="w-64 aspect-[2/3] object-cover rounded-xl shadow-2xl hidden md:block border border-white/5"
          />
          
          <div className="space-y-6 flex-1">
             <button 
               onClick={() => navigate(-1)}
               className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-4 group"
             >
               <ChevronLeft className="group-hover:-translate-x-1 transition-transform" /> Back to result
             </button>
             
             <motion.h1 
                layoutId={`movie-title-${movie.id}`}
                className="text-5xl md:text-8xl font-display uppercase italic tracking-tighter leading-none text-shadow-hero"
             >
               {movie.title}
             </motion.h1>
             
             <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-gold">
                   <Star size={18} fill="currentColor" />
                   <span className="font-bold text-lg">{movie.imdbRating}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                   <Calendar size={18} /> {movie.year}
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                   <Clock size={18} /> {movie.runtime}
                </div>
             </div>

             <div className="flex gap-4 pt-4">
                <button className="flex items-center gap-3 bg-netflix-red hover:bg-red-700 px-12 py-4 rounded-sm font-black transition-all uppercase tracking-widest text-sm">
                  <Play size={18} fill="currentColor" /> Watch Now
                </button>
                <button className="flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md px-12 py-4 rounded-sm font-black transition-all border border-white/10 uppercase tracking-widest text-sm">
                  <Plus size={18} /> Add to Watchlist
                </button>
             </div>
          </div>
        </div>
      </div>

      {/* Synopsis and More */}
      <div className="max-w-5xl mx-auto px-10 py-20 grid grid-cols-1 md:grid-cols-[1fr_300px] gap-20">
        <div className="space-y-12">
           <section className="space-y-6">
              <h3 className="text-2xl font-bold border-l-4 border-netflix-red pl-4">Synopsis</h3>
              <p className="text-xl text-zinc-300 leading-relaxed font-light">
                {movie.synopsis}
              </p>
           </section>

           <section className="space-y-6">
              <h3 className="text-2xl font-bold border-l-4 border-netflix-red pl-4">Full Cast</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                {movie.cast.map((c, i) => (
                  <div key={i} className="space-y-3 group cursor-pointer">
                    <div className="aspect-square rounded-2xl overflow-hidden ring-1 ring-white/10 group-hover:ring-netflix-red transition-all">
                       <img src={c.avatar} alt={c.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                    </div>
                    <div>
                      <p className="font-bold">{c.name}</p>
                      <p className="text-xs text-zinc-500 uppercase tracking-widest">{c.role}</p>
                    </div>
                  </div>
                ))}
              </div>
           </section>
        </div>

        <div className="space-y-12">
           <div className="p-8 bg-card-bg rounded-2xl border border-white/5 space-y-6">
              <h4 className="font-bold text-lg">Details</h4>
              <div className="space-y-4 text-sm">
                <DetailRow label="Director" value="Christopher Nolan" />
                <DetailRow label="Language" value="English, Hindi" />
                <DetailRow label="Studio" value="Universal Pictures" />
                <DetailRow label="Quality" value="4K Ultra HD" />
              </div>
           </div>

           <div className="space-y-4">
              <h4 className="font-bold text-lg">Soundtracks</h4>
              <div className="space-y-2">
                 {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg transition-colors cursor-pointer group">
                       <div className="w-10 h-10 bg-white/10 rounded flex items-center justify-center font-bold text-xs group-hover:bg-netflix-red">
                          {i}
                       </div>
                       <div className="text-xs">
                          <p className="font-bold">Original Theme {i}</p>
                          <p className="text-zinc-500">Hans Zimmer</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      <div className="pt-20">
        <MovieRow 
          title="More Like This" 
          movies={related} 
          onMovieClick={(m) => navigate(`/movie/${m.id}`)} 
        />
      </div>
    </motion.div>
  );
}

function DetailRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-white/5">
      <span className="text-zinc-500">{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}
