'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';
import { useAuth } from '@/lib/context/auth-context';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import {
  currentUser,
  virtualModels,
  outfits,
  generatedImages,
  subscriptionPlans
} from '@/lib/mockData';

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  // Используем useEffect для перенаправления
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Если пользователь не авторизован, возвращаем null до перенаправления
  if (!isAuthenticated) {
    return null;
  }

  // Получаем текущий тарифный план пользователя
  const currentPlan = subscriptionPlans.find(plan => plan.id === user?.subscription?.plan);
  
  // Получаем последние сгенерированные изображения
  const recentImages = [...generatedImages]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 3);

  return (
    <div className="container mx-auto max-w-7xl py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Моя студия</h1>
        <Link href="/generate">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            Создать новое изображение
          </Button>
        </Link>
      </div>

      {/* Карточки со статистикой */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-600">Виртуальные модели</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">{virtualModels.length}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-lg text-purple-600">👤</span>
            </div>
          </div>
          <div className="mt-4">
            <Link href="/models">
              <p className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                Управлять моделями &rarr;
              </p>
            </Link>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-600">Предметы одежды</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">{outfits.length}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-lg text-purple-600">👔</span>
            </div>
          </div>
          <div className="mt-4">
            <Link href="/outfits">
              <p className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                Управлять одеждой &rarr;
              </p>
            </Link>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-600">Сгенерированные изображения</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">{generatedImages.length}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-lg text-purple-600">📷</span>
            </div>
          </div>
          <div className="mt-4">
            <Link href="/gallery">
              <p className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                Просмотреть галерею &rarr;
              </p>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Основная область */}
        <div className="lg:col-span-2">
          {/* Список последних сгенерированных изображений */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Последние изображения</h2>
              <Link href="/gallery">
                <p className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                  Смотреть все &rarr;
                </p>
              </Link>
            </div>

            {recentImages.length > 0 ? (
              <div className="space-y-4">
                {recentImages.map((image) => {
                  const model = virtualModels.find(m => m.id === image.modelId);
                  const outfit = outfits.find(o => o.id === image.outfitId);
                  
                  return (
                    <div key={image.id} className="flex items-center p-3 border border-gray-100 rounded-lg">
                      <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                        <span className="text-xl text-gray-400">📷</span>
                      </div>
                      <div className="ml-4 flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Изображение от {image.createdAt.toLocaleDateString()}
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                              Модель: {model?.name}, Одежда: {outfit?.name}
                            </p>
                          </div>
                          {image.status === 'completed' ? (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              Готово
                            </span>
                          ) : (
                            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                              В процессе
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <p className="text-gray-600 mb-4">У вас пока нет сгенерированных изображений</p>
                <Link href="/generate">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    Создать первое изображение
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Быстрые действия */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Быстрые действия</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/models">
                <div className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                    <span className="text-lg text-purple-600">➕</span>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">Создать новую модель</h3>
                  <p className="text-sm text-gray-600">Настройте параметры для новой виртуальной модели</p>
                </div>
              </Link>
              
              <Link href="/outfits">
                <div className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                    <span className="text-lg text-purple-600">👕</span>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">Загрузить новую одежду</h3>
                  <p className="text-sm text-gray-600">Добавьте новый предмет одежды для генерации</p>
                </div>
              </Link>
              
              <Link href="/generate">
                <div className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                    <span className="text-lg text-purple-600">🖼️</span>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">Сгенерировать изображение</h3>
                  <p className="text-sm text-gray-600">Создайте новое изображение с выбранной моделью и одеждой</p>
                </div>
              </Link>
              
              <Link href="/gallery">
                <div className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                    <span className="text-lg text-purple-600">🔍</span>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">Просмотреть галерею</h3>
                  <p className="text-sm text-gray-600">Управляйте всеми вашими сгенерированными изображениями</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Боковая панель */}
        <div>
          {/* Информация о подписке */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Мой тариф</h2>
            
            <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{currentPlan?.name}</h3>
                  <p className="text-sm text-gray-600">
                    {currentPlan?.price === 0 ? 'Бесплатно' : `${currentPlan?.price} ₽/мес`}
                  </p>
                </div>
                
                {currentPlan?.id === 'free' && (
                  <Link href="/pricing">
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white text-sm">
                      Улучшить
                    </Button>
                  </Link>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Ваше использование</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Осталось генераций:</span>
                  <span className="font-medium">
                    {user?.subscription?.plan === 'premium' 
                      ? '∞' 
                      : user?.usage?.imagesRemaining}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Сгенерировано:</span>
                  <span className="font-medium">{user?.usage?.imagesGenerated}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Статус подписки:</span>
                  <span className="font-medium text-green-600">Активна</span>
                </div>
              </div>
              
              {user?.subscription?.plan === 'free' && user?.usage && (
                <div className="mt-4">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-purple-600 rounded-full" 
                      style={{ 
                        width: `${(user.usage.imagesGenerated / (user.usage.imagesGenerated + user.usage.imagesRemaining)) * 100}%` 
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span>Использовано: {user.usage.imagesGenerated}</span>
                    <span>Всего: {user.usage.imagesGenerated + user.usage.imagesRemaining}</span>
                  </div>
                </div>
              )}
              
              <div className="mt-4">
                <Link href="/profile">
                  <p className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                    Управление подпиской &rarr;
                  </p>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Советы и подсказки */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Советы</h2>
            
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-1">Создавайте разные модели</h3>
                <p className="text-sm text-blue-700">
                  Создайте несколько виртуальных моделей с разными параметрами для большего разнообразия ваших фотографий.
                </p>
              </div>
              
              <div className="p-3 bg-green-50 border border-green-100 rounded-lg">
                <h3 className="font-medium text-green-800 mb-1">Качество изображений</h3>
                <p className="text-sm text-green-700">
                  Загружайте одежду на белом фоне и в хорошем качестве для лучших результатов генерации.
                </p>
              </div>
              
              <div className="p-3 bg-yellow-50 border border-yellow-100 rounded-lg">
                <h3 className="font-medium text-yellow-800 mb-1">Экспериментируйте с позами</h3>
                <p className="text-sm text-yellow-700">
                  Попробуйте разные позы и фоны для вашей одежды, чтобы найти наиболее привлекательные варианты.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}