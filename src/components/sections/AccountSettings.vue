<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import { useProfileStore } from '@/stores/profile';
import { useAuthStore } from '@/stores/auth';

import { convertFirstLetter } from '@/helpers/convertFirstLetterToUppercase';

import BaseIcon from '../BaseIcon.vue';
import BaseButton from '../buttons/BaseButton.vue';

const profileStore = useProfileStore();
const { profile } = storeToRefs(profileStore);

const authStore = useAuthStore();
const { isAuthorized } = storeToRefs(authStore);

const router = useRouter();

const logout = async () => {
  if (isAuthorized.value) {
    await authStore.logout();
    router.push({ name: 'Home' });
  }
};

const name = computed(() => {
  return profile.value?.name ? convertFirstLetter(profile.value?.name) : 'Имя';
});

const surname = computed(() => {
  return profile.value?.surname ? convertFirstLetter(profile.value?.surname) : 'Фамилия';
});

const initials = computed(() => {
  return profile.value?.name && profile.value?.surname
    ? convertFirstLetter(profile.value?.name).substring(0, 1) +
        convertFirstLetter(profile.value?.surname).substring(0, 1)
    : 'ИФ';
});
</script>

<template>
  <div class="settings">
    <ul class="settings__list list-reset">
      <li class="settings__item flex">
        <div class="settings__left flex">
          <span class="settings__initials">{{ initials }}</span>
        </div>
        <div class="settings__text flex">
          <p class="settings__title">Имя Фамилия</p>
          <p class="settings__value">{{ name + ' ' + surname }}</p>
        </div>
      </li>
      <li class="settings__item flex">
        <div class="settings__left flex">
          <BaseIcon class="settings__icon" icon-name="IconMail" />
        </div>
        <div class="settings__text flex">
          <p class="settings__title">Электронная почта</p>
          <p class="settings__value">{{ profile?.email }}</p>
        </div>
      </li>
    </ul>
    <BaseButton variant="text" color="primary" @click="logout">Выйти из аккаунта</BaseButton>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;
@use '@/assets/styles/mixins' as *;

.settings {
  @include sm {
    display: flex;
    flex-direction: column;
  }

  &__list {
    margin-bottom: 64px;
  }

  &__item {
    flex-wrap: wrap;
    gap: 16px;
    align-items: center;

    &:not(:last-child) {
      margin-bottom: 40px;
    }

    @include sm {
      align-items: flex-start;
    }
  }

  &__left {
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    padding: 14px;
    border-radius: 30px;
    background: vars.$light-grey-color;

    @include sm {
      width: 48px;
      height: 48px;
      padding: 8px;
    }
  }

  &__initials {
    font-size: vars.$big-size;
    font-weight: 700;
    line-height: 133%;
    color: vars.$white-color;
  }

  &__icon {
    fill: vars.$white-color;
  }

  &__text {
    flex-direction: column;
  }

  &__title {
    margin-bottom: 4px;
    font-size: vars.$main-size;
    font-weight: 400;
    line-height: 133%;
    color: vars.$white-color;

    @include sm {
      font-size: vars.$small-size;
      line-height: 143%;
      color: vars.$light-grey-color;
    }
  }

  &__value {
    font-size: vars.$big-size;
    font-weight: 700;
    line-height: 133%;
    color: vars.$white-color;

    @include sm {
      font-size: vars.$main-size;
    }
  }
}
</style>
