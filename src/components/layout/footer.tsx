import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
          <div className="col-span-2 sm:col-span-2 md:col-span-1">
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">
              PixelSeller
            </h3>
            <p className="mt-4 text-sm text-gray-500">
              Сервис для создания высококачественных цифровых изображений для маркетплейсов.
              Создавайте профессиональный контент быстро и без лишних затрат.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">
              Сервис
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-500 hover:text-gray-900">
                  О сервисе
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-gray-500 hover:text-gray-900">
                  Тарифы
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-gray-500 hover:text-gray-900">
                  Вопросы и ответы
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">
              Аккаунт
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/login" className="text-sm text-gray-500 hover:text-gray-900">
                  Войти
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-sm text-gray-500 hover:text-gray-900">
                  Регистрация
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-900">
                  Личный кабинет
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">
              Контакты
            </h3>
            <ul className="mt-4 space-y-2">
              <li className="text-sm text-gray-500">
                Email: support@pixelseller.ru
              </li>
              <li className="text-sm text-gray-500">
                Телефон: +7 (999) 123-45-67
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} PixelSeller. Все права защищены.
          </p>
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-900">
              Условия использования
            </Link>
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-900">
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 