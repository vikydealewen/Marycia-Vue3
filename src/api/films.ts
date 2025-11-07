import type { IFilm } from '@/types/film';
import type { Genre } from '@/types/genres';
import { API_BASE } from '@/config';

import { apiRequest } from './apiRequest';

function isApiErrorResponse(data: any): data is { name: string } {
  return typeof data === 'object' && data?.name === 'PrismaClientUnknownRequestError';
}

export const getTopFilms = (): Promise<IFilm[]> => {
  return apiRequest<IFilm[]>(`${API_BASE}/movie/top10`, {
    method: 'GET',
  });
};

export const getFilmRandom = (): Promise<IFilm> => {
  return apiRequest<IFilm>(`${API_BASE}/movie/random`, {
    method: 'GET',
  });
};

export const getFilm = async (id: number): Promise<IFilm> => {
  const data = await apiRequest<unknown>(`${API_BASE}/movie/${id}`, {
    method: 'GET',
  });

  if (isApiErrorResponse(data)) {
    throw new Error('Фильм не найден');
  }

  return data as IFilm;
};

export const getGenres = (): Promise<Genre[]> => {
  return apiRequest<Genre[]>(`${API_BASE}/movie/genres`, {
    method: 'GET',
  });
};

export const getFilmsByGenre = (count: number, page: number, genre: Genre): Promise<IFilm[]> => {
  return apiRequest<IFilm[]>(`${API_BASE}/movie/?count=${count}&page=${page}&genre=${genre}`, {
    method: 'GET',
  });
};

export const getFilmsByTitle = (title: string): Promise<IFilm[]> => {
  return apiRequest<IFilm[]>(`${API_BASE}/movie/?title=${title}&count=5`, {
    method: 'GET',
  });
};

export const isGenreValid = async (genre: Genre): Promise<boolean> => {
  const genres = await apiRequest<string[]>(`${API_BASE}/movie/genres`, { method: 'GET' });
  return genres.includes(genre);
};
