"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';
import { currentUser as mockUser } from '@/lib/mockData';

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Имитируем проверку аутентификации при загрузке
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // В реальном приложении здесь был бы API-запрос
        const storedAuth = localStorage.getItem('auth');
        
        if (storedAuth) {
          // Для MVP используем хардкодед пользователя
          setUser(mockUser);
        }
      } catch (error) {
        console.error('Ошибка проверки аутентификации:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Функция для входа
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Имитация API-запроса
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // В реальном приложении здесь был бы API-запрос для проверки учетных данных
      if (email && password) {
        setUser(mockUser);
        localStorage.setItem('auth', 'true');
      } else {
        throw new Error('Неверные учетные данные');
      }
    } catch (error) {
      console.error('Ошибка входа:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Функция для выхода
  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth');
  };

  // Функция для регистрации
  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // Имитация API-запроса
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // В реальном приложении здесь был бы API-запрос для создания пользователя
      if (email && password && name) {
        setUser(mockUser);
        localStorage.setItem('auth', 'true');
      } else {
        throw new Error('Неверные данные для регистрации');
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