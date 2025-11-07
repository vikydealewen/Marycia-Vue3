<script setup lang="ts">
import Header from '@/components/sections/Header.vue';
import Footer from '@/components/sections/Footer.vue';
</script>

<template>
  <div class="layout">
    <Header />
    <main class="main">
      <slot></slot>
    </main>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.layout {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  flex: 1;

  // min-height: 100vh;
}
</style>
