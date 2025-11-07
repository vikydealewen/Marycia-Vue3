import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { INewUserData } from '@/types/user';
import { createNewAccount, loginUser, logoutUser } from '@/api/auth';
import { useProfileStore } from './profile';

export const useAuthStore = defineStore('auth', () => {
  const isAuthorized = ref<boolean>(sessionStorage.getItem('isAuthorized') === 'true');
  const isRegistered = ref<boolean>(false);

  const login = async (email: string, password: string) => {
    try {
      const response = await loginUser(email, password);

      if (response) {
        isAuthorized.value = true;
        sessionStorage.setItem('isAuthorized', 'true');

        const profileStore = useProfileStore();
        await profileStore.getProfileData();
      }
    } catch (error: unknown) {
      isAuthorized.value = false;
      throw error instanceof Error ? error : new Error(String(error));
    }
  };

  const register = async (user: INewUserData) => {
    try {
      const response = await createNewAccount(user);
      isRegistered.value = response;
    } catch (error) {
      throw error instanceof Error ? error : new Error(String(error));
    }
  };

  const logout = async () => {
    try {
      const response = await logoutUser();
      isAuthorized.value = false;

      sessionStorage.removeItem('isAuthorized');
    } catch (error) {
      console.error('Ошибка выхода:', error);
    }
  };

  return { isAuthorized, isRegistered, login, register, logout };
});
