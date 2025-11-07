<script setup lang="ts">
import BaseIcon from '../BaseIcon.vue';
import LocalLoader from '../loaders/LocalLoader.vue';

const props = defineProps<{
  variant: 'text' | 'icon';
  color: 'primary' | 'secondary' | 'grey' | 'white' | 'purple';
  icon?: string;
  iconColor?: string;
  disabled?: boolean;
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: 'click'): void;
}>();
</script>

<template>
  <button
    :class="['btn', `btn--${variant}`, `btn--${color}`, { 'btn--disabled': disabled }]"
    :style="{ '--icon-color': iconColor || undefined }"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <BaseIcon v-if="variant === 'icon' && icon" :iconName="icon" class="btn__icon" />

    <LocalLoader v-else-if="loading" :visible="true" />

    <span v-else class="btn__text">
      <slot />
    </span>
  </button>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as vars;
@use '@/assets/styles/mixins' as *;

.btn {
  cursor: pointer;
  border: none;
  border-radius: 28px;
  color: vars.$white-color;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.2s ease;

  &--primary {
    background-color: vars.$blue-color;
  }

  &--secondary {
    border: 1px solid vars.$border-btn-color;
    background-color: vars.$dark-grey-color;
  }

  &--white {
    border: none;
    color: vars.$black-color;
    background-color: vars.$white-color;
  }

  &--grey {
    background-color: vars.$icon-btn-color;
  }

  &--purple {
    background-color: vars.$purple-color;
  }

  &--text {
    padding: 16px 48px;
    font-size: vars.$main-size;
    font-weight: 700;
    line-height: 133%;

    @include sm {
      padding: 16px 40px;
    }
  }

  &--icon {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px 20px;
    border: 1px solid vars.$border-btn-color;
  }

  &__icon {
    width: 24px;
    height: 24px;
  }

  &--disabled {
    pointer-events: none;
    opacity: 0.6;
  }
}
</style>
