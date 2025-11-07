<script setup lang="ts">
import GenreFilms from '@/components/sections/GenreFilms.vue';
import type { Genre } from '@/types/genres';

const props = defineProps<{
  genre: Genre;
}>();
</script>

<template>
  <GenreFilms :genre="genre" />
</template>

<style lang="scss" scoped></style>
