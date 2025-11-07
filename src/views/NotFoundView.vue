<script setup lang="ts">
defineProps({
  resource: {
    type: String,
    required: true,
    default: 'page',
  },
});
</script>

<template>
  <div class="section not-found">
    <div class="container section__container not-found__container">
      <h1 class="not-found__title main-title">Ой! Такой страницы не сущействует.</h1>
      <p class="not-found__text">Похоже, опечатка в адресе.</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;
@use '@/assets/styles/mixins' as *;

.not-found {
  &__container {
    padding-top: 80px;
  }

  &__header {
    margin-bottom: 16px;
  }

  &__text {
    margin: 0;
    margin-bottom: 60px;
    font-size: vars.$big-size;
    font-weight: 400;
    line-height: 133%;
    color: vars.$text-color;

    @include sm {
      font-size: vars.$main-size;
    }
  }
}
</style>
