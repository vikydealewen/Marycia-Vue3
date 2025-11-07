<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

import { useAuthStore } from '@/stores/auth';
import { useFormValidation } from '@/composables/useFormValidation';

import BaseInput from '../inputs/BaseInput.vue';
import BaseIcon from '../BaseIcon.vue';
import BaseButton from '../buttons/BaseButton.vue';

const emit = defineEmits<{
  (e: 'complete'): void;
}>();

const loginData = ref({
  email: '',
  password: '',
});

const error = ref<string | null>(null);

const isLoading = ref<boolean>(false);

const authStore = useAuthStore();
const { isAuthorized } = storeToRefs(authStore);
const { errors, validateRequired } = useFormValidation(loginData.value);

const handleSubmit = async () => {
  const isValid = validateRequired();
  error.value = null;

  if (!isValid) return;

  try {
    isLoading.value = true;

    await authStore.login(loginData.value.email, loginData.value.password);

    if (isAuthorized.value) emit('complete');
  } catch (err: unknown) {
    error.value = 'Неверные логин или пароль';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="modal__form form flex">
    <p v-if="error" class="error-form">{{ error }}</p>

    <BaseInput
      class="form__input-wrapper"
      v-model="loginData.email"
      input-type="email"
      input-placeholder="Электронная почта"
      input-name="email"
      :hasError="errors.email"
      ><BaseIcon icon-name="IconMail"
    /></BaseInput>
    <BaseInput
      class="form__input-wrapper"
      v-model="loginData.password"
      input-type="password"
      input-placeholder="Пароль"
      input-name="password"
      :hasError="errors.password"
      ><BaseIcon icon-name="IconKey"
    /></BaseInput>

    <BaseButton variant="text" color="primary" type="submit" :loading="isLoading">Войти</BaseButton>
  </form>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;

.form {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 24px;

  &__input-wrapper:not(:last-child) {
    margin-bottom: 12px;
  }

  &__input-wrapper:last-of-type {
    margin-bottom: 24px;
  }
}
</style>
