import { create } from 'zustand';

interface AuthState {
  token: string | null;
  setToken: (token: string | null) => void;
  isTokenValid: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  setToken: (token) => set({ token }),
  isTokenValid: () => {
    const token = get().token;
    if (!token) return false;
    const [, payload] = token.split('.');
    const decoded = JSON.parse(atob(payload));
    return decoded.exp * 1000 > Date.now();
  },
}));