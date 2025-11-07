<script setup lang="ts">
import { watch } from 'vue';
import type { IFilm } from '@/types/film';

import { useIsMobile } from '@/composables/useIsMobile';
import { useSwiper } from '@/composables/useSwiper';

import 'swiper/swiper-bundle.css';
import 'swiper/css/free-mode';

const props = defineProps<{
  slides: IFilm[];
  slidesPerView: number | 'auto';
  spaceBetween: number;
}>();

const { isMobile } = useIsMobile();
const { swiperLoaded, Swiper, SwiperSlide, modules, loadSwiper } = useSwiper();

watch(
  isMobile,
  (newValue) => {
    if (newValue && !swiperLoaded.value) {
      loadSwiper();
    }
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <div>
    <component
      v-if="isMobile && swiperLoaded && Swiper"
      :is="Swiper"
      :modules="modules"
      :slidesPerView="slidesPerView"
      :spaceBetween="spaceBetween"
      class="my-swiper"
    >
      <slot :swiper-slide="SwiperSlide" />
    </component>
  </div>
</template>

<style scoped>
.swiper {
  overflow: visible;
}

.my-swiper {
  width: 100%;
  height: 100%;
}

:deep(.swiper-slide) {
  width: auto;
  height: auto;
}
</style>
