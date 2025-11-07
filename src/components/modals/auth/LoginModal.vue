<script setup lang="ts">
import FormLogin from '../../forms/FormLogin.vue';
import BaseButton from '../../buttons/BaseButton.vue';
import { useModalStore } from '@/stores/modal';

const modalStore = useModalStore();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const changeModalType = () => {
  modalStore.setModalType('register');
};
</script>

<template>
  <FormLogin @complete="$emit('close')" />
  <BaseButton variant="text" color="white" @click="changeModalType">Регистрация</BaseButton>
</template>
