import React from 'react';
import { Star, Play, Plus, Info } from 'lucide-react';
import { Movie } from '../lib/types';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="relative aspect-[2/3] w-[220px] rounded-lg overflow-hidden cursor-pointer group shadow-lg"
      onClick={() => onClick(movie)}
    >
      <img 
        src={movie.poster} 
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 p-4 w-full space-y-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-gold">
              <Star size={14} fill="currentColor" />
              <span className="text-xs font-bold">{movie.imdbRating}</span>
            </div>
            <div className="flex gap-2">
              <button className="p-1.5 bg-white rounded-full text-black hover:bg-zinc-200 transition-colors">
                <Play size={12} fill="currentColor" />
              </button>
              <button className="p-1.5 bg-zinc-800/80 rounded-full text-white hover:bg-zinc-700 transition-colors">
                <Plus size={12} />
              </button>
            </div>
          </div>
          
          <h3 className="font-bold text-sm truncate">{movie.title}</h3>
          <div className="flex items-center gap-2 text-[10px] text-zinc-400">
            <span>{movie.year}</span>
            <span className="w-1 h-1 bg-zinc-600 rounded-full"></span>
            <span>{movie.genres[0]}</span>
          </div>
          
          <p className="text-[10px] text-zinc-300 line-clamp-2 leading-tight">
            {movie.synopsis}
          </p>
          
          <button className="w-full flex items-center justify-center gap-1 py-1.5 mt-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-sm text-[10px] font-bold uppercase transition-colors">
            <Info size={10} /> Details
          </button>
        </div>
      </div>
      
      {movie.isNew && (
        <div className="absolute top-2 left-2 px-2 py-0.5 bg-netflix-red text-[8px] font-black uppercase tracking-tighter rounded-sm shadow-xl">
          New
        </div>
      )}
    </motion.div>
  );
}
