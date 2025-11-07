<script setup lang="ts">
const props = defineProps({
  name: String,
  value: String,
});
</script>

<template>
  <div class="characteristics__point flex">
    <span class="characteristics__name">{{ name }}</span>
    <span class="characteristics__dotes"></span>
  </div>

  <span class="characteristics__value">{{ value }}</span>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;
@use '@/assets/styles/mixins' as *;

.characteristics {
  &__point {
    flex-shrink: 0;
    align-items: center;
    width: 320px;

    @include sm {
      width: 100%;
      margin-bottom: 4px;
    }
  }

  &__name {
    display: inline-block;

    @include sm {
      font-size: vars.$small-size;
      line-height: 143%;
      color: vars.$light-grey-color;
    }
  }

  &__dotes {
    position: relative;
    display: inline-block;
    flex-grow: 1;

    &::after {
      content: '';
      position: absolute;
      bottom: -6px;
      left: 0;
      width: 100%;
      border-bottom: 1px dotted vars.$light-grey-color;
      font-size: 5px;
      font-weight: 400;
      letter-spacing: 0.6em;
    }

    @include sm {
      display: none;
    }
  }
}
</style>
