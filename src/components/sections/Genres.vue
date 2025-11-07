<script setup lang="ts">
import { ref } from 'vue';
import BaseGenreCard from '@/components/cards/BaseGenreCard.vue';
import { getGenres } from '@/api/films';
import type { IGenre } from '@/types/genres';
import { translateGenre } from '@/helpers/translateGenre';

const genres = ref<IGenre[]>([]);
const error = ref<string | null>(null);

const loadGenres = async () => {
  error.value = null;

  try {
    const response = await getGenres();
    if (!response || response.length === 0) {
      throw new Error('Жанры не найдены');
    }

    genres.value = response.map((el) => ({
      name: el,
      image: `/images/${el}.png`,
      title: translateGenre(el),
    }));
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err.message;
    } else {
      error.value = 'Ошибка при загрузке жанров';
    }
  }
};

loadGenres();
</script>

<template>
  <section class="section genres">
    <div class="container section__container genres__container">
      <h1 class="genres__title main-title">Жанры фильмов</h1>

      <p v-if="error" class="error">{{ error }}</p>

      <ul v-else class="genres__list list-reset flex">
        <li class="genres__item" v-for="item in genres" :key="item.name">
          <RouterLink
            :to="{ name: 'GenreFilms', params: { genre: item.name } }"
            class="genres__link"
          >
            <BaseGenreCard :genre="item" class="genres__card" />
          </RouterLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;

.genres {
  padding-top: 64px;

  @include sm {
    padding-top: 13px;
    padding-bottom: 40px;
  }

  &__title {
    margin-bottom: 64px;

    @include sm {
      margin-bottom: 40px;
    }
  }

  &__link {
    height: 100%;
    text-decoration: none;
  }

  &__list {
    flex-wrap: wrap;
    gap: 64px 40px;
    align-items: center;
    justify-content: center;

    @include md {
      gap: 24px;
    }
  }
}
</style>
