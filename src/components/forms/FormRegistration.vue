<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

import { useAuthStore } from '@/stores/auth';
import type { INewUserData } from '@/types/user';
import { useFormValidation } from '@/composables/useFormValidation';
import { useModalStore } from '@/stores/modal';

import BaseInput from '../inputs/BaseInput.vue';
import BaseIcon from '../BaseIcon.vue';
import BaseButton from '../buttons/BaseButton.vue';

const user = ref<INewUserData>({
  email: '',
  password: '',
  name: '',
  surname: '',
});

const passwordCheck = ref<string>('');
const isPasswordCheckValid = ref<boolean>(true);

const authStore = useAuthStore();
const modalStore = useModalStore();
const { isRegistered } = storeToRefs(authStore);
const { errors, validateRequired } = useFormValidation(user.value);

const isLoading = ref<boolean>(false);

const error = ref<string | null>(null);

const handleSubmit = async () => {
  const isValid = validateRequired();
  isPasswordCheckValid.value = passwordCheck.value.trim() !== '';
  error.value = null;

  if (!isValid && !isPasswordCheckValid.value) return;

  if (passwordCheck.value !== user.value.password) {
    isPasswordCheckValid.value = false;
    return;
  }

  try {
    isLoading.value = true;

    await authStore.register(user.value);
  } catch (err: unknown) {
    error.value = 'Ошибка регистрации';
  } finally {
    isLoading.value = false;
  }

  if (isRegistered) {
    modalStore.setModalType('success');
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="modal__form form flex">
    <p v-if="error" class="error-form">{{ error }}</p>

    <BaseInput
      class="form__input-wrapper"
      v-model="user.email"
      input-type="email"
      input-placeholder="Электронная почта"
      input-name="email"
      :hasError="errors.email"
      ><BaseIcon icon-name="IconMail"
    /></BaseInput>
    <BaseInput
      class="form__input-wrapper"
      v-model="user.name"
      input-type="text"
      input-placeholder="Имя"
      input-name="name"
      :hasError="errors.name"
      ><BaseIcon icon-name="IconUser"
    /></BaseInput>
    <BaseInput
      class="form__input-wrapper"
      v-model="user.surname"
      input-type="text"
      input-placeholder="Фамилия"
      input-name="surname"
      :hasError="errors.surname"
    >
      <BaseIcon icon-name="IconUser"
    /></BaseInput>
    <BaseInput
      class="form__input-wrapper"
      v-model="user.password"
      input-type="password"
      input-placeholder="Пароль"
      input-name="password"
      :hasError="errors.password"
    >
      <BaseIcon icon-name="IconKey"
    /></BaseInput>
    <BaseInput
      class="form__input-wrapper"
      v-model="passwordCheck"
      input-type="password"
      input-placeholder="Подтвердите пароль"
      input-name="password-check"
      :hasError="!isPasswordCheckValid"
      ><BaseIcon icon-name="IconKey"
    /></BaseInput>
    <BaseButton variant="text" color="primary" type="submit" :loading="isLoading"
      >Создать аккаунт</BaseButton
    >
  </form>
</template>

<style lang="scss" scoped>
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
