<script setup lang="ts">
import SocialLink from '../SocialLink.vue';

const socialItems = [
  { href: 'https://vk.com/', iconName: 'IconVK', label: 'ВКонтакте' },
  { href: 'https://www.youtube.com/', iconName: 'IconYT', label: 'Youtube' },
  { href: 'https://ok.ru/', iconName: 'IconOK', label: 'Одноклассники' },
  { href: 'https://web.telegram.org/', iconName: 'IconTG', label: 'Telegram' },
];
</script>

<template>
  <footer class="footer">
    <div class="container footer__container">
      <ul class="footer__list list-reset">
        <li class="footer__item" v-for="item in socialItems" :key="item.href">
          <SocialLink :social="item" class="footer__link" />
        </li>
      </ul>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;

.footer {
  margin-top: auto;
  padding: 40px 0;

  @include sm {
    padding: 24px 0;
  }

  &__list {
    display: flex;
    align-items: center;
    justify-content: right;

    @include sm {
      justify-content: left;
    }
  }

  &__item:not(:last-child) {
    margin-right: 24px;
  }
}
</style>
