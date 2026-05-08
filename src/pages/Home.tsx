import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import Pricing from '../components/Pricing';
import SocialProof from '../components/SocialProof';
import CTABanner from '../components/CTABanner';
import MovieModal from '../components/MovieModal';
import PaymentModal from '../components/PaymentModal';
import { movies, pricingTiers } from '../lib/data';
import { Movie, PricingTier } from '../lib/types';
import { motion, AnimatePresence } from 'motion/react';

interface HomeProps {
  onAuthOpen: () => void;
}

export default function Home({ onAuthOpen }: HomeProps) {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<Movie[]>([]);
  
  // Payment state
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null);
  const [isYearly, setIsYearly] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('recently-viewed');
    if (saved) {
      const ids = JSON.parse(saved) as string[];
      setRecentlyViewed(movies.filter(m => ids.includes(m.id)));
    }
  }, []);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    
    // Add to recently viewed
    const current = JSON.parse(localStorage.getItem('recently-viewed') || '[]') as string[];
    const updated = [movie.id, ...current.filter(id => id !== movie.id)].slice(0, 8);
    localStorage.setItem('recently-viewed', JSON.stringify(updated));
    setRecentlyViewed(movies.filter(m => updated.includes(m.id)));
  };

  const handlePlanSelect = (tier: PricingTier, yearly: boolean) => {
    if (tier.id === 'basic') return; // Basic is free
    setSelectedTier(tier);
    setIsYearly(yearly);
    setIsPaymentOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-20"
    >
      <Hero onAuthOpen={onAuthOpen} />
      
      <div className="relative z-20 space-y-12 -mt-24 lg:-mt-48 bg-gradient-to-t from-dark-bg via-dark-bg to-transparent pt-32">
        {recentlyViewed.length > 0 && (
          <MovieRow 
            title="Recently Viewed" 
            movies={recentlyViewed} 
            onMovieClick={handleMovieClick} 
          />
        )}
        
        <MovieRow 
          title="Trending Now" 
          movies={movies.filter(m => m.isTrending)} 
          onMovieClick={handleMovieClick} 
        />
        
        <MovieRow 
          title="New Releases" 
          movies={movies.filter(m => m.isNew)} 
          onMovieClick={handleMovieClick} 
        />
        
        <MovieRow 
          title="Top Rated" 
          movies={movies.filter(m => m.isTopRated)} 
          onMovieClick={handleMovieClick} 
        />
      </div>

      <Pricing onPlanSelect={handlePlanSelect} onAuthNeeded={onAuthOpen} />
      <SocialProof />
      <CTABanner onAuthOpen={onAuthOpen} />

      <MovieModal 
        movie={selectedMovie} 
        onClose={() => setSelectedMovie(null)} 
      />

      <PaymentModal 
        isOpen={isPaymentOpen} 
        onClose={() => setIsPaymentOpen(false)} 
        tier={selectedTier} 
        isYearly={isYearly} 
      />
    </motion.div>
  );
}
