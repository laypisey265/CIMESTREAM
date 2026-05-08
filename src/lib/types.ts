export interface Movie {
  id: string;
  title: string;
  tagline: string;
  year: number;
  runtime: string;
  genres: string[];
  imdbRating: number;
  rtRating: number;
  synopsis: string;
  poster: string;
  backdrop: string;
  cast: { name: string; role: string; avatar: string }[];
  isTrending?: boolean;
  isNew?: boolean;
  isTopRated?: boolean;
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  quote: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  features: string[];
  isPopular?: boolean;
}
