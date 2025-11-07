//не использую этот стор

import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getGenres } from '@/api/films';
import { translateGenre } from '@/helpers/translateGenre';
import type { IGenre } from '@/types/genres';

export const useGenresStore = defineStore('genres', () => {
  const genres = ref<IGenre[]>([]);

  const loadGenres = async () => {
    try {
      const response = await getGenres();
      genres.value = response.map((el) => ({
        name: el,
        image: `/images/${el}.png`,
        title: translateGenre(el),
      }));
    } catch (error: unknown) {
      throw error instanceof Error ? error : new Error(String(error));
    }
  };

  const getGenreByName = (name: string): IGenre | undefined =>
    genres.value.find((g) => g.name === name);

  return { genres, loadGenres, getGenreByName };
});
