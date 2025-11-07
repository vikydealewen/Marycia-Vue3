<script setup lang="ts">
import { onMounted, ref } from 'vue';

import Film from '@/components/sections/Film.vue';
import TopFilms from '@/components/sections/TopFilms.vue';

import type { IFilm } from '@/types/film';
import { getFilmRandom } from '@/api/films';

const randomFilm = ref<IFilm>();
const isLoading = ref(false);

const error = ref<string | null>(null);

const loadRandomFilm = async () => {
  error.value = null;
  try {
    const response = await getFilmRandom();
    randomFilm.value = response;
  } catch (err: unknown) {
    error.value = 'Ошибка при загрузке фильма';
  }
};

onMounted(async () => {
  await loadRandomFilm();
});

const changeRandomFilm = async () => {
  try {
    isLoading.value = true;
    await loadRandomFilm();
  } finally {
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  }
};
</script>

<template>
  <div v-if="error" class="container">
    <p class="error">{{ error }}</p>
  </div>

  <Film v-else :film="randomFilm" @change-film="changeRandomFilm" :loading="isLoading" />
  <TopFilms />
</template>
