import { defineStore } from 'pinia';
import type { IFilm } from '@/types/film';
import { ref } from 'vue';

export const useSearchStore = defineStore('search', () => {
  const isOpen = ref(false);
  const searchText = ref('');
  const searchResults = ref<IFilm[]>([]);

  const open = () => {
    isOpen.value = true;
  };

  const close = () => {
    isOpen.value = false;
    searchText.value = '';
    searchResults.value = [];
  };

  const toggle = () => {
    isOpen.value = !isOpen.value;
  };

  const setSearchText = (value: string) => {
    searchText.value = value;
  };

  const setResults = (results: IFilm[]) => {
    searchResults.value = results;
  };

  return {
    isOpen,
    searchText,
    searchResults,
    open,
    close,
    toggle,
    setSearchText,
    setResults,
  };
});
