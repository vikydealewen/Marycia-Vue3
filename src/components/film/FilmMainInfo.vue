<script setup lang="ts">
import { computed } from 'vue';

import type { IFilm } from '@/types/film';

import BaseRating from '../film/BaseRating.vue';

import { getDuration } from '@/helpers/getDuration';
import { getFullYear } from '@/helpers/getFullYear';
import { translateGenre } from '@/helpers/translateGenre';

const props = defineProps<{
  film: Partial<IFilm>;
  size: 'sm' | 'bg';
}>();

const duration = computed(() => (props.film?.runtime ? getDuration(props.film.runtime) : ''));
const year = computed(() => (props.film?.releaseDate ? getFullYear(props.film.releaseDate) : ''));
const genres = computed(() =>
  props.film?.genres
    ? props.film.genres.map((el) => translateGenre(el).toLowerCase()).join(', ')
    : '',
);
</script>

<template>
  <div class="main-info flex">
    <BaseRating
      class="main-info__rating"
      v-if="film?.tmdbRating !== undefined"
      :rating-value="film?.tmdbRating"
      :size="size"
    />
    <span :class="['main-info__text', 'main-info__year', `main-info__text--${size}`]">{{
      year
    }}</span>
    <span :class="['main-info__text', 'main-info__genres', `main-info__text--${size}`]">{{
      genres
    }}</span>
    <span :class="['main-info__text', 'main-info__duration', `main-info__text--${size}`]">{{
      duration
    }}</span>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;
@use '@/assets/styles/mixins' as *;

.main-info {
  flex-wrap: wrap;
  align-items: center;

  &__text {
    font-weight: 400;
    color: vars.$text-color;

    &--sm {
      font-size: vars.$small-size;
      line-height: 143%;
    }

    &--bg {
      font-size: vars.$main-size;
      line-height: 133%;

      @include sm {
        font-size: vars.$small-size;
        line-height: 143%;
      }
    }
  }
}
</style>
