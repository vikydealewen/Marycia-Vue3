import { ref, shallowRef } from 'vue';

const swiperLoaded = ref(false);
const Swiper = shallowRef<any>(null);
const SwiperSlide = shallowRef<any>(null);
const modules = shallowRef<any[]>([]);

// Переменная для отслеживания процесса загрузки
let loadingPromise: Promise<void> | null = null;

export function useSwiper() {
  async function loadSwiper() {
    if (swiperLoaded.value) {
      return;
    }

    if (loadingPromise) {
      return loadingPromise;
    }

    loadingPromise = (async () => {
      try {
        const [swiperModule, { FreeMode }] = await Promise.all([
          import('swiper/vue'),
          import('swiper/modules'),
        ]);

        Swiper.value = swiperModule.Swiper;
        SwiperSlide.value = swiperModule.SwiperSlide;
        modules.value = [FreeMode];

        swiperLoaded.value = true;
      } catch (error) {
        console.error('Ошибка при загрузке Swiper', error);
        loadingPromise = null;
        throw error;
      } finally {
        loadingPromise = null;
      }
    })();

    return loadingPromise;
  }

  return {
    swiperLoaded,
    Swiper,
    SwiperSlide,
    modules,
    loadSwiper,
  };
}
