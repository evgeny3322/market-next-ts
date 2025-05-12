"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User } from '@/types';
import * as api from '@/lib/api';
import { setAuthTokens, getAuthTokens, clearAuthTokens } from '@/lib/utils';

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  getValidToken: () => Promise<string | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  // Проверка аутентификации при загрузке
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { token: storedToken, refreshToken: storedRefreshToken } = getAuthTokens();
        
        if (storedToken && storedRefreshToken) {
          setToken(storedToken);
          setRefreshToken(storedRefreshToken);
          
          // Получаем данные текущего пользователя
          const userResponse = await api.getCurrentUser(storedToken);
          
          if (userResponse.success && userResponse.data) {
            setUser(userResponse.data);
          } else {
            // Токен недействителен, пробуем обновить
            await refreshAuthToken(storedRefreshToken);
          }
        }
      } catch (error) {
        console.error('Ошибка проверки аутентификации:', error);
        clearAuth();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Функция для обновления токена
  const refreshAuthToken = async (refreshTokenValue: string) => {
    try {
      const response = await api.refreshToken(refreshTokenValue);
      
      if (response.success && response.data) {
        setUser(response.data.user);
        setToken(response.data.token);
        setRefreshToken(response.data.refreshToken);
        
        setAuthTokens(response.data.token, response.data.refreshToken);
        
        return true;
      } else {
        clearAuth();
        return false;
      }
    } catch (error) {
      console.error('Ошибка обновления токена:', error);
      clearAuth();
      return false;
    }
  };

  // Функция для получения актуального токена, с возможным обновлением
  const getValidToken = useCallback(async () => {
    // Если нет refreshToken, значит пользователь не авторизован
    if (!refreshToken) {
      return null;
    }

    try {
      // Пробуем обновить токен
      const refreshSuccess = await refreshAuthToken(refreshToken);
      if (refreshSuccess) {
        return token;
      }
      return null;
    } catch (error) {
      console.error('Ошибка при получении актуального токена:', error);
      clearAuth();
      return null;
    }
  }, [token, refreshToken]);

  // Очистка данных аутентификации
  const clearAuth = () => {
    setUser(null);
    setToken(null);
    setRefreshToken(null);
    clearAuthTokens();
  };

  // Функция для входа
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await api.login({ email, password });
      
      if (response.success && response.data) {
        // Сначала устанавливаем токены в localStorage и cookies
        setAuthTokens(response.data.token, response.data.refreshToken);
        
        // Затем обновляем состояние React
        setToken(response.data.token);
        setRefreshToken(response.data.refreshToken);
        setUser(response.data.user);
        
        // Проверяем, что токены действительно установлены
        const tokensSet = await checkTokensAreSet();
        if (!tokensSet) {
          console.error('Токены не были успешно установлены');
          throw new Error('Не удалось установить сессию. Пожалуйста, попробуйте ещё раз.');
        }
      } else {
        throw new Error(response.message || 'Ошибка входа в систему');
      }
    } catch (error) {
      console.error('Ошибка входа:', error);
      clearAuth(); // Очищаем всё при ошибке
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Вспомогательная функция для проверки установки токенов
  const checkTokensAreSet = async (): Promise<boolean> => {
    // Небольшая задержка для гарантии завершения асинхронных операций
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const { token, refreshToken } = getAuthTokens();
    return !!(token && refreshToken);
  };

  // Функция для выхода
  const logout = async () => {
    setIsLoading(true);
    try {
      if (token) {
        await api.logout(token);
      }
    } catch (error) {
      // Улучшенная обработка ошибок
      if (error instanceof Error) {
        console.error('Ошибка выхода (Error):', error.message);
      } else if (error && typeof error === 'object') {
        try {
          console.error('Ошибка выхода (Object):', JSON.stringify(error));
        } catch (jsonError) {
          console.error('Ошибка выхода (не сериализуемый объект):', Object.keys(error));
        }
      } else {
        console.error('Ошибка выхода (неизвестный тип):', String(error));
      }
      
      // Продолжаем процесс выхода даже при ошибке сервера
      // Это позволит пользователю выйти из системы локально, даже если сервер недоступен
      if (error && typeof error === 'object' && 'isServerError' in error) {
        console.warn('Сервер вернул ошибку, но локальный выход все равно выполнен');
      }
    } finally {
      // Всегда очищаем данные аутентификации, даже если API запрос завершился с ошибкой
      clearAuth();
      setIsLoading(false);
    }
  };

  // Функция для регистрации
  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    setIsLoading(true);
    try {
      const response = await api.register({ email, password, firstName, lastName });
      
      if (response.success && response.data) {
        setUser(response.data.user);
        setToken(response.data.token);
        setRefreshToken(response.data.refreshToken);
        
        setAuthTokens(response.data.token, response.data.refreshToken);
      } else {
        // Если ответ содержит ошибки валидации, передаем их в исключении
        if (response.errors) {
          throw response;
        }
        throw new Error(response.message || 'Ошибка регистрации');
      }
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        getValidToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  return context;
} 