<script setup lang="ts">
import { watch } from 'vue';

import { useSearchStore } from '@/stores/search';

import { getFilmsByTitle } from '@/api/films';

import SearchList from './SearchList.vue';
import SearchInput from '../inputs/SearchInput.vue';

const searchStore = useSearchStore();

const loadFilms = async () => {
  try {
    const response = await getFilmsByTitle(searchStore.searchText);
    searchStore.setResults(response);
  } catch (error) {
    console.error('Ошибка загрузки фильмов:', error);
    searchStore.setResults([]);
  }
};

let debounceTimeout: ReturnType<typeof setTimeout>;

watch(
  () => searchStore.searchText,
  (newValue) => {
    clearTimeout(debounceTimeout);
    if (!newValue.trim()) {
      searchStore.setResults([]);
      return;
    }

    debounceTimeout = setTimeout(() => {
      loadFilms();
    }, 400); // Задержка 400 мс
  },
);
</script>

<template>
  <div class="search-bar">
    <SearchInput
      v-model="searchStore.searchText"
      :is-focused="searchStore.isOpen"
      @focus="searchStore.open"
      @blur="searchStore.close"
      @clear-input="searchStore.setSearchText('')"
    />
    <SearchList
      :searchFilmsList="searchStore.searchResults"
      :isFocused="searchStore.isOpen"
      @select="searchStore.close"
    />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;
@use '@/assets/styles/mixins' as *;

.search-bar {
  position: relative;

  @include xl {
    width: 100%;
  }
}
</style>
