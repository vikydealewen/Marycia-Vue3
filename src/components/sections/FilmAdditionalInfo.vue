<script setup lang="ts">
import type { PropType } from 'vue';
import type { IFilmCardData } from '@/types/film';
import BaseCharacteristic from '../film/BaseCharacteristic.vue';
import { filmCharacteristicsMap } from '@/helpers/filmCharacterestics';

const props = defineProps({
  filmInfo: Object as PropType<Partial<IFilmCardData>>,
});
</script>

<template>
  <section class="section about">
    <div class="container about__container section__container">
      <h2 class="section__title about__title">О фильме</h2>

      <div v-if="!filmInfo" class="about__empty">
        <p>Дополнительная информация не найдена</p>
      </div>

      <div v-else class="about__characteristics characteristics">
        <ul class="list-reset about__characteristics-list characteristics__list flex">
          <li class="characteristics__item flex" v-for="(value, key) in filmInfo" :key="key">
            <BaseCharacteristic :value="value" :name="filmCharacteristicsMap[key].label" />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;
@use '@/assets/styles/mixins' as *;

.about {
  padding-top: 40px;
  padding-bottom: 120px;

  @include sm {
    padding-top: 32px;
    padding-bottom: 32px;
  }

  &__title {
    margin-bottom: 64px;

    @include sm {
      margin-bottom: 40px;
    }
  }

  &__empty {
    font-size: vars.$big-size;
    font-weight: 700;
  }
}

.characteristics {
  &__list {
    flex-direction: column;
  }

  &__item {
    align-items: baseline;
    font-size: 18px;
    font-weight: 400;
    line-height: 133%;
    color: vars.$white-color;

    @include sm {
      flex-direction: column;
    }
  }

  &__item:not(:last-child) {
    margin-bottom: 24px;

    @include sm {
      margin-bottom: 12px;
    }
  }
}
</style>
