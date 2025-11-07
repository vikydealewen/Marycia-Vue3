<script setup lang="ts">
const props = defineProps({
  inputType: {
    type: String,
    default: 'text',
  },
  inputName: {
    type: String,
    default: '',
  },
  inputPlaceholder: {
    type: String,
    default: '',
  },
  hasError: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>

<template>
  <div class="input-wrapper" :class="{ 'input--error': hasError }">
    <label class="label visually-hidden" :for="inputName">{{ inputPlaceholder }}</label>
    <slot class="input-icon" />
    <input
      class="input"
      :type="inputType"
      :name="inputName"
      :id="inputName"
      :placeholder="inputPlaceholder"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as vars;

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;

  :slotted(svg) {
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    fill: rgb(0 0 0 / 40%);
  }

  &.input--error {
    .input {
      border: 1px solid vars.$error-color;
    }

    :slotted(svg) {
      fill: vars.$error-color;
    }
  }
}

.input {
  width: 100%;
  padding: 16px;
  padding-left: 52px;
  border: 1px solid rgb(0 0 0 / 40%);
  border-radius: 8px;
  font-size: 18px;
  font-weight: 400;
  line-height: 133%;
  background-color: transparent;

  &::placeholder {
    color: rgb(0 0 0 / 40%);
  }
}

// :deep svg {
//   position: absolute;
//   left: 16px;
//   width: 24px;
//   height: 24px;
//   top: 50%;
//   fill: rgba(0, 0, 0, 0.4);
//   transform: translateY(-50%);
// }
</style>
