import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useAuthStore } from '@/stores/auth';
import { useModalStore } from '@/stores/modal';
import { useLoadingStore } from '@/stores/loading';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/genres',
      name: 'Genres',
      component: () => import('@/views/GenresView.vue'),
      children: [
        {
          path: '',
          name: 'GenresList',
          component: () => import('@/views/genres/GenresListView.vue'),
        },
        {
          path: ':genre',
          name: 'GenreFilms',
          component: () => import('@/views/genres/GenreFilmsView.vue'),
          props: true,
        },
      ],
    },
    {
      path: '/films/:id',
      name: 'Film',
      component: () => import('@/views/FilmView.vue'),
    },
    {
      path: '/account',
      name: 'Account',
      component: () => import('@/views/AccountView.vue'),
      redirect: { name: 'AccountFavoriteFilms' },
      meta: { requiresAuth: true },
      children: [
        {
          path: 'favorites',
          name: 'AccountFavoriteFilms',
          component: () => import('@/components/sections/AccountFavoriteFilms.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'settings',
          name: 'AccountSettings',
          component: () => import('@/components/sections/AccountSettings.vue'),
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: '/404/:resource',
      name: '404Resource',
      component: () => import('@/views/NotFoundView.vue'),
      props: true,
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const modalStore = useModalStore();
  const authStore = useAuthStore();
  const isAuthorized = authStore.isAuthorized;

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthorized) {
      modalStore.openModal('login');

      //блокируем переход и возвращаем на стартовую страницу
      router.replace(from.fullPath);
      return false;
    }
  }

  next(); // всегда так или иначе нужно вызвать next()!
});

router.beforeEach(() => {
  const loader = useLoadingStore();
  loader.startLoading();
});

router.afterEach(() => {
  const loader = useLoadingStore();

  setTimeout(() => {
    loader.stopLoading();
  }, 500);
});

export default router;
