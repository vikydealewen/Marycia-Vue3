import { ref } from 'vue';
import { defineStore } from 'pinia';

import type { IFilm } from '@/types/film';

import { getFilmsByGenre } from '@/api/films';
import { isGenreValid } from '@/api/films';
import type { Genre } from '@/types/genres';
import { useRouter } from 'vue-router';

interface GenreFilmsData {
  films: IFilm[];
  page: number;
  hasMore: boolean;
  amountShown: number;
}

export const useFilms = defineStore('genre-films', () => {
  const filmsByGenre = ref<Map<Genre, GenreFilmsData>>(new Map());
  const limit = ref<number>(10);
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const router = useRouter();

  const sortFilmsByRating = (films: IFilm[]) => {
    return [...films].sort((a, b) => b.tmdbRating - a.tmdbRating);
  };

  const isCached = (genre: Genre) => filmsByGenre.value.has(genre);
  const getGenreData = (genre: Genre) => filmsByGenre.value.get(genre);

  const loadFilms = async (genre: Genre) => {
    if (isLoading.value) return;

    const cached = getGenreData(genre);
    const pageToLoad = cached ? cached.page : 1;
    const canLoadMore = !cached || cached.hasMore;

    if (!canLoadMore) return;

    isLoading.value = true;
    error.value = null;

    try {
      const valid = await isGenreValid(genre);
      if (!valid) {
        throw new Error('Genre not found');
      }

      const response = await getFilmsByGenre(limit.value, pageToLoad, genre);
      const newFilms = response ?? [];
      const hasMore = response?.length === limit.value;

      if (cached) {
        cached.films.push(...newFilms);
        cached.films = sortFilmsByRating(cached.films);
        console.log(cached.films);
        cached.page++;
        cached.hasMore = hasMore;
      } else {
        const sorted = sortFilmsByRating(newFilms);

        filmsByGenre.value.set(genre, {
          films: sorted,
          page: 2,
          hasMore,
          amountShown: 0,
        });
      }
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Ошибка при загрузке фильмов';

      router.push({ name: '404Resource', params: { resource: 'genre' } });
    } finally {
      isLoading.value = false;
    }
  };

  //возвращает фильмы, которые необходимо отобразить
  const getVisibleFilms = (genre: Genre) => {
    const data = getGenreData(genre);
    return data ? data.films.slice(0, data.amountShown) : [];
  };

  //Вычисляет, сколько фильмов нужно показать после клика на “Показать ещё”
  const showMoreFilms = async (genre: Genre) => {
    const data = getGenreData(genre);
    if (!data) return;

    const nextCount = data.amountShown + limit.value;

    if (nextCount <= data.films.length) {
      data.amountShown = nextCount;
    } else if (data.hasMore) {
      await loadFilms(genre);
      //пересчитываем amountShown
      data.amountShown = Math.min(nextCount, data.films.length);
    }
  };

  const hasMoreInCache = (genre: Genre) => {
    const genreData = getGenreData(genre);
    return genreData ? genreData.amountShown < genreData.films.length : false;
  };

  const hasMoreToLoad = (genre: Genre) => getGenreData(genre)?.hasMore ?? true;

  const resetAmountShown = (genre: Genre) => {
    const genreData = filmsByGenre.value.get(genre);
    if (genreData) {
      genreData.amountShown = 0;
    }
  };

  const isGenreCached = (genre: Genre) => {
    return filmsByGenre.value.has(genre);
  };

  const resetGenre = (genre: Genre) => {
    filmsByGenre.value.delete(genre);
  };

  const clearAllCache = () => {
    filmsByGenre.value.clear();
  };

  return {
    filmsByGenre,
    limit,
    isLoading,
    error,
    isCached,
    loadFilms,
    isGenreCached,
    resetGenre,
    clearAllCache,
    getVisibleFilms,
    showMoreFilms,
    hasMoreInCache,
    hasMoreToLoad,
    resetAmountShown,
  };
});
