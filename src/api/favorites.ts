import { API_BASE } from '@/config';
import type { IFilm } from '@/types/film';
import type { IProfileData } from '@/types/user';
import { apiRequest } from './apiRequest';

export const getFavoriteFilms = async (): Promise<IFilm[]> => {
  return apiRequest<IFilm[]>(`${API_BASE}/favorites`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
};

export const addFilmToFavorites = async (filmId: number): Promise<IProfileData> => {
  const params = new URLSearchParams({ id: String(filmId) });

  return apiRequest<IProfileData>(`${API_BASE}/favorites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: 'include',
    body: params.toString(),
  });
};

export const removeFilmFromFavorites = async (filmId: number): Promise<IProfileData> => {
  return apiRequest<IProfileData>(`${API_BASE}/favorites/${filmId}`, {
    method: 'DELETE',
    credentials: 'include',
  });
};
