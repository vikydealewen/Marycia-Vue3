<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useAuthStore } from '@/stores/auth';
import { useModalStore } from '@/stores/modal';
import { useProfileStore } from '@/stores/profile';
import { convertFirstLetter } from '@/helpers/convertFirstLetterToUppercase';
import SearchBar from '../search/SearchBar.vue';

const authStore = useAuthStore();
const { isAuthorized } = storeToRefs(authStore);
const modalStore = useModalStore();
const profileStore = useProfileStore();
const { profile } = storeToRefs(profileStore);

const formattedName = computed(() =>
  isAuthorized.value && profile.value?.surname
    ? convertFirstLetter(profile.value?.surname)
    : 'Фамилия',
);

const openLoginModal = () => modalStore.openModal('login');

const links = [
  { to: '/', name: 'Главная' },
  { to: '/genres', name: 'Жанры' },
];
</script>

<template>
  <div class="header-desktop flex">
    <nav class="header-desktop__nav nav flex">
      <RouterLink
        v-for="link in links"
        :key="link.name"
        :to="link.to"
        class="nav__link header-desktop__link"
        activeClass="nav__link--active header-desktop__link--active"
        >{{ link.name }}
      </RouterLink>
    </nav>

    <SearchBar class="header-desktop__search" />

    <button
      v-if="!isAuthorized"
      class="header-desktop__btn header-desktop__btn-auth"
      @click="openLoginModal"
    >
      Войти
    </button>

    <RouterLink
      v-else
      to="/account"
      class="header-desktop__link"
      activeClass="header-desktop__link--active"
      >{{ formattedName }}</RouterLink
    >
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;
@use '@/assets/styles/mixins' as *;

.header-desktop {
  align-items: center;

  @include xl {
    flex-grow: 1;
  }

  &__search {
    margin-right: 80px;

    @include md {
      margin-right: 40px;
    }
  }

  &__btn {
    cursor: pointer;
    padding: 0;
    border: none;
    font-size: vars.$big-size;
    color: vars.$white-color;
    background: none;
  }

  &__link {
    position: relative;
    padding: 8px 0;
    font-size: 24px;
    line-height: 133%;
    color: vars.$white-color;
    text-decoration: none;

    &::after {
      content: '';
      position: absolute;
      z-index: 100;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1.5px;
      opacity: 0;
      background: vars.$pink-color;
      transition: opacity 0.3s ease-in-out;
    }

    &--active {
      &::after {
        opacity: 1;
      }
    }
  }

  &__link:not(:last-child) {
    margin-right: 40px;
  }
}

.nav {
  align-items: center;
  justify-content: space-between;
  margin-right: 40px;
}
</style>
