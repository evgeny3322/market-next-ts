import Link from 'next/link';
import { Button } from '@/components/ui/button-fixed';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Основной блок */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-purple-50">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Создавайте фотографии с виртуальными моделями для вашего бизнеса на маркетплейсах
              </h1>
              <p className="mt-6 text-xl text-gray-600">
                Забудьте о дорогих фотосессиях. Создавайте профессиональные изображения
                с виртуальными моделями в любых позах и с любым фоном для ваших товаров на любых маркетплейсах.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button className="px-8 py-3 text-base bg-purple-600 hover:bg-purple-700">
                    Начать бесплатно
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button
                    className="px-8 py-3 text-base bg-white text-purple-600 border border-purple-200 hover:bg-purple-50"
                  >
                    Тарифы
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 mt-12 lg:mt-0">
              <div className="relative h-[400px] md:h-[500px] w-full rounded-lg overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-purple-600 opacity-10 rounded-lg"></div>
                <div className="relative h-full w-full">
                  {/* Здесь в реальном проекте будет превью приложения */}
                  <div className="flex items-center justify-center h-full w-full bg-gray-100 rounded-lg">
                    <p className="text-2xl font-bold text-gray-400">Превью сервиса</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Маркетплейсы */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Работает со всеми популярными маркетплейсами
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center justify-items-center">
            <div className="flex items-center justify-center h-16 w-full grayscale hover:grayscale-0 transition-all">
              <div className="bg-gray-200 h-10 w-full rounded flex items-center justify-center">
                <span className="font-bold text-gray-600">Wildberries</span>
              </div>
            </div>
            <div className="flex items-center justify-center h-16 w-full grayscale hover:grayscale-0 transition-all">
              <div className="bg-gray-200 h-10 w-full rounded flex items-center justify-center">
                <span className="font-bold text-gray-600">Ozon</span>
              </div>
            </div>
            <div className="flex items-center justify-center h-16 w-full grayscale hover:grayscale-0 transition-all">
              <div className="bg-gray-200 h-10 w-full rounded flex items-center justify-center">
                <span className="font-bold text-gray-600">AliExpress</span>
              </div>
            </div>
            <div className="flex items-center justify-center h-16 w-full grayscale hover:grayscale-0 transition-all">
              <div className="bg-gray-200 h-10 w-full rounded flex items-center justify-center">
                <span className="font-bold text-gray-600">Яндекс Маркет</span>
              </div>
            </div>
            <div className="flex items-center justify-center h-16 w-full grayscale hover:grayscale-0 transition-all">
              <div className="bg-gray-200 h-10 w-full rounded flex items-center justify-center">
                <span className="font-bold text-gray-600">СберМегаМаркет</span>
              </div>
            </div>
            <div className="flex items-center justify-center h-16 w-full grayscale hover:grayscale-0 transition-all">
              <div className="bg-gray-200 h-10 w-full rounded flex items-center justify-center">
                <span className="font-bold text-gray-600">Lamoda</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Преимущества использования виртуальных моделей
          </h2>
          <p className="mt-4 text-xl text-center text-gray-600 max-w-3xl mx-auto">
            Наш сервис поможет вам создавать профессиональный контент быстро и экономично
          </p>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-6 border border-gray-100 rounded-lg shadow-sm bg-white">
              <div className="w-12 h-12 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full mb-4">
                <span className="text-xl font-bold">₽</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Экономия до 90%</h3>
              <p className="mt-3 text-gray-600">
                Существенно снижайте затраты на профессиональные фотосессии с моделями
              </p>
            </div>
            
            <div className="p-6 border border-gray-100 rounded-lg shadow-sm bg-white">
              <div className="w-12 h-12 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full mb-4">
                <span className="text-xl font-bold">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Быстрое создание</h3>
              <p className="mt-3 text-gray-600">
                Получайте готовые изображения в течение нескольких минут вместо дней или недель
              </p>
            </div>
            
            <div className="p-6 border border-gray-100 rounded-lg shadow-sm bg-white">
              <div className="w-12 h-12 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full mb-4">
                <span className="text-xl font-bold">♾️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Неограниченные возможности</h3>
              <p className="mt-3 text-gray-600">
                Создавайте разнообразные позы, фоны и настройки для каждого товара
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Как это работает */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Как это работает
          </h2>
          <p className="mt-4 text-xl text-center text-gray-600 max-w-3xl mx-auto">
            Всего три простых шага для создания профессиональных изображений
          </p>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="relative">
              <div className="absolute -left-4 -top-4 w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-lg">1</div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <p className="text-lg font-medium text-gray-400">Выбор модели</p>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">Выберите или создайте модель</h3>
                  <p className="mt-3 text-gray-600">
                    Настройте параметры модели: пол, рост, телосложение и другие характеристики
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -left-4 -top-4 w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-lg">2</div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <p className="text-lg font-medium text-gray-400">Загрузка одежды</p>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">Загрузите фото товара</h3>
                  <p className="mt-3 text-gray-600">
                    Загрузите изображения вашей одежды или аксессуаров для примерки на модель
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -left-4 -top-4 w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-lg">3</div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <p className="text-lg font-medium text-gray-400">Генерация</p>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">Получите результат</h3>
                  <p className="mt-3 text-gray-600">
                    Настройте параметры фото, выберите позу и фон, и получите готовое изображение
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Призыв к действию */}
      <section className="py-20 px-4 bg-purple-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white">
            Готовы начать экономить на фотосессиях?
          </h2>
          <p className="mt-4 text-xl text-purple-100 max-w-2xl mx-auto">
            Зарегистрируйтесь прямо сейчас и получите 3 бесплатных изображения
          </p>
          <div className="mt-10">
            <Link href="/register">
              <Button className="px-8 py-3 text-lg bg-white text-purple-600 hover:bg-gray-100">
                Начать бесплатно
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
    </div>
  );
}
