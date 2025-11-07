<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import HeaderDesktop from './HeaderDesktop.vue';
import HeaderMobile from './HeaderMobile.vue';

const isMobile = ref(false);

const updateIsMobile = () => {
  isMobile.value = window.innerWidth <= 992;
};

onMounted(() => {
  updateIsMobile();
  window.addEventListener('resize', updateIsMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile);
});
</script>

<template>
  <header class="header">
    <div class="container header__container flex">
      <RouterLink to="/" class="header__link">
        <img alt="VK Маруся лого" class="logo header__logo" src="@/assets/icons/logo-dark.svg" />
      </RouterLink>

      <component :is="isMobile ? HeaderMobile : HeaderDesktop" />
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;
@use '@/assets/styles/mixins' as *;

.header {
  padding: 24px 0;

  @include md {
    padding: 17px 0 20px;
  }

  &__container {
    gap: 80px;
    align-items: center;
    justify-content: space-between;

    @include md {
      gap: 40px;
    }
  }

  &__logo {
    width: 143px;
    height: 32px;

    @include sm {
      width: 80px;
      height: 31px;
    }
  }
}
</style>
