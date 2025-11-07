<script setup lang="ts">
import BaseIcon from '../BaseIcon.vue';

const emit = defineEmits<{
  (e: 'click'): void;
}>();
</script>

<template>
  <button class="btn flex" @click="$emit('click')">
    <BaseIcon class="btn__icon" iconName="IconCross" />
  </button>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;
@use '@/assets/styles/mixins' as *;

.btn {
  cursor: pointer;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border: none;
  border-radius: 100px;
  background-color: vars.$white-color;

  @include sm {
    padding: 10px;
  }

  &__icon {
    width: 24px;
    height: 24px;
    fill: vars.$black-color;

    // @include sm {
    //   width: 13px;
    //   height: 13px;
    // }
  }
}
</style>
