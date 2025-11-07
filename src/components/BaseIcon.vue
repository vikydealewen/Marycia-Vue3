<script setup lang="ts">
import { shallowRef, watchEffect } from 'vue';

const props = defineProps<{
  iconName: string;
}>();

//проблемы с sahllowRef, вызывает предупреждение
const icon = shallowRef();

// динамический import(), он возвращает модульный объект, а не сам компонент напрямую, поэтому используем default
watchEffect(async () => {
  icon.value = (await import(`@/components/icons/${props.iconName}.vue`)).default;
});
</script>

<template>
  <component :is="icon" />
</template>

<style lang="scss" scoped></style>
