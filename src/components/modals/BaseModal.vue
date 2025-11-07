<script setup lang="ts">
import { watch, onUnmounted, computed } from 'vue';
import { storeToRefs } from 'pinia';

import { useModalStore } from '@/stores/modal';

import AuthModal from './AuthModal.vue';
import TrailerModal from './TrailerModal.vue';
import CloseButton from '../buttons/DeleteCloseButton.vue';

import type { ModalType } from '@/types/modals';

const modalComponents: Record<ModalType, any> = {
  login: AuthModal,
  register: AuthModal,
  success: AuthModal,
  trailer: TrailerModal,
};

const props = defineProps<{
  visible: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const modalStore = useModalStore();
const { modal, isVideoModal, trailerId, videoTitle } = storeToRefs(modalStore);

const currentModalComponent = computed(() => modalComponents[modal.value]);

onUnmounted(() => {
  document.body.style.overflow = '';
});

watch(
  () => props.visible,
  (visible) => {
    document.body.style.overflow = visible ? 'hidden' : '';
  },
);
</script>

<template>
  <Transition name="fade" mode="out-in">
    <div v-if="visible" class="overlay flex" @click.self="$emit('close')">
      <div
        class="modal"
        :class="{ 'modal--video': isVideoModal, 'modal--auth': !isVideoModal }"
        aria-modal="true"
        role="dialog"
      >
        <component
          :is="currentModalComponent"
          v-bind="isVideoModal ? { id: trailerId, title: videoTitle || 'Трейлер фильма' } : {}"
          @close="$emit('close')"
        />

        <CloseButton
          class="modal__btn-close btn-close"
          aria-label="Закрыть модальное окно"
          @click="$emit('close')"
        />
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;
@use '@/assets/styles/mixins' as *;

.overlay {
  position: fixed;
  z-index: 1000;
  inset: 0;
  overflow-y: hidden;
  align-items: center;
  justify-content: center;
  background: rgb(0 0 0 / 50%);
}

.modal {
  position: relative;
  min-width: 420px;

  @include sm {
    min-width: 335px;
  }

  &__btn-close {
    content: '';
    position: absolute;
    top: 0;
    right: -72px;

    @include md {
      top: 8px;
      right: 8px;
    }
  }

  &--video {
    width: auto;
    height: auto;
    padding: 0;

    @include lg {
      width: 80%;
    }
  }
}

.fade-enter-from {
  visibility: hidden;
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s,
    visibility 0.3s;
}

.fade-enter,
.fade-leave-to {
  visibility: hidden;
  opacity: 0;
}
</style>
