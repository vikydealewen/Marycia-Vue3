<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

import type { Genre } from '@/types/genres';

import BaseFilmCard from '@/components/cards/BaseFilmCard.vue';
import BaseButton from '@/components/buttons/BaseButton.vue';
import IconBack from '@/components/icons/IconBack.vue';

import { useIsMobile } from '@/composables/useIsMobile';

import { translateGenre } from '@/helpers/translateGenre';
import { useFilms } from '@/stores/films';
import { storeToRefs } from 'pinia';

//берем пропсы из url
const props = defineProps<{
  genre: Genre;
}>();

const router = useRouter();
const { isMobile } = useIsMobile();
const filmsStore = useFilms();
const { isLoading, error } = storeToRefs(filmsStore);

const hasMore = filmsStore.hasMoreToLoad(props.genre) || filmsStore.hasMoreInCache(props.genre);

//беерм из стора название по-русски
const genreTitle = computed(() => {
  return translateGenre(props.genre);
});

//загрузка постранично
const loadFilms = async () => {
  await filmsStore.loadFilms(props.genre);
};

const films = computed(() => filmsStore.getVisibleFilms(props.genre));

const initFilms = async () => {
  if (!filmsStore.isCached(props.genre)) {
    await loadFilms();
  }

  await filmsStore.showMoreFilms(props.genre);
};

const loadMore = () => {
  filmsStore.showMoreFilms(props.genre);
};

onMounted(() => {
  initFilms();
});

onBeforeUnmount(() => filmsStore.resetAmountShown(props.genre));
</script>

<template>
  <section class="genre section">
    <div class="container section__container genre__container">
      <div class="genre__top flex">
        <button class="genre__btn-back flex" @click="router.push({ name: 'GenresList' })">
          <IconBack class="genre__icon-back" />
        </button>
        <h1 class="genre__title main-title">{{ genreTitle }}</h1>
      </div>
      <div class="genre__content flex">
        <p v-if="error" class="error">{{ error }}</p>

        <ul v-else class="genre__list list-reset flex">
          <li class="genre__item" v-for="(film, index) in films" :key="film.id">
            <RouterLink :to="{ name: 'Film', params: { id: film.id } }">
              <BaseFilmCard class="genre__card" :film="film" :index />
            </RouterLink>
          </li>
        </ul>
        <BaseButton
          class="genre__btn"
          v-if="hasMore && !error"
          variant="text"
          :color="isMobile ? 'purple' : 'primary'"
          :disabled="isLoading"
          @click="loadMore"
          :loading="isLoading"
          >Показать еще</BaseButton
        >
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;
@use '@/assets/styles/mixins' as *;

.genre {
  padding-top: 64px;

  @include sm {
    padding-top: 13px;
    padding-bottom: 40px;
  }

  &__top {
    align-items: center;
    margin-bottom: 64px;

    @include sm {
      margin-bottom: 40px;
    }
  }

  &__btn-back {
    cursor: pointer;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin-right: 16px;
    border: none;
    background: none;

    @include sm {
      width: 32px;
      height: 32px;
      margin-right: 8px;
    }
  }

  &__icon-back {
    width: 13px;
    height: 22px;
    fill: vars.$white-color;

    @include sm {
      width: 11px;
      height: 17px;
    }
  }

  &__list {
    flex-flow: row wrap;
    gap: 64px 40px;
    margin-bottom: 64px;

    @include md {
      gap: 24px;
      align-items: center;
      justify-content: center;
      margin-bottom: 40px;
    }
  }

  &__card {
    @include sm {
      width: 335px;
      height: 502px;
    }
  }

  &__content {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__btn {
    @include sm {
      width: 100%;
    }
  }
}
</style>
