import { API_BASE } from '@/config';
import type { INewUserData } from '@/types/user';
import { apiRequest } from './apiRequest';

export const createNewAccount = (newUser: INewUserData): Promise<boolean> => {
  return apiRequest<boolean>(`${API_BASE}/user`, {
    method: 'POST',
    body: JSON.stringify(newUser),
  });
};

export const loginUser = (email: string, password: string): Promise<boolean> => {
  const params = new URLSearchParams();
  params.append('email', email);
  params.append('password', password);

  return apiRequest<boolean>(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
    credentials: 'include',
  });
};

export const logoutUser = (): Promise<boolean> => {
  return apiRequest<boolean>(`${API_BASE}/auth/logout`, {
    method: 'GET',
    credentials: 'include',
  });
};
