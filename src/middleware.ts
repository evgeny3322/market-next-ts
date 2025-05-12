import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Маршруты, требующие аутентификации
const protectedRoutes = ['/dashboard', '/profile', '/generate', '/gallery', '/models', '/outfits'];
// Маршруты, доступные только для неаутентифицированных пользователей
const authRoutes = ['/login', '/register'];
// Публичные маршруты
const publicRoutes = ['/', '/about', '/pricing', '/contact', '/faq'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Проверяем, есть ли токены авторизации
  const token = request.cookies.get('token')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const isAuthenticated = !!token || !!refreshToken; // Считаем авторизованным, если есть хотя бы один токен

  // Пропускаем запросы к API и статическим файлам
  if (pathname.startsWith('/api') || pathname.includes('_next') || pathname.includes('favicon.ico')) {
    return NextResponse.next();
  }

  // Если это защищенный маршрут и пользователь не аутентифицирован
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !isAuthenticated) {
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Если это маршрут для неаутентифицированных пользователей и пользователь аутентифицирован
  if (authRoutes.includes(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Применяем middleware ко всем маршрутам
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};