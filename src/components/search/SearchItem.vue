<script setup lang="ts">
import type { IFilm } from '@/types/film';
import FilmMainInfo from '../film/FilmMainInfo.vue';

import noPoster from '@/assets/images/no-poster.png';

const props = defineProps<{
  film: IFilm;
}>();
</script>

<template>
  <div class="search-item flex">
    <div class="search-item__left">
      <img
        class="search-item__image"
        :src="film.posterUrl ? film.posterUrl : noPoster"
        :alt="
          film.posterUrl
            ? `Постер к фильму ${film.title}`
            : `Постер для фильма ${film.title} отстутсвет`
        "
      />
    </div>
    <div class="search-item__right">
      <FilmMainInfo :film="film" size="sm" class="search-item__right-info"></FilmMainInfo>
      <div class="search-item__right-title">
        <p class="search-item__title">
          {{ film.title }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;
@use '@/assets/styles/mixins' as *;

.search-item {
  gap: 16px;

  @include md {
    flex-direction: column;
  }

  &__image {
    width: 40px;
    height: 52px;

    @include md {
      width: 158px;
      height: 206px;
    }
  }

  &__right-info {
    gap: 12px;
    margin-bottom: 8px;
  }

  &__text {
    font-size: 14px;
    font-weight: 400;
    line-height: 143%;
    color: vars.$text-color;
  }

  &__title {
    font-size: vars.$main-size;
    font-weight: 700;
    line-height: 133%;
    color: vars.$white-color;
  }
}
</style>
