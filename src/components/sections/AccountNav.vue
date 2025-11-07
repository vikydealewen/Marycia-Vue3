<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import BaseIcon from '@/components/BaseIcon.vue';

const links = [
  { to: '/account/favorites', name: 'Избранные фильмы', nameMobile: 'Избранное', icon: 'IconLike' },
  {
    to: '/account/settings',
    name: 'Настройки аккаунта',
    nameMobile: 'Настройки',
    icon: 'IconUser',
  },
];

const isMobile = ref(false);

const checkIsMobile = () => {
  isMobile.value = window.matchMedia('(max-width: 768px)').matches;
};

onMounted(() => {
  checkIsMobile();
  window.addEventListener('resize', checkIsMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkIsMobile);
});
</script>

<template>
  <div class="nav flex">
    <RouterLink
      v-for="link in links"
      :key="link.name"
      :to="link.to"
      class="nav__link flex"
      exactActiveClass="nav__link--active"
      ><BaseIcon :iconName="link.icon" class="nav__icon"></BaseIcon>
      <span>{{ isMobile ? link.nameMobile : link.name }}</span></RouterLink
    >
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;
@use '@/assets/styles/mixins' as *;

.nav {
  margin-bottom: 64px;

  @include sm {
    margin-bottom: 40px;
  }

  &__icon {
    margin-right: 8px;
    fill: vars.$white-color;
  }

  &__link {
    position: relative;
    align-items: center;
    justify-content: center;
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
    margin-right: 64px;

    @include sm {
      margin-right: 24px;
    }
  }
}
</style>
