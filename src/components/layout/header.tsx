"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/context/auth-context';
import { Button } from '@/components/ui/button-fixed';

export function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const pathname = usePathname();

  const navigation = [
    { name: 'Главная', href: '/' },
    { name: 'О сервисе', href: '/about' },
    { name: 'Тарифы', href: '/pricing' },
  ];

  const userNavigation = [
    { name: 'Панель управления', href: '/dashboard' },
    { name: 'Модели', href: '/dashboard/models' },
    { name: 'Одежда', href: '/dashboard/outfits' },
    { name: 'Изображения', href: '/dashboard/images' },
  ];

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-purple-600">
                ModelMarket
              </Link>
            </div>
            <nav className="ml-10 flex items-center space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === item.href
                      ? 'bg-purple-50 text-purple-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <nav className="hidden md:flex items-center space-x-4">
                  {userNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        pathname === item.href
                          ? 'bg-purple-50 text-purple-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <div className="relative ml-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-700">
                      {user?.name}
                    </span>
                    <Button
                      variant="outline"
                      onClick={logout}
                      className="px-3 py-1 text-sm"
                    >
                      Выйти
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Войти
                </Link>
                <Link href="/register">
                  <Button className="ml-2 px-4 py-2 bg-purple-600 hover:bg-purple-700">Регистрация</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 