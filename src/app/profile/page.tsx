import { Button } from '@/components/ui/button-fixed';
import { currentUser, subscriptionPlans } from '@/lib/mockData';
import Link from 'next/link';

export default function ProfilePage() {
  const currentPlan = subscriptionPlans.find(plan => plan.id === currentUser.subscription.plan);

  return (
    <div className="container mx-auto max-w-7xl py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Профиль пользователя</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Основная информация */}
        <div className="col-span-2">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Основная информация</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Имя
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                    defaultValue={currentUser.name}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                    defaultValue={currentUser.email}
                    readOnly
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                  Название компании
                </label>
                <input
                  type="text"
                  id="companyName"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  defaultValue={currentUser.companyName || ''}
                />
              </div>
              
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Сохранить изменения
              </Button>
            </form>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Безопасность</h2>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-2">
                  Текущий пароль
                </label>
                <input
                  type="password"
                  id="current-password"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-2">
                    Новый пароль
                  </label>
                  <input
                    type="password"
                    id="new-password"
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
                
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
                    Подтверждение нового пароля
                  </label>
                  <input
                    type="password"
                    id="confirm-password"
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
              </div>
              
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Изменить пароль
              </Button>
            </form>
            
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Удаление аккаунта</h3>
              <p className="text-gray-600 mb-4">
                Это действие нельзя отменить. После удаления все ваши данные будут навсегда удалены из нашей системы.
              </p>
              <Button className="bg-white border border-red-300 text-red-600 hover:bg-red-50">
                Удалить аккаунт
              </Button>
            </div>
          </div>
        </div>
        
        {/* Подписка и использование */}
        <div>
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Информация о подписке</h2>
            
            <div className="mb-4">
              <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-900">{currentPlan?.name}</h3>
                    <p className="text-sm text-gray-600">
                      {currentPlan?.price === 0 ? 'Бесплатно' : `${currentPlan?.price} ₽/мес`}
                    </p>
                  </div>
                  {currentPlan?.id === 'free' && (
                    <Link href="/pricing">
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white text-sm">
                        Обновить
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Статус:</span>
                <span className="font-medium">
                  {currentUser.subscription.status === 'active' ? 'Активна' : 'Неактивна'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Обновление:</span>
                <span className="font-medium">
                  {currentUser.subscription.currentPeriodEnd.toLocaleDateString()}
                </span>
              </div>
            </div>
            
            {currentUser.subscription.plan === 'premium' && (
              <div className="mt-6">
                <Button className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
                  Отменить подписку
                </Button>
              </div>
            )}
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Использование</h2>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Сгенерировано изображений:</span>
                  <span className="font-medium">{currentUser.usage.imagesGenerated}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Осталось изображений:</span>
                  <span className="font-medium">
                    {currentUser.subscription.plan === 'premium' 
                      ? '∞'
                      : currentUser.usage.imagesRemaining}
                  </span>
                </div>
                
                {currentUser.subscription.plan === 'free' && (
                  <div className="mt-4">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-purple-600 rounded-full" 
                        style={{ 
                          width: `${(currentUser.usage.imagesGenerated / (currentUser.usage.imagesGenerated + currentUser.usage.imagesRemaining)) * 100}%` 
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span>0</span>
                      <span>{currentUser.usage.imagesGenerated + currentUser.usage.imagesRemaining}</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Дата последнего обновления лимита:</h3>
                <p className="text-gray-600">
                  {currentUser.usage.lastResetDate.toLocaleDateString()}
                </p>
              </div>
              
              {currentUser.subscription.plan === 'free' && (
                <div className="mt-4">
                  <Link href="/pricing">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                      Получить больше изображений
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 