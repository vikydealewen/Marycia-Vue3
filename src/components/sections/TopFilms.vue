<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

import type { IFilm } from '@/types/film';
import { getTopFilms } from '@/api/films';

import { useIsMobile } from '@/composables/useIsMobile';

import BaseFilmCard from '../cards/BaseFilmCard.vue';
import MobileSwiper from '../swiper/MobileSwiper.vue';

const { isMobile } = useIsMobile();

const topFilms = ref<IFilm[]>([]);
const error = ref<string | null>(null);

const loadFilms = async () => {
  error.value = null;

  try {
    const response = await getTopFilms();

    if (!response || response.length === 0) {
      throw new Error('Фильмы не найдены');
    }

    topFilms.value = response;
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err.message;
    } else {
      error.value = 'Ошибка при загрузке фильмов';
    }
  }
};

loadFilms();
</script>

<template>
  <section class="section top-films">
    <div class="container section__container top-films__container">
      <h2 class="section__title top-films__title">Топ 10 фильмов</h2>

      <p v-if="error" class="error">{{ error }}</p>

      <!-- Мобильная версия (свайпер)-->
      <MobileSwiper
        v-else-if="isMobile"
        class="top-films__swiper"
        :slides="topFilms"
        slides-per-view="auto"
        :space-between="40"
      >
        <template v-slot="{ swiperSlide }">
          <component v-for="(item, index) in topFilms" :key="item.id" :is="swiperSlide">
            <RouterLink :to="{ name: 'Film', params: { id: item.id } }">
              <BaseFilmCard class="top-films__card" :film="item" :index />
            </RouterLink>
          </component>
        </template>
      </MobileSwiper>

      <!-- Десктопная версия -->
      <ul v-else class="top-films__list flex list-reset">
        <li class="top-films__item" v-for="(item, index) in topFilms" :key="item.id">
          <RouterLink :to="{ name: 'Film', params: { id: item.id } }">
            <BaseFilmCard class="top-films__card" :film="item" :index />
          </RouterLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;
@use '@/assets/styles/mixins' as *;

.top-films {
  position: relative;
  padding-top: 40px;
  padding-bottom: 123px;

  @include sm {
    padding-top: 32px;
    padding-bottom: 32px;
  }

  &__title {
    margin-bottom: 64px;

    @include sm {
      margin-bottom: 40px;
    }
  }

  &__list {
    flex-flow: row wrap;
    gap: 64px 40px;
    align-items: center;

    @include lg {
      justify-content: center;
    }
  }
}
</style>
