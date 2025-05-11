import { Button } from '@/components/ui/button';
import { outfits, generatedImages } from '@/lib/mockData';
import Link from 'next/link';

interface OutfitPageProps {
  params: {
    id: string;
  };
}

export default function OutfitPage({ params }: OutfitPageProps) {
  // В реальном проекте здесь будет запрос к API для получения данных одежды
  const outfit = outfits.find((o) => o.id === params.id);
  
  // Получаем сгенерированные изображения с этой одеждой
  const outfitImages = generatedImages.filter((img) => img.outfitId === params.id);

  if (!outfit) {
    return (
      <div className="container mx-auto max-w-7xl py-12 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Одежда не найдена</h1>
        <p className="text-gray-600 mb-6">Запрашиваемый предмет одежды не существует или был удален.</p>
        <Link href="/outfits">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            Вернуться к списку одежды
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl py-12 px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Изображение одежды */}
        <div className="w-full lg:w-1/3">
          <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white p-4">
            <div className="h-80 bg-gray-100 flex items-center justify-center rounded-lg">
              <span className="text-5xl font-bold text-gray-400">👔</span>
            </div>
            <div className="mt-4">
              <h2 className="text-2xl font-bold text-gray-900">{outfit.name}</h2>
              <p className="text-gray-600 mt-1">Категория: {outfit.category}</p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white w-full">
                  Редактировать
                </Button>
                <Button className="bg-white text-red-600 border border-red-200 hover:bg-red-50 w-full">
                  Удалить
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Информация о генерации */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Сгенерированные изображения с этой одеждой</h3>
            
            {outfitImages.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {outfitImages.map((image) => (
                  <div key={image.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                      <span className="text-xl text-gray-400">📷</span>
                    </div>
                    <div className="p-3">
                      <p className="text-sm text-gray-600">
                        Дата: {image.createdAt.toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Статус: {image.status === 'completed' ? 'Готово' : 'В процессе'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-gray-600 mb-4">Пока не создано ни одного изображения с этой одеждой</p>
              </div>
            )}
            
            <div className="mt-6">
              <Link href={`/generate?outfitId=${outfit.id}`}>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  Сгенерировать новое изображение
                </Button>
              </Link>
            </div>

            <div className="mt-10 pt-6 border-t border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Информация</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Название</span>
                  <span className="font-medium">{outfit.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Категория</span>
                  <span className="font-medium">{outfit.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Дата добавления</span>
                  <span className="font-medium">{outfit.createdAt.toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 