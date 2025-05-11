import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { virtualModels } from '@/lib/mockData';

export default function ModelsPage() {
  return (
    <div className="container mx-auto max-w-7xl py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Мои виртуальные модели</h1>
        <Button 
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          Создать новую модель
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {virtualModels.map((model) => (
          <Link 
            href={`/models/${model.id}`} 
            key={model.id}
            className="block"
          >
            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="h-64 bg-gray-100 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-3xl font-bold text-purple-600">
                    {model.parameters.gender === 'female' ? '👩' : '👨'}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-900">{model.name}</h3>
                  {model.isDefault && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      По умолчанию
                    </span>
                  )}
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  <p>Пол: {model.parameters.gender === 'female' ? 'Женский' : 'Мужской'}</p>
                  <p>Телосложение: {model.parameters.bodyType}</p>
                  <p>Рост: {model.parameters.height} см</p>
                </div>
                <div className="mt-4 text-xs text-gray-500">
                  Создана: {model.createdAt.toLocaleDateString()}
                </div>
              </div>
            </div>
          </Link>
        ))}

        {/* Карточка для создания новой модели */}
        <div className="border border-dashed border-gray-300 rounded-lg overflow-hidden bg-white">
          <div className="h-full flex flex-col items-center justify-center p-8">
            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
              <span className="text-2xl text-purple-600">+</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Создать новую модель</h3>
            <p className="text-sm text-gray-600 text-center mb-4">
              Настройте параметры новой виртуальной модели
            </p>
            <Button 
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Создать модель
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 