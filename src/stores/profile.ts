import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { IProfileData } from '@/types/user';
import { getProfile } from '@/api/profile';

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<IProfileData>();

  const getProfileData = async () => {
    try {
      const response = await getProfile();
      profile.value = response;
    } catch (error: unknown) {
      throw error instanceof Error ? error : new Error(String(error));
    }
  };

  return {
    profile,
    getProfileData,
  };
});
