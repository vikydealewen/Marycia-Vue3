import { ref, onMounted, onUnmounted } from 'vue';

export function useIsMobile() {
  const isMobile = ref<boolean>(false);

  function checkIfMobile() {
    isMobile.value = window.innerWidth <= 768;
  }

  onMounted(() => {
    checkIfMobile();

    window.addEventListener('resize', checkIfMobile);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', checkIfMobile);
  });

  return {
    isMobile,
  };
}
