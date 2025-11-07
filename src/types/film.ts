import type { Genre } from './genres';

export interface IFilm {
  keywords: string[];
  backdropUrl: string;
  production: string;
  trailerYouTubeId: string;
  language: string;
  tmdbRating: number;
  title: string;
  cast: string[];
  revenue: string;
  posterUrl: string;
  plot: string;
  genres: Genre[];
  id: number;
  budget: string;
  languages: string[];
  releaseDate: string;
  director: string;
  awardsSummary: string;
  runtime: number;
  trailerUrl: string;
  relaseYear: number;
  countriesOfOrigin: string[];
  originalTitle: string;
  searchL: string;
  homepage: string;
  status: string;
}

export interface IFilmCardData {
  language: string;
  budget: string;
  revenue: string;
  director: string;
  production: string;
  awardsSummary: string;
}
