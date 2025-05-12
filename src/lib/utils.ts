import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
  }).format(value);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Функции для работы с токенами авторизации
export function setAuthTokens(token: string, refreshToken: string): void {
  if (typeof window !== 'undefined') {
    try {
      // Сохраняем в localStorage для клиентского доступа
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      
      // Устанавливаем cookies для middleware
      document.cookie = `token=${token}; path=/; max-age=604800; SameSite=Lax`;
      document.cookie = `refreshToken=${refreshToken}; path=/; max-age=2592000; SameSite=Lax`;
      
      // Проверяем, что localStorage успешно обновлен
      const storedToken = localStorage.getItem('token');
      const storedRefreshToken = localStorage.getItem('refreshToken');
      
      if (storedToken !== token || storedRefreshToken !== refreshToken) {
        console.error('Ошибка при установке токенов в localStorage');
      }
    } catch (e) {
      console.error('Ошибка при сохранении токенов:', e);
      throw new Error('Не удалось установить сессию. Возможно, ваш браузер блокирует cookies.');
    }
  }
}

export function getAuthTokens(): { token: string | null; refreshToken: string | null } {
  if (typeof window !== 'undefined') {
    return {
      token: localStorage.getItem('token'),
      refreshToken: localStorage.getItem('refreshToken'),
    };
  }
  return { token: null, refreshToken: null };
}

export function clearAuthTokens(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    
    // Удаляем cookies
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
} 