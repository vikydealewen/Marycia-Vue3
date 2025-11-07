<script setup lang="ts">
import LiteYouTubeEmbed from 'vue-lite-youtube-embed';
import 'vue-lite-youtube-embed/style.css';

const props = defineProps<{
  id: string;
  title: string;
}>();
</script>

<template>
  <div class="trailer-modal">
    <LiteYouTubeEmbed :id="id" :title="title" poster="hqdefault" />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;

.trailer-modal {
  aspect-ratio: 16 / 9;
  width: 960px;

  @include lg {
    width: 100%;
  }
}
</style>
