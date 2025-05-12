import { AuthResponse, User } from '@/types';

// Используем локальный прокси вместо прямого доступа к API
const API_URL = '/api';

// Вспомогательная функция для обработки ответов от API
async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    // Если ответ не OK (не 2xx), пытаемся получить сообщение об ошибке
    try {
      const errorData = await response.json();
      throw new Error(errorData.message || `Ошибка HTTP: ${response.status}`);
    } catch (e) {
      // Если не можем распарсить JSON или сервер вернул ошибку 500, выдаем общую ошибку
      // Для 500 ошибки возвращаем специальный объект, чтобы можно было обработать ее отдельно
      if (response.status === 500) {
        throw { 
          statusCode: 500, 
          message: 'Внутренняя ошибка сервера', 
          isServerError: true 
        };
      }
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
  }
  
  // Если успешно, возвращаем распарсенные данные
  return await response.json();
}

export async function register(userData: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}): Promise<AuthResponse> {
  console.log('Calling register API with data:', userData);
  
  // Проверим формат данных перед отправкой
  if (!userData.email || !userData.password || !userData.firstName || !userData.lastName) {
    console.error('Missing required fields for registration');
  }
  
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName
    }),
    credentials: 'include',
  });
  
  return handleApiResponse<AuthResponse>(response);
}

export async function login(credentials: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
    credentials: 'include',
  });
  
  return handleApiResponse<AuthResponse>(response);
}

export async function refreshToken(token: string): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken: token }),
    credentials: 'include',
  });
  
  return handleApiResponse<AuthResponse>(response);
}

export async function getCurrentUser(token: string): Promise<{ success: boolean; data?: User }> {
  const response = await fetch(`${API_URL}/auth/me`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  
  return handleApiResponse<{ success: boolean; data?: User }>(response);
}

export async function logout(token: string): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    
    return handleApiResponse<{ success: boolean; message: string }>(response);
  } catch (error) {
    console.error('Ошибка запроса при выходе:', error);
    // Преобразуем ошибку сети в понятный формат
    throw {
      statusCode: 0,
      message: error instanceof Error ? error.message : 'Ошибка сети при выходе из системы',
      isServerError: true
    };
  }
} 