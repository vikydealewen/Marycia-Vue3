<script setup lang="ts">
import SearchItem from './SearchItem.vue';

import type { IFilm } from '@/types/film';

const props = defineProps<{
  searchFilmsList: IFilm[];
  isFocused: boolean;
}>();

const emit = defineEmits<{
  (e: 'select'): void;
}>();
</script>

<template>
  <Transition name="search-list">
    <div class="search-bar__list search-list" v-if="isFocused && searchFilmsList.length > 0">
      <ul class="search-list__items list-reset flex">
        <li class="search-list__item" v-for="item in searchFilmsList" :key="item.id">
          <RouterLink class="search-list__link" :to="`/films/${item.id}`" @click="emit('select')"
            ><SearchItem :film="item"
          /></RouterLink>
        </li>
      </ul>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;
@use '@/assets/styles/mixins' as *;

.search-list-enter-active,
.search-list-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.search-list-enter-from {
  transform: translateY(-6px);
  opacity: 0;
}

.search-list-leave-to {
  transform: translateY(-6px);
  opacity: 0;
}

.search-list {
  position: absolute;
  z-index: 10;
  top: calc(100% + 12px);
  right: 0;
  left: 97px;
  padding: 12px;
  border-radius: 8px;
  background: vars.$dark-grey-color;

  @include lg {
    top: calc(100% + 8px);
    left: 0;
    gap: 16px;
    padding: 24px 20px;
  }

  &__items {
    flex-direction: column;

    @include lg {
      gap: 16px;
    }

    @include md {
      scroll-snap-type: x mandatory;
      overflow-x: auto;
      flex-direction: row;
    }
  }

  &__item {
    cursor: pointer;
    padding: 20px 8px;
    border: none;
    border-radius: 6px;
    outline: none;
    transition: outline 0.3s ease-in-out;

    @include md {
      padding: 0;
    }

    &:hover {
      outline: 1px solid vars.$light-grey-color;
    }
  }

  &__link {
    text-decoration: none;
  }
}
</style>
