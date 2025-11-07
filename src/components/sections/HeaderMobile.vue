<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { useModalStore } from '@/stores/modal';
import { useSearchStore } from '@/stores/search';
import SearchBar from '../search/SearchBar.vue';
import BaseIcon from '@/components/BaseIcon.vue';

const searchStore = useSearchStore();
const { isOpen } = storeToRefs(searchStore);

const authStore = useAuthStore();
const { isAuthorized } = storeToRefs(authStore);

const modalStore = useModalStore();

const closeSearchBar = () => {
  searchStore.close();
};

const openLoginModal = () => {
  modalStore.openModal('login');
  closeSearchBar();
};
</script>

<template>
  <div class="header-mobile flex">
    <RouterLink to="/genres" class="header-mobile__link">
      <BaseIcon icon-name="IconGenres" class="header-mobile__icon" />
    </RouterLink>

    <button @click="searchStore.toggle" class="header-mobile__btn">
      <BaseIcon icon-name="IconSearch" class="header-mobile__icon" />
    </button>

    <RouterLink v-if="isAuthorized" to="/account" class="header-mobile__link">
      <BaseIcon icon-name="IconUser" class="header-mobile__icon" />
    </RouterLink>
    <button v-else @click="openLoginModal" class="header-mobile__btn header-mobile__btn-auth">
      <BaseIcon icon-name="IconUser" class="header-mobile__icon" />
    </button>
  </div>

  <Transition name="fade" mode="out-in" @click.self="closeSearchBar">
    <div v-if="isOpen" class="search-overlay">
      <div class="search-overlay__inner">
        <SearchBar class="search-bar" />
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;

.header-mobile {
  gap: 20px;

  &__link,
  &__btn {
    width: 24px;
    height: 24px;
  }

  &__btn {
    cursor: pointer;
    padding: 0;
    border: none;
    font-size: vars.$big-size;
    color: vars.$white-color;
    background: none;
  }

  &__icon {
    width: 100%;
    height: 100%;
    fill: vars.$white-color;
  }
}

.search-overlay {
  position: fixed;
  z-index: 1000;
  inset: 0;
  overflow-y: hidden;
  align-items: flex-start;
  justify-content: center;
  padding: 16px 20px;
  background: rgb(0 0 0 / 50%);
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
