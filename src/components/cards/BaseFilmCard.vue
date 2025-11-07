<script setup lang="ts">
import { useRoute } from 'vue-router';
import type { IFilm } from '@/types/film';
import noPoster from '@/assets/images/no-poster.png';

defineProps<{
  film: IFilm;
  index: number;
}>();

const route = useRoute();
</script>

<template>
  <div class="film-card">
    <div class="film-card__number" v-if="route.name == 'Home'">
      <span class="film-card__number-text">{{ index + 1 }}</span>
    </div>
    <img
      class="film-card__image"
      loading="lazy"
      :src="film.posterUrl ? film.posterUrl : noPoster"
      :alt="
        film.posterUrl
          ? `Постер к фильму ${film.title}`
          : `Постер для фильма ${film.title} отстутсвет`
      "
    />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;

.film-card {
  position: relative;
  width: 224px;
  height: 336px;
  border: 1px solid vars.$border-card-color;
  border-radius: 16px;
  background: vars.$dark-grey-color;
  box-shadow: 0 0 80px 0 vars.$shadow-color;

  &__number {
    position: absolute;
    top: -12px;
    left: -12px;
    padding: 8px 24px;
    border-radius: 50px;
    text-align: center;
    background-color: vars.$white-color;

    &-text {
      font-size: vars.$big-size;
      font-weight: 700;
      line-height: 133%;
      color: vars.$purple-color;
    }
  }

  &__image {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 16px;
    object-fit: cover;
  }
}
</style>
