<script setup lang="ts">
import BaseIcon from './BaseIcon.vue';

const props = defineProps<{
  social: {
    href: string;
    label: string;
    iconName: string;
  };
}>();
</script>

<template>
  <a :href="social.href" target="_blank" :aria-label="social.label" class="social-link">
    <BaseIcon class="social-link__icon" :iconName="props.social.iconName" />
  </a>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;
@use '@/assets/styles/mixins' as *;

.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid rgb(255 255 255 / 80%);
  border-radius: 8px;

  &__icon {
    fill: vars.$white-color;

    @include sm {
      max-width: 13px;
      max-height: 11px;
    }
  }

  @include sm {
    width: 24px;
    height: 24px;
  }
}
</style>
