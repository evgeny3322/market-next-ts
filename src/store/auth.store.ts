import { createStore } from './createStore';
import * as api from '@/lib/api';
import { setAuthTokens, getAuthTokens, clearAuthTokens } from '@/lib/utils';
import { User } from '@/types';

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  setTokens: (tokens: { token: string; refreshToken: string }) => void;
  clearError: () => void;
}

export const useAuthStore = createStore<AuthState>(
  (set) => ({
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    login: async (credentials) => {
      set({ isLoading: true, error: null });
      try {
        const response = await api.login(credentials);
        
        if (response.success && response.data) {
          const { user, token, refreshToken } = response.data;
          
          setAuthTokens(token, refreshToken);
          
          set({
            user,
            token,
            refreshToken,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          throw new Error(response.message || 'Ошибка авторизации');
        }
      } catch (error) {
        set({
          error: error instanceof Error ? error.message : 'Ошибка авторизации',
          isLoading: false,
        });
      }
    },

    logout: () => {
      try {
        const { token } = getAuthTokens();
        if (token) {
          api.logout(token);
        }
      } finally {
        clearAuthTokens();
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      }
    },

    setUser: (user) => {
      set({ user });
    },

    setTokens: (tokens) => {
      set({
        token: tokens.token,
        refreshToken: tokens.refreshToken,
      });
    },

    clearError: () => {
      set({ error: null });
    },
  }),
  {
    name: 'auth-store',
    persist: true,
  }
); 