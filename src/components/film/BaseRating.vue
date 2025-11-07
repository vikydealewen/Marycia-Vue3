<script setup lang="ts">
import { computed } from 'vue';
import { roundRatingValue } from '@/helpers/roundRatingValue';
import BaseIcon from '../BaseIcon.vue';

const props = defineProps<{
  ratingValue: number;
  size: 'sm' | 'bg';
}>();

const ratingStatus = computed(() => {
  return props.ratingValue > 7.5
    ? 'rating--excellent'
    : props.ratingValue > 6.3
      ? 'rating--good'
      : props.ratingValue > 4.2
        ? 'rating--normal'
        : 'rating--bad';
});

const rating = computed(() => (props.ratingValue ? roundRatingValue(props.ratingValue) : '0'));
</script>

<template>
  <div :class="['rating', 'flex', `rating--${size}`, ratingStatus]">
    <BaseIcon class="rating__icon" icon-name="IconStar" />
    <span class="rating__text">{{ rating }}</span>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;

.rating {
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  border-radius: 16px;

  &--excellent {
    background-color: vars.$gold-color;
  }

  &--good {
    background-color: vars.$green-color;
  }

  &--normal {
    background-color: vars.$grey-color;
  }

  &--bad {
    background-color: vars.$red-color;
  }

  &__icon {
    margin-right: 4px;
    fill: vars.$white-color;
  }

  &__text {
    font-weight: 700;
    line-height: 133%;
    color: vars.$white-color;
  }

  &--sm {
    font-size: 12px;

    .rating__icon {
      width: 10px;
      height: 10px;
    }
  }

  &--bg {
    font-size: 18px;

    .rating__icon {
      width: 16px;
      height: 16px;
    }
  }
}
</style>
