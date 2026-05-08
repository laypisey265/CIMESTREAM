import React, { useState, useMemo } from 'react';
import { movies } from '../lib/data';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';
import { Movie } from '../lib/types';
import { Search as SearchIcon, Filter, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'rating' | 'year' | 'title'>('rating');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const genres = useMemo(() => {
    const set = new Set<string>();
    movies.forEach(m => m.genres.forEach(g => set.add(g)));
    return Array.from(set);
  }, []);

  const filteredMovies = useMemo(() => {
    return movies
      .filter(m => {
        const matchesQuery = m.title.toLowerCase().includes(query.toLowerCase());
        const matchesGenre = !selectedGenre || m.genres.includes(selectedGenre);
        return matchesQuery && matchesGenre;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.imdbRating - a.imdbRating;
        if (sortBy === 'year') return b.year - a.year;
        return a.title.localeCompare(b.title);
      });
  }, [query, selectedGenre, sortBy]);

  return (
    <div className="pt-32 px-6 md:px-10 pb-20 min-h-screen">
      {/* Search Header */}
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col items-center gap-8">
           <h1 className="text-4xl md:text-6xl font-display uppercase tracking-wider italic text-center">
             Browse <span className="text-netflix-red">Catalogue</span>
           </h1>
           
           <div className="w-full max-w-2xl relative group">
              <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-netflix-red transition-colors" size={24} />
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search movies, genres, actors..."
                className="w-full bg-white/5 border border-white/10 px-16 py-6 rounded-2xl focus:outline-none focus:ring-2 ring-netflix-red transition-all text-xl"
              />
              {query && (
                <button onClick={() => setQuery('')} className="absolute right-6 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full">
                  <X size={20} />
                </button>
              )}
           </div>
        </div>

        {/* Filters & Sorting */}
        <div className="flex flex-wrap items-center justify-between gap-6 py-8 border-y border-white/5">
          <div className="flex items-center gap-4 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
            <button 
              onClick={() => setSelectedGenre(null)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                !selectedGenre ? "bg-netflix-red text-white" : "bg-white/5 hover:bg-white/10 text-zinc-400"
              )}
            >
              All Genres
            </button>
            {genres.map(g => (
              <button 
                key={g}
                onClick={() => setSelectedGenre(g)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                  selectedGenre === g ? "bg-netflix-red text-white" : "bg-white/5 hover:bg-white/10 text-zinc-400"
                )}
              >
                {g}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-zinc-500">
               <ArrowUpDown size={16} />
               <span>Sort by:</span>
               <select 
                 value={sortBy}
                 onChange={(e) => setSortBy(e.target.value as any)}
                 className="bg-transparent text-white focus:outline-none cursor-pointer font-bold"
               >
                 <option value="rating">Rating</option>
                 <option value="year">Newest</option>
                 <option value="title">A-Z</option>
               </select>
            </div>
            <div className="h-6 w-px bg-white/10 hidden md:block"></div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg text-sm hover:bg-white/10 transition-all font-bold">
              <SlidersHorizontal size={16} /> Filters
            </button>
          </div>
        </div>

        {/* Results Grid */}
        <div className="min-h-[400px]">
          {filteredMovies.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredMovies.map((movie) => (
                  <motion.div
                    key={movie.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MovieCard movie={movie} onClick={setSelectedMovie} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 space-y-6 text-zinc-600">
               <div className="p-10 bg-white/5 rounded-full ring-1 ring-white/5">
                 <SearchIcon size={80} strokeWidth={1} />
               </div>
               <div className="text-center">
                 <h3 className="text-2xl font-bold text-white">No matches found</h3>
                 <p className="max-w-xs mx-auto">Try searching for something else or clearing your filters.</p>
               </div>
               <button 
                 onClick={() => { setQuery(''); setSelectedGenre(null); }}
                 className="px-8 py-3 bg-netflix-red text-white font-bold rounded-sm text-sm"
               >
                 Clear All Filters
               </button>
            </div>
          )}
        </div>
      </div>

      <MovieModal 
        movie={selectedMovie} 
        onClose={() => setSelectedMovie(null)} 
      />
    </div>
  );
}
