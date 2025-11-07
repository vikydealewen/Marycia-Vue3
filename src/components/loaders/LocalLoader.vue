<script setup lang="ts">
defineProps<{ visible: boolean }>();
</script>

<template>
  <div v-if="visible" class="local-loader">
    <div class="spinner"></div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;

.local-loader {
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  width: 30px;
  height: 30px;
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
