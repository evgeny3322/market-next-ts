import { Button } from '@/components/ui/button';
import { generatedImages, virtualModels, outfits } from '@/lib/mockData';
import Link from 'next/link';

export default function GalleryPage() {
  return (
    <div className="container mx-auto max-w-7xl py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Галерея изображений</h1>
        <Link href="/generate">
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Сгенерировать новое
          </Button>
        </Link>
      </div>

      {/* Фильтры */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Модель
            </label>
            <select className="w-full rounded-md border border-gray-300 px-3 py-2">
              <option value="">Все модели</option>
              {virtualModels.map((model) => (
                <option key={model.id} value={model.id}>{model.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Одежда
            </label>
            <select className="w-full rounded-md border border-gray-300 px-3 py-2">
              <option value="">Вся одежда</option>
              {outfits.map((outfit) => (
                <option key={outfit.id} value={outfit.id}>{outfit.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Сортировка
            </label>
            <select className="w-full rounded-md border border-gray-300 px-3 py-2">
              <option value="newest">Сначала новые</option>
              <option value="oldest">Сначала старые</option>
            </select>
          </div>
          <div className="flex items-end">
            <Button className="bg-gray-100 hover:bg-gray-200 text-gray-800 w-full">
              Применить фильтры
            </Button>
          </div>
        </div>
      </div>

      {generatedImages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {generatedImages.map((image) => {
            const model = virtualModels.find(m => m.id === image.modelId);
            const outfit = outfits.find(o => o.id === image.outfitId);
            
            return (
              <div 
                key={image.id} 
                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white"
              >
                <div className="h-64 bg-gray-100 flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-400">📷</span>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-900">
                      Создано: {image.createdAt.toLocaleDateString()}
                    </span>
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
                  
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Модель: {model?.name || 'Неизвестно'}</p>
                    <p>Одежда: {outfit?.name || 'Неизвестно'}</p>
                    <p>Поза: {image.parameters.pose}</p>
                    <p>Фон: {image.parameters.background}</p>
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <Button className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm py-1 flex-1">
                      Просмотр
                    </Button>
                    <Button className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm py-1 flex-1">
                      Скачать
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">У вас пока нет сгенерированных изображений</h3>
          <p className="text-gray-600 mb-6">Создайте своё первое изображение прямо сейчас!</p>
          <Link href="/generate">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              Сгенерировать изображение
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
} 