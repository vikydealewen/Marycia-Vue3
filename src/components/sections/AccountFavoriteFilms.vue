<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';

import { useFavorites } from '@/stores/favorites';
import { useIsMobile } from '@/composables/useIsMobile';

import BaseFilmCard from '../cards/BaseFilmCard.vue';
import DeleteButton from '../buttons/DeleteCloseButton.vue';
import MobileSwiper from '../swiper/MobileSwiper.vue';

const favoritesStore = useFavorites();
const { userFavoriteFilms } = storeToRefs(favoritesStore);

const { isMobile } = useIsMobile();

const error = ref<string | null>(null);

const loadFavorites = async () => {
  error.value = null;
  try {
    await favoritesStore.getFavoriteList();
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : String(err);
  }
};

onMounted(() => loadFavorites());

const handleDeleteFilm = async (id: number) => {
  error.value = null;
  try {
    await favoritesStore.removeFromList(id);
    await loadFavorites();
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : String(err);
  }
};
</script>

<template>
  <div class="favorite">
    <p v-if="error" class="error">{{ error }}</p>

    <!-- Мобильная версия (свайпер)-->
    <MobileSwiper
      v-else-if="isMobile"
      class="favorite__swiper"
      :slides="userFavoriteFilms"
      slides-per-view="auto"
      :space-between="40"
    >
      <template v-slot="{ swiperSlide }">
        <component v-for="(item, index) in userFavoriteFilms" :key="item.id" :is="swiperSlide">
          <RouterLink :to="{ name: 'Film', params: { id: item.id } }">
            <BaseFilmCard class="favorite__card" :film="item" :index="index" />
          </RouterLink>
          <DeleteButton class="btn-delete" @click="handleDeleteFilm(item.id)" />
        </component>
      </template>
    </MobileSwiper>

    <!-- Десктопная версия -->
    <ul v-else class="favorite__list flex list-reset">
      <li class="favorite__item" v-for="(item, index) in userFavoriteFilms" :key="item.id">
        <RouterLink :to="{ name: 'Film', params: { id: item.id } }">
          <BaseFilmCard class="favorite__card" :film="item" :index="index" />
        </RouterLink>
        <DeleteButton class="btn-delete favorite__btn-delete" @click="handleDeleteFilm(item.id)" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;
@use '@/assets/styles/mixins' as *;

.favorite {
  &__list {
    flex-flow: row wrap;
    gap: 64px 40px;
  }

  &__item {
    position: relative;
  }

  &__swiper {
    padding-right: 10px;
  }
}

.btn-delete {
  position: absolute;
  z-index: 10;
  top: -20px;
  right: -20px;
  visibility: hidden;
  opacity: 0;
  transition:
    opacity 0.3s ease-in-out,
    visibility 0.3s ease-in-out;

  @include md {
    visibility: visible;
    opacity: 1;
  }
}

.favorite__item:hover .favorite__btn-delete {
  visibility: visible;
  opacity: 1;
}

.favorite__item:hover .favorite__card {
  border-color: vars.$white-color;
}
</style>
