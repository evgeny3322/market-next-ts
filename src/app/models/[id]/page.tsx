import { Button } from '@/components/ui/button-fixed';
import { virtualModels } from '@/lib/mockData';
import Link from 'next/link';

interface ModelPageProps {
  params: {
    id: string;
  };
}

export default function ModelPage({ params }: ModelPageProps) {
  // В реальном проекте здесь будет запрос к API для получения данных модели
  const model = virtualModels.find((m) => m.id === params.id);

  if (!model) {
    return (
      <div className="container mx-auto max-w-7xl py-12 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Модель не найдена</h1>
        <p className="text-gray-600 mb-6">Запрашиваемая модель не существует или была удалена.</p>
        <Link href="/models">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            Вернуться к списку моделей
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl py-12 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Превью модели */}
        <div className="w-full md:w-1/3">
          <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white p-4">
            <div className="h-80 bg-gray-100 flex items-center justify-center rounded-lg">
              <div className="w-40 h-40 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-5xl font-bold text-purple-600">
                  {model.parameters.gender === 'female' ? '👩' : '👨'}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-2xl font-bold text-gray-900">{model.name}</h2>
              {model.isDefault && (
                <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full mt-2 inline-block">
                  Модель по умолчанию
                </span>
              )}
              <div className="mt-4 grid grid-cols-2 gap-4">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white w-full">
                  Редактировать
                </Button>
                {!model.isDefault ? (
                  <Button className="bg-white text-purple-600 border border-purple-200 hover:bg-purple-50 w-full">
                    Сделать по умолчанию
                  </Button>
                ) : (
                  <Button className="bg-white text-gray-400 border border-gray-200 cursor-not-allowed w-full" disabled>
                    По умолчанию
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Параметры модели */}
        <div className="w-full md:w-2/3">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Параметры модели</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Основные характеристики</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Пол</span>
                    <span className="font-medium">{model.parameters.gender === 'female' ? 'Женский' : 'Мужской'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Рост</span>
                    <span className="font-medium">{model.parameters.height} см</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Телосложение</span>
                    <span className="font-medium">{model.parameters.bodyType}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Внешний вид</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Тон кожи</span>
                    <span className="font-medium">{model.parameters.skinTone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Прическа</span>
                    <span className="font-medium">{model.parameters.hairStyle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Цвет волос</span>
                    <span className="font-medium">{model.parameters.hairColor}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Сгенерированные изображения с этой моделью</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400">Нет изображений</p>
                </div>
              </div>
              
              <div className="mt-6">
                <Link href="/generate">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    Сгенерировать изображение
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 