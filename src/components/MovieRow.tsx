import React, { useRef, useState, useEffect } from 'react';
import { Movie } from '../lib/types';
import MovieCard from './MovieCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

export default function MovieRow({ title, movies, onMovieClick }: MovieRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showControls, setShowControls] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth * 0.8 
        : scrollLeft + clientWidth * 0.8;
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="space-y-4 px-10 mb-12"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <h2 className="text-2xl font-bold text-white/90 border-l-4 border-netflix-red pl-4 leading-none">
        {title}
      </h2>
      
      <div className="relative">
        {showControls && (
          <>
            <button 
              onClick={() => scroll('left')}
              className="absolute left-0 top-0 bottom-0 z-10 bg-black/40 hover:bg-black/60 px-4 transition-all"
            >
              <ChevronLeft size={32} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="absolute right-0 top-0 bottom-0 z-10 bg-black/40 hover:bg-black/60 px-4 transition-all"
            >
              <ChevronRight size={32} />
            </button>
          </>
        )}

        <div 
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map((movie) => (
            <div key={movie.id} className="snap-start shrink-0">
              <MovieCard movie={movie} onClick={onMovieClick} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
