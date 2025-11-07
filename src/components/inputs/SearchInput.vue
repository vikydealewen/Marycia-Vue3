<script setup lang="ts">
import BaseIcon from '../BaseIcon.vue';

const props = defineProps<{
  modelValue: string;
  isFocused: boolean;
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'focus'): void;
  (e: 'blur'): void;
  (e: 'clear-input'): void;
}>();

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emits('update:modelValue', target.value);
};
</script>

<template>
  <div class="search-bar__input-wrapper">
    <label class="search-bar__label visually-hidden" for="searchInput">Поиск</label>
    <BaseIcon class="search-bar__icon search-bar__icon--loupe" icon-name="IconSearch" />
    <input
      class="input search-bar__input"
      type="search"
      name="search"
      id="searchInput"
      placeholder="Поиск"
      :value="modelValue"
      @input="handleInput"
      @focus="emits('focus')"
      @blur="emits('blur')"
    />
    <button
      v-if="isFocused && modelValue !== ''"
      class="search-bar__btn-clear flex"
      @mousedown.prevent="emits('clear-input')"
    >
      <BaseIcon class="search-bar__icon search-bar__icon--cross" icon-name="IconCross" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;
@use '@/assets/styles/mixins' as *;

.search-bar {
  &__input-wrapper {
    position: relative;
    width: 100%;
  }

  &__icon {
    fill: vars.$white-color;
    fill-opacity: 0.5;

    &--loupe {
      position: absolute;
      top: 50%;
      left: 18px;
      transform: translateY(-50%);
      width: 24px;
      height: 24px;
    }

    &--cross {
      width: 13px;
      height: 13px;
    }
  }

  &__btn-clear {
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    align-items: center;
    padding: 0;
    border: none;
    text-align: center;
    background: none;

    @include sm {
      fill: vars.$white-color;
    }
  }

  &__input {
    width: 656px;
    padding: 12px;
    padding-right: 40px;
    padding-left: 52px;
    border: none;
    border-radius: 8px;
    font-size: 18px;
    font-weight: 400;
    color: vars.$light-grey-color;
    background-color: vars.$dark-grey-color;

    @include xl {
      width: 100%;
    }

    @include md {
      padding-top: 16px;
      padding-right: 35px;
      padding-bottom: 16px;
    }
  }
}

/* скрываем стандартный крестик */
input[type='search']::-webkit-search-cancel-button {
  display: none;
  appearance: none;
}
</style>
