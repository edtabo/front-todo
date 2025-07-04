import { useAuthStore } from '@/app/store/auth';
import { auth } from './firebase';
import toast from 'react-hot-toast';

export async function useAuthFetch<T = any>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const store = useAuthStore.getState();
  let token = store.token;

  // Verifica si el token es válido
  const isValid = store.isTokenValid();
  if (!isValid && auth.currentUser) {
    try {
      token = await auth.currentUser.getIdToken(true);
      store.setToken(token);
    } catch (err) {
      store.setToken(null);
      throw new Error('No se pudo renovar el token. Inicia sesión nuevamente.');
    }
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const errorMessage = data?.message || await response.text();
    toast.error(errorMessage || 'Error en la solicitud');
    throw new Error(errorMessage || 'Error en la solicitud');
  }

  if (data?.success && data?.message) {
    toast.success(data.message);
  }

  return data;
}