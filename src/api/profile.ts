import { API_BASE } from '@/config';
import type { IProfileData } from '@/types/user';
import { apiRequest } from './apiRequest';

export const getProfile = async (): Promise<IProfileData> => {
  return apiRequest<IProfileData>(`${API_BASE}/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
};
