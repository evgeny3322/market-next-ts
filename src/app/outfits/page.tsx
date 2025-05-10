import Link from 'next/link';
import { Button } from '@/components/ui/button-fixed';
import { outfits } from '@/lib/mockData';
import Image from 'next/image';

export default function OutfitsPage() {
  return (
    <div className="container mx-auto max-w-7xl py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Моя одежда</h1>
        <Button 
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          Загрузить новую одежду
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {outfits.map((outfit) => (
          <Link 
            href={`/outfits/${outfit.id}`} 
            key={outfit.id}
            className="block"
          >
            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="h-64 bg-gray-100 flex items-center justify-center">
                {/* В реальном проекте тут будет настоящее изображение */}
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <span className="text-3xl font-bold text-gray-400">👔</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{outfit.name}</h3>
                <div className="mt-1 text-sm text-gray-600">
                  <p>Категория: {outfit.category}</p>
                </div>
                <div className="mt-3 text-xs text-gray-500">
                  Добавлена: {outfit.createdAt.toLocaleDateString()}
                </div>
              </div>
            </div>
          </Link>
        ))}

        {/* Карточка для загрузки новой одежды */}
        <div className="border border-dashed border-gray-300 rounded-lg overflow-hidden bg-white">
          <div className="h-full flex flex-col items-center justify-center p-8">
            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
              <span className="text-2xl text-purple-600">+</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Загрузить новую одежду</h3>
            <p className="text-sm text-gray-600 text-center mb-4">
              Загрузите изображение товара для генерации
            </p>
            <Button 
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Загрузить
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 