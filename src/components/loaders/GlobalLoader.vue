<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading';

const loadingStore = useLoadingStore();
</script>

<template>
  <div v-if="loadingStore.isLoading" class="global-loader">
    <div class="spinner"></div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as vars;

.global-loader {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 80%);
}

.spinner {
  width: 60px;
  height: 60px;
  border: 5px solid vars.$border-card-color;
  border-top-color: vars.$white-color;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
