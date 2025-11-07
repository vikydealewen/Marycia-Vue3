<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import AboutFilm from '@/components/sections/FilmAdditionalInfo.vue';
import Film from '@/components/sections/Film.vue';

import { getFilm } from '@/api/films';
import type { IFilm } from '@/types/film';
import { useFavorites } from '@/stores/favorites';

import { extractFilmCharacteristics } from '@/helpers/filmCharacterestics';

const route = useRoute();
const router = useRouter();

const favoritesStore = useFavorites();

const film = ref<IFilm>();
const error = ref<string | null>(null);

const filmId = computed(() => Number(route.params.id));

const loadFilmData = async (filmId: number) => {
  error.value = null;

  try {
    const response = await getFilm(filmId);
    film.value = response;
  } catch (err: unknown) {
    error.value = 'Ошибка при загрузке данных';
    router.push({
      name: '404Resource',
      params: { resource: 'film' },
    });
  }
};

const filmFilteredData = computed(() => {
  if (!film.value) return {};

  return extractFilmCharacteristics(film.value);
});

const handleAddFavorite = async (film: IFilm) => {
  if (!film?.id) return;

  await favoritesStore.toggleFavorite(film);
};

watch(
  filmId,
  async (newValue: number) => {
    await loadFilmData(newValue);
  },
  { immediate: true },
);
</script>

<template>
  <div v-if="error" class="container">
    <p class="error">{{ error }}</p>
  </div>

  <div v-else>
    <Film :film="film" @toggle-favorite="handleAddFavorite" />
    <AboutFilm :filmInfo="filmFilteredData" />
  </div>
</template>
