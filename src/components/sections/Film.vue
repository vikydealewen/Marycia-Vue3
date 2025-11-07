<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import type { IFilm } from '@/types/film';

import { useAuthStore } from '@/stores/auth';
import { useModalStore } from '@/stores/modal';
import { useFavorites } from '@/stores/favorites';

import FilmMainInfo from '../film/FilmMainInfo.vue';
import BaseButton from '../buttons/BaseButton.vue';
import LocalLoader from '../loaders/LocalLoader.vue';

import noImage from '@/assets/images/no-image.png';

const props = defineProps<{
  film?: IFilm;
  loading?: boolean;
}>();

const favoritesStore = useFavorites();
const { userFavoriteFilms } = storeToRefs(favoritesStore);

const authStore = useAuthStore();
const { isAuthorized } = storeToRefs(authStore);

const modalStore = useModalStore();

const route = useRoute();

//проверка есть ли фильм в избранном пользователя
const isFavorite = computed(() =>
  props.film?.id ? userFavoriteFilms.value.some((f: IFilm) => f.id === props.film?.id) : false,
);

const handleToggleFavorite = async (film: IFilm) => {
  if (!film?.id) return;

  if (!isAuthorized.value) {
    modalStore.openModal('login');
    return;
  } else {
    await favoritesStore.toggleFavorite(film);
  }
};

const openTrailerModal = () => {
  if (!props.film?.trailerYouTubeId) return;

  if (props.film) {
    modalStore.openModal('trailer', props.film.trailerYouTubeId, props.film.title);
  }
};
</script>

<template>
  <section class="section film">
    <div class="container section__container film__container">
      <div v-if="loading" class="film__loader">
        <LocalLoader :visible="loading" />
      </div>

      <div v-if="film" class="film__wrapper grid" :class="{ 'film--loading': loading }">
        <div class="film__info-wrapper">
          <FilmMainInfo :film="film" size="bg" class="film__main-info"></FilmMainInfo>

          <h1 class="film__title main-title">{{ film.title }}</h1>

          <p class="film__descr">
            {{ film.plot }}
          </p>

          <div class="film__actions flex">
            <BaseButton
              class="film__actions-trailer"
              variant="text"
              color="primary"
              @click="openTrailerModal"
              >Трейлер</BaseButton
            >
            <RouterLink
              v-if="route.name === 'Home'"
              class="film__actions-link"
              :to="`/films/${film.id}`"
              >О фильме</RouterLink
            >
            <BaseButton
              variant="icon"
              color="grey"
              :icon="isFavorite ? 'IconLikeFull' : 'IconLike'"
              :aria-label="
                isFavorite ? 'Удалить фильм из избранного' : 'Добавить фильм в избранное'
              "
              @click="handleToggleFavorite(film)"
            />
            <BaseButton
              v-if="route.name === 'Home'"
              variant="icon"
              color="grey"
              icon="IconShift"
              aria-label="Сменить случайный фильм"
              @click="$emit('change-film')"
            />
          </div>
        </div>
        <div class="film__img-wrapper">
          <img
            class="film__image"
            :src="film.backdropUrl ? film.backdropUrl : noImage"
            :alt="film.backdropUrl ? `Кадр из фильма ${film?.title}` : 'Изображение отсутствует'"
          />
        </div>
      </div>

      <div v-else class="film__empty">
        <p>Фильм не найден</p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;
@use '@/assets/styles/mixins' as *;

.film {
  padding-top: 32px;

  @include sm {
    padding: 0;
    padding-bottom: 24px;
  }

  &__container {
    position: relative;
  }

  &__wrapper {
    display: grid;
    grid-template: 'descr img';
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 24px 10px;
    align-items: center;

    @include lg {
      grid-template: 'img' auto 'descr' 1fr / auto;
    }
  }

  &__info-wrapper {
    grid-area: descr;
  }

  &__main-info {
    gap: 16px;
    margin-bottom: 16px;

    @include sm {
      margin-bottom: 12px;
    }
  }

  &__img-wrapper {
    grid-area: img;
  }

  &__title {
    margin-bottom: 16px;

    @include sm {
      margin-bottom: 12px;
    }
  }

  &__descr {
    margin: 0;
    margin-bottom: 60px;
    font-size: vars.$big-size;
    font-weight: 400;
    line-height: 133%;
    color: vars.$text-color;

    @include sm {
      margin-bottom: 32px;
      font-size: vars.$main-size;
    }
  }

  &__actions {
    flex-wrap: wrap;
    gap: 16px;
    justify-content: left;

    &-trailer {
      @include sm {
        flex-grow: 1;
      }
    }

    &-link {
      cursor: pointer;
      padding: 16px 48px;
      border: 1px solid rgb(0 0 0 / 40%);
      border-radius: 28px;
      font-size: vars.$main-size;
      font-weight: 700;
      line-height: 133%;
      color: vars.$white-color;
      text-align: center;
      text-decoration: none;
      background-color: vars.$dark-grey-color;
      transition: background-color 0.2s ease;

      @include sm {
        padding: 16px 40px;
      }
    }
  }

  &__image {
    width: 100%;
    height: 552px;
    border-radius: 16px;
    object-fit: cover;

    @include sm {
      height: 234px;
    }
  }

  &__empty {
    font-size: vars.$big-size;
    font-weight: 700;
  }

  &__loader {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
  }

  &--loading {
    pointer-events: none;
    opacity: 0.6;
    filter: blur(10px);
  }
}
</style>
