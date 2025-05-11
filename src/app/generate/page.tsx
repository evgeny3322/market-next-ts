import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  virtualModels,
  outfits,
  predefinedPoses,
  predefinedBackgrounds,
  predefinedAngles,
  currentUser
} from '@/lib/mockData';

export default function GeneratePage() {
  // В реальном проекте здесь будет обработка параметров из URL и состояния формы
  const defaultModel = virtualModels.find(model => model.isDefault) || virtualModels[0];

  // Проверяем, доступна ли генерация пользователю по его плану подписки
  const canGenerate = currentUser.usage.imagesRemaining > 0;

  return (
    <div className="container mx-auto max-w-7xl py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Генерация изображения</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Форма настроек */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Настройки генерации</h2>

            {/* Выбор модели */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Выберите модель</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {virtualModels.map((model) => (
                  <div 
                    key={model.id} 
                    className={`border ${model.id === defaultModel.id ? 'border-purple-400 bg-purple-50' : 'border-gray-200'} rounded-lg p-4 cursor-pointer`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center">
                        <span className="text-xl">{model.parameters.gender === 'female' ? '👩' : '👨'}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{model.name}</h4>
                        <p className="text-sm text-gray-600">
                          {model.parameters.gender === 'female' ? 'Женская' : 'Мужская'}, {model.parameters.height} см
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Выбор одежды */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Выберите одежду</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {outfits.map((outfit) => (
                  <div 
                    key={outfit.id} 
                    className="border border-gray-200 rounded-lg p-3 cursor-pointer hover:border-purple-400 hover:bg-purple-50"
                  >
                    <div className="h-24 bg-gray-100 flex items-center justify-center rounded mb-2">
                      <span className="text-xl">👔</span>
                    </div>
                    <h4 className="font-medium text-gray-900 text-sm">{outfit.name}</h4>
                    <p className="text-xs text-gray-600">{outfit.category}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Настройки позы и фона */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Настройки изображения</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Позы */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Поза
                  </label>
                  <select className="w-full rounded-md border border-gray-300 px-3 py-2">
                    {predefinedPoses.map((pose) => (
                      <option key={pose.id} value={pose.id}>{pose.name}</option>
                    ))}
                  </select>
                </div>

                {/* Фон */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Фон
                  </label>
                  <select className="w-full rounded-md border border-gray-300 px-3 py-2">
                    {predefinedBackgrounds.map((bg) => (
                      <option key={bg.id} value={bg.id}>{bg.name}</option>
                    ))}
                  </select>
                </div>

                {/* Ракурс */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ракурс
                  </label>
                  <select className="w-full rounded-md border border-gray-300 px-3 py-2">
                    {predefinedAngles.map((angle) => (
                      <option key={angle.id} value={angle.id}>{angle.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Кнопка генерации */}
            <div className="mt-8">
              {canGenerate ? (
                <Button 
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-base"
                >
                  Сгенерировать изображение
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-800">
                      У вас закончился лимит генераций по текущему тарифу. Обновите подписку, чтобы продолжить.
                    </p>
                  </div>
                  <Link href="/pricing">
                    <Button 
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      Обновить тариф
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Панель превью */}
        <div className="w-full lg:w-1/3">
          <div className="sticky top-6">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Предпросмотр</h2>
              
              <div className="h-80 bg-gray-100 rounded-lg flex flex-col items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                  <span className="text-2xl">{defaultModel.parameters.gender === 'female' ? '👩' : '👨'}</span>
                </div>
                <span className="text-gray-400 text-center">Здесь будет отображаться<br />предварительный результат</span>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Осталось генераций:</span>
                  <span className="font-medium">
                    {currentUser.subscription.plan === 'premium' 
                      ? '∞' 
                      : `${currentUser.usage.imagesRemaining} из ${currentUser.usage.imagesGenerated + currentUser.usage.imagesRemaining}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Текущий тариф:</span>
                  <span className="font-medium">
                    {currentUser.subscription.plan === 'premium' ? 'Премиум' : 'Бесплатный'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 