<script setup lang="ts">
import FormRegistration from '../../forms/FormRegistration.vue';
import BaseButton from '../../buttons/BaseButton.vue';
import { useModalStore } from '@/stores/modal';

const modalStore = useModalStore();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const changeModalType = () => {
  modalStore.setModalType('login');
};
</script>

<template>
  <h3 class="auth-modal__header">Регистрация</h3>
  <FormRegistration @complete="$emit('close')" />
  <BaseButton variant="text" color="white" @click="changeModalType"
    >У меня уже есть пароль</BaseButton
  >
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
}
</style>
