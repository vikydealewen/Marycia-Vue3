import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

import type { ModalType } from '@/types/modals';

export const useModalStore = defineStore('modal', () => {
  const isOpen = ref<boolean>(false);
  const modal = ref<ModalType>('login');
  const trailerId = ref<string>('');
  const videoTitle = ref<string>('');

  const isVideoModal = computed(() => modal.value === 'trailer');

  const openModal = (type: ModalType, id?: string, title?: string) => {
    modal.value = type;

    if (type === 'trailer') {
      trailerId.value = id ?? '';
      videoTitle.value = title ?? '';
    } else {
      trailerId.value = '';
      videoTitle.value = '';
    }

    isOpen.value = true;
  };

  const closeModal = () => {
    isOpen.value = false;
    modal.value = 'login';
    trailerId.value = '';
    videoTitle.value = '';
  };

  const setModalType = (type: ModalType) => {
    modal.value = type;
  };

  return {
    isOpen,
    modal,
    trailerId,
    videoTitle,
    isVideoModal,
    openModal,
    closeModal,
    setModalType,
  };
});
