<script setup lang="ts">
import { useModalStore } from '@/stores/modal';
import BaseButton from '../../buttons/BaseButton.vue';

const modalStore = useModalStore();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const changeModalType = () => {
  modalStore.setModalType('login');
};
</script>

<template>
  <h3 class="auth-modal__header">Регистрация завершена</h3>
  <p class="auth-modal__text">Используйте вашу электронную почту для входа</p>
  <BaseButton variant="text" color="primary" @click="changeModalType">Вход</BaseButton>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;

.auth-modal {
  &__header {
    margin-bottom: 24px;
    font-size: vars.$big-size;
    font-weight: 700;
    line-height: 133%;
    color: vars.$black-color;
  }

  &__text {
    margin-bottom: 24px;
    font-size: vars.$main-size;
    font-weight: 400;
    line-height: 133%;
    color: vars.$black-color;
    text-align: center;
  }
}
</style>
