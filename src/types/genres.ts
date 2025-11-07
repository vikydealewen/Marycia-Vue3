const GENRES = [
  'history',
  'horror',
  'scifi',
  'stand-up',
  'fantasy',
  'drama',
  'mystery',
  'family',
  'comedy',
  'romance',
  'music',
  'crime',
  'tv-movie',
  'documentary',
  'action',
  'thriller',
  'western',
  'animation',
  'war',
  'adventure',
] as const;

export type Genre = (typeof GENRES)[number];

export interface IGenre {
  name: Genre;
  image: string;
  title: string;
}
