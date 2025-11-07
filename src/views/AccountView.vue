<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useAuthStore } from '@/stores/auth';

import AccountNav from '@/components/sections/AccountNav.vue';

const authStore = useAuthStore();
const isAuthorized = storeToRefs(authStore);
</script>

<template>
  <section class="account section" v-if="isAuthorized">
    <div class="container section__container account__container">
      <h1 class="account__title main-title">Мой аккаунт</h1>
      <AccountNav class="account__nav" />
      <RouterView />
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;
@use '@/assets/styles/mixins' as *;

.account {
  min-height: 100%;
  padding-top: 64px;

  @include sm {
    padding-top: 16px;
  }

  &__title {
    margin-bottom: 64px;

    @include sm {
      margin-bottom: 40px;
    }
  }
}
</style>
