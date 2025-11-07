import { useLoadingStore } from '@/stores/loading';

export async function apiRequest<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Ошибка ${response.status}: ${response.statusText}`);
    }

    const data: T = await response.json();
    return data;
  } catch (err: unknown) {
    if (err instanceof Error) return Promise.reject(err);
    return Promise.reject(new Error('Неизвестная ошибка при запросе к API'));
  }
}
