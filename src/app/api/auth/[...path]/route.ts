import { NextResponse, NextRequest } from 'next/server';

const API_URL = 'http://localhost:3000';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const path = params.path.join('/');
  const searchParams = request.nextUrl.searchParams;
  const queryString = searchParams.toString();
  const url = `${API_URL}/api/auth/${path}${queryString ? `?${queryString}` : ''}`;

  const headers = new Headers(request.headers);
  
  // Удаляем заголовок host, чтобы избежать конфликтов
  headers.delete('host');

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
      credentials: 'include',
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { success: false, message: 'Ошибка соединения с API' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const path = params.path.join('/');
  const url = `${API_URL}/api/auth/${path}`;
  
  // Получаем тело запроса
  const body = await request.json();
  
  // Специальная обработка для регистрации
  let processedBody = body;
  if (path === 'register') {
    console.log('Processing registration request');
    // Убедимся, что имя и фамилия соответствуют ожидаемому формату
    processedBody = {
      email: body.email,
      password: body.password,
      firstName: body.firstName,
      lastName: body.lastName,
    };
  }
  
  // Лог для отладки
  console.log(`Proxying request to ${url}`, processedBody);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(processedBody),
    });

    // Получаем и логируем ответ
    const data = await response.json();
    console.log(`Response from API (status ${response.status}):`, data);
    
    // Создаем ответ
    const nextResponse = NextResponse.json(data, {
      status: response.status,
    });
    
    // Устанавливаем куки при успешной авторизации или регистрации
    if (data.success && data.data && (path === 'login' || path === 'register')) {
      const { token, refreshToken } = data.data;
      if (token && refreshToken) {
        console.log('Setting auth cookies');
        nextResponse.cookies.set('token', token, { 
          path: '/',
          maxAge: 60 * 60 * 24 * 7, // 7 дней
          sameSite: 'lax'
        });
        nextResponse.cookies.set('refreshToken', refreshToken, { 
          path: '/',
          maxAge: 60 * 60 * 24 * 30, // 30 дней
          sameSite: 'lax'
        });
      }
    } else if (path === 'logout') {
      // Очищаем куки при выходе
      console.log('Clearing auth cookies');
      nextResponse.cookies.set('token', '', { 
        path: '/',
        maxAge: 0
      });
      nextResponse.cookies.set('refreshToken', '', { 
        path: '/',
        maxAge: 0
      });
    }
    
    return nextResponse;
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { success: false, message: 'Ошибка соединения с API' },
      { status: 500 }
    );
  }
} 