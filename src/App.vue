<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { storeToRefs } from 'pinia';
import DefaultLayout from './layouts/DefaultLayout.vue';
import GlobalLoader from './components/loaders/GlobalLoader.vue';

import { useModalStore } from './stores/modal';
import { useLoadingStore } from './stores/loading';

const BaseModal = defineAsyncComponent(() => import('./components/modals/BaseModal.vue'));

const loaderStore = useLoadingStore();
const { isLoading } = storeToRefs(loaderStore);

const modalStore = useModalStore();
const { isOpen } = storeToRefs(modalStore);
</script>

<template>
  <DefaultLayout>
    <GlobalLoader v-if="isLoading" />
    <RouterView />
  </DefaultLayout>

  <teleport to="body">
    <BaseModal :visible="isOpen" @close="modalStore.closeModal"> </BaseModal>
  </teleport>
</template>

<style scoped></style>
