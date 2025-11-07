import { defineStore } from 'pinia';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import type { IFilm } from '@/types/film';

import { getFavoriteFilms, addFilmToFavorites, removeFilmFromFavorites } from '@/api/favorites';
import { useAuthStore } from './auth';
import { useProfileStore } from './profile';

export const useFavorites = defineStore('favorites', () => {
  const { isAuthorized } = storeToRefs(useAuthStore());
  const profileStore = useProfileStore();

  const userFavoriteFilms = ref<IFilm[]>([]);

  const getFavoriteList = async () => {
    try {
      const response = await getFavoriteFilms();
      userFavoriteFilms.value = response;
    } catch (error: unknown) {
      throw error instanceof Error ? error : new Error(String(error));
    }
  };

  const addToList = async (filmId: number) => {
    if (!isAuthorized.value) throw new Error('Пользователь не авторизован');

    try {
      await addFilmToFavorites(filmId);
      await profileStore.getProfileData();
    } catch (error: unknown) {
      throw error instanceof Error ? error : new Error(String(error));
    }
  };

  const removeFromList = async (filmId: number) => {
    if (!isAuthorized.value) throw new Error('Пользователь не авторизован');

    try {
      await removeFilmFromFavorites(filmId);
      await profileStore.getProfileData();
    } catch (error: unknown) {
      throw error instanceof Error ? error : new Error(String(error));
    }
  };

  const toggleFavorite = async (film: IFilm) => {
    const isFavorite = userFavoriteFilms.value.some((f) => f.id === film.id);

    try {
      if (!isFavorite) {
        await addToList(film.id);
        userFavoriteFilms.value.push(film);
      } else {
        await removeFromList(film.id);
        userFavoriteFilms.value = userFavoriteFilms.value.filter((f) => f.id !== film.id);
      }
    } catch (error: unknown) {
      throw error instanceof Error ? error : new Error(String(error));
    }
  };

  return { userFavoriteFilms, getFavoriteList, addToList, removeFromList, toggleFavorite };
});
