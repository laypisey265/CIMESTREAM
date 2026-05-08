import { Movie, Review, PricingTier } from './types';

export const movies: Movie[] = [
  {
    id: "1",
    title: "Interstellar",
    tagline: "Mankind was born on Earth. It was never meant to die here.",
    year: 2014,
    runtime: "2h 49m",
    genres: ["Sci-Fi", "Drama", "Adventure"],
    imdbRating: 8.7,
    rtRating: 73,
    synopsis: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2694&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2672&auto=format&fit=crop",
    cast: [
      { name: "Matthew McConaughey", role: "Cooper", avatar: "https://i.pravatar.cc/150?u=mc" },
      { name: "Anne Hathaway", role: "Brand", avatar: "https://i.pravatar.cc/150?u=ah" }
    ],
    isTrending: true,
    isTopRated: true
  },
  {
    id: "2",
    title: "Blade Runner 2049",
    tagline: "There are still pages left to be turned.",
    year: 2017,
    runtime: "2h 44m",
    genres: ["Sci-Fi", "Action"],
    imdbRating: 8.0,
    rtRating: 88,
    synopsis: "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missing for thirty years.",
    poster: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2670&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1613679074971-91ea27180061?q=80&w=2670&auto=format&fit=crop",
    cast: [
      { name: "Ryan Gosling", role: "K", avatar: "https://i.pravatar.cc/150?u=rg" },
      { name: "Harrison Ford", role: "Deckard", avatar: "https://i.pravatar.cc/150?u=hf" }
    ],
    isTrending: true,
    isNew: true
  },
  {
    id: "3",
    title: "Dune: Part Two",
    tagline: "Long live the fighters.",
    year: 2024,
    runtime: "2h 46m",
    genres: ["Action", "Adventure", "Sci-Fi"],
    imdbRating: 8.8,
    rtRating: 95,
    synopsis: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.",
    poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=2670&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop",
    cast: [
      { name: "Timothée Chalamet", role: "Paul", avatar: "https://i.pravatar.cc/150?u=tc" },
      { name: "Zendaya", role: "Chani", avatar: "https://i.pravatar.cc/150?u=z" }
    ],
    isTrending: true,
    isNew: true,
    isTopRated: true
  },
  {
    id: "4",
    title: "The Grand Budapest Hotel",
    tagline: "A perfectly orchestrated comedy.",
    year: 2014,
    runtime: "1h 39m",
    genres: ["Comedy", "Adventure"],
    imdbRating: 8.1,
    rtRating: 92,
    synopsis: "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years.",
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2574&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1542204172-55af330f5bf1?q=80&w=2574&auto=format&fit=crop",
    cast: [
      { name: "Ralph Fiennes", role: "Gustave", avatar: "https://i.pravatar.cc/150?u=rf" }
    ],
    isTopRated: true
  },
  // Adding more mock movies to fulfill the 15-20 requirement
  ...Array.from({ length: 12 }).map((_, i) => ({
    id: (i + 5).toString(),
    title: `Cinematic Journey ${i + 1}`,
    tagline: "An experience like no other.",
    year: 2023 - i,
    runtime: "2h 10m",
    genres: ["Drama", "Thriller"],
    imdbRating: 7.5 + (Math.random() * 2),
    rtRating: 80 + (Math.random() * 15),
    synopsis: "An immersive narrative that challenges your perception of reality and explores the depths of the human condition.",
    poster: `https://images.unsplash.com/photo-${1500000000000 + i}?q=80&w=2574&auto=format&fit=crop`,
    backdrop: `https://images.unsplash.com/photo-${1510000000000 + i}?q=80&w=2574&auto=format&fit=crop`,
    cast: [{ name: "Actor Name", role: "Lead", avatar: `https://i.pravatar.cc/150?u=${i}` }],
    isTrending: i % 3 === 0,
    isNew: i % 4 === 0,
    isTopRated: i % 5 === 0
  }))
];

export const reviews: Review[] = [
  { id: "1", name: "Sarah J.", avatar: "https://i.pravatar.cc/150?u=1", rating: 5, quote: "The streaming quality is unmatched. 4K HDR looks incredible on my OLED TV!" },
  { id: "2", name: "Michael R.", avatar: "https://i.pravatar.cc/150?u=2", rating: 5, quote: "Finally, a platform that respects the cinematic aspect ratio. A film lover's dream." },
  { id: "3", name: "Elena Q.", avatar: "https://i.pravatar.cc/150?u=3", rating: 5, quote: "The curated collections helped me find my new favorite indie director." }
];

export const pricingTiers: PricingTier[] = [
  { id: "basic", name: "Basic", price: 0, features: ["720p Streaming", "1 Out of 1000 Titles", "Ad-supported", "1 Device"] },
  { id: "standard", name: "Standard", price: 9.99, features: ["1080p Full HD", "Full Catalogue", "No Ads", "2 Devices", "Download Feature"], isPopular: true },
  { id: "premium", name: "Premium", price: 14.99, features: ["4K + HDR Streaming", "Exclusive Early Access", "Spatial Audio", "4 Devices", "Priority Support"] }
];
