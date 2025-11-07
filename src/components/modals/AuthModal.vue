<script setup lang="ts">
import { computed } from 'vue';

import { useModalStore } from '@/stores/modal';

import LoginModal from './auth/LoginModal.vue';
import RegisterModal from './auth/RegisterModal.vue';
import SuccessModal from './auth/SuccessModal.vue';

const modalStore = useModalStore();

const currentAuthComponent = computed(() => {
  switch (modalStore.modal) {
    case 'login':
      return LoginModal;
    case 'register':
      return RegisterModal;
    case 'success':
      return SuccessModal;
    default:
      return LoginModal;
  }
});
</script>

<template>
  <div class="auth-modal">
    <RouterLink to="/" class="auth-modal__link">
      <img alt="VK Маруся лого" class="logo auth-modal__logo" src="@/assets/icons/logo-white.svg" />
    </RouterLink>
    <component :is="currentAuthComponent" @close="$emit('close')" />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;
@use '@/assets/styles/mixins' as *;

.auth-modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 40px;
  border-radius: 24px;
  background: #fff;

  @include sm {
    padding: 32px 20px;
    padding-top: 64px;
  }

  &__link {
    margin-bottom: 40px;

    @include sm {
      margin-bottom: 32px;
    }
  }

  &__logo {
    width: 132px;
    height: 30px;
  }
}
</style>
