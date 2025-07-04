import { useAuthStore } from '@/app/store/auth';

export async function useAuthFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
  const token = useAuthStore.getState().token;
  if (!token) throw new Error('No token available');

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (!response.ok) throw new Error(await response.text());
  return response.json();
}