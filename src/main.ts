import './assets/styles/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import { useAuthStore } from './stores/auth';
import { useProfileStore } from './stores/profile';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

const authStore = useAuthStore();
const profileStore = useProfileStore();

if (authStore.isAuthorized) {
  console.log(authStore.isAuthorized);
  profileStore.getProfileData();
}

app.mount('#app');
