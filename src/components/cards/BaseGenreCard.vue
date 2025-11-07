<script setup lang="ts">
import type { IGenre } from '@/types/genres';
import { MODE } from '@/config';

const props = defineProps<{
  genre: IGenre;
}>();

const isProd = MODE === 'production';
</script>

<template>
  <div class="genre-card">
    <picture>
      <source v-if="isProd" :srcset="genre.image.replace('.png', '.webp')" type="image/webp" />
      <img
        class="genre-card__image"
        loading="lazy"
        :src="genre.image"
        :alt="`Обложка жанра ${genre.title}`"
      />
    </picture>
    <div class="genre-card__bottom">
      <h3 class="genre-card__title">{{ genre.title }}</h3>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;
@use '@/assets/styles/mixins' as *;

.genre-card {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 290px;
  border: 1px solid vars.$border-card-color;
  border-radius: 24px;
  box-shadow: 0 0 80px 0 vars.$shadow-color;

  @include md {
    width: 335px;
  }

  &__image {
    width: 100%;
    height: 220px;
    object-fit: cover;
  }

  &__bottom {
    padding: 22px 45px 29px;
    text-align: center;
    background-color: vars.$black-color;
  }

  &__title {
    font-size: 24px;
    font-weight: 700;
    line-height: 133%;
    color: vars.$white-color;
    text-align: center;
  }
}
</style>
