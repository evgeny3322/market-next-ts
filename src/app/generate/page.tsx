'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/store';
import { generateImage, ImageGenerationParams } from '@/lib/api';
import {
  virtualModels,
  outfits,
  predefinedPoses,
  predefinedBackgrounds,
  predefinedAngles,
} from '@/lib/mockData';

export default function GeneratePage() {
  const { user, token } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<{
    prompt: string;
    size: ImageGenerationParams['size'];
    style: ImageGenerationParams['style'];
    quality: ImageGenerationParams['quality'];
  }>();
  
  // Проверяем, доступна ли генерация пользователю
  const canGenerate = user?.usage?.imagesRemaining && user.usage.imagesRemaining > 0;
  const defaultModel = virtualModels.find(model => model.isDefault) || virtualModels[0];

  const onSubmit = async (data: ImageGenerationParams) => {
    if (!token) {
      setError('Требуется авторизация');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const result = await generateImage(data, token);
      
      if (result.success && result.data) {
        setGeneratedImage(result.data.url);
      } else {
        setError('Не удалось сгенерировать изображение');
      }
    } catch (err: any) {
      setError(err.message || 'Произошла ошибка при генерации изображения');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-7xl py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Генерация изображения</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Форма настроек */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Настройки генерации</h2>
              
              {/* Текстовый промпт */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Описание изображения (промпт)
                </label>
                <textarea
                  {...register('prompt', { required: 'Необходимо заполнить промпт' })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 min-h-32"
                  placeholder="Опишите, какое изображение вы хотите получить. Например: девушка в красном платье на фоне океана на закате"
                ></textarea>
                {errors.prompt && (
                  <p className="text-red-500 text-sm mt-1">{errors.prompt.message}</p>
                )}
              </div>

              {/* Настройки изображения */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Настройки изображения</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Размер */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Размер
                    </label>
                    <select 
                      {...register('size')}
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                    >
                      <option value="1024x1024">Квадрат (1024x1024)</option>
                      <option value="1024x1792">Вертикальный (1024x1792)</option>
                      <option value="1792x1024">Горизонтальный (1792x1024)</option>
                    </select>
                  </div>

                  {/* Стиль */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Стиль
                    </label>
                    <select 
                      {...register('style')}
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                    >
                      <option value="vivid">Яркий (Vivid)</option>
                      <option value="natural">Естественный (Natural)</option>
                    </select>
                  </div>

                  {/* Качество */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Качество
                    </label>
                    <select 
                      {...register('quality')}
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                    >
                      <option value="standard">Стандартное</option>
                      <option value="hd">HD качество</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Кнопка генерации */}
              <div className="mt-8">
                {canGenerate ? (
                  <Button 
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-base"
                    disabled={loading}
                  >
                    {loading ? 'Генерируем...' : 'Сгенерировать изображение'}
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
                
                {error && (
                  <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-700">{error}</p>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Панель превью */}
        <div className="w-full lg:w-1/3">
          <div className="sticky top-6">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Результат</h2>
              
              <div className="h-80 bg-gray-100 rounded-lg flex flex-col items-center justify-center overflow-hidden">
                {generatedImage ? (
                  <div className="w-full h-full relative">
                    <Image 
                      src={generatedImage} 
                      alt="Сгенерированное изображение" 
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                ) : (
                  <>
                    <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                      <span className="text-2xl">🖼️</span>
                    </div>
                    <span className="text-gray-400 text-center">
                      {loading ? 'Генерируем изображение...' : 'Здесь появится результат генерации'}
                    </span>
                  </>
                )}
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Осталось генераций:</span>
                  <span className="font-medium">
                    {user?.subscription?.plan === 'premium' 
                      ? '∞' 
                      : `${user?.usage?.imagesRemaining || 0}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Текущий тариф:</span>
                  <span className="font-medium">
                    {user?.subscription?.plan === 'premium' ? 'Премиум' : 'Бесплатный'}
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