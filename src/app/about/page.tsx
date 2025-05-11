import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'О сервисе | ModelMarket',
  description: 'Узнайте больше о сервисе ModelMarket - как мы помогаем создавать профессиональные фотографии с виртуальными моделями для маркетплейсов.',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Главный баннер */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-white to-purple-50">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="font-bold text-gray-900 mb-6">О сервисе ModelMarket</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Мы создаем будущее визуального контента для маркетплейсов, 
            помогая продавцам экономить ресурсы и увеличивать продажи.
          </p>
        </div>
      </section>

      {/* Наша миссия */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="font-bold text-gray-900 mb-6">Наша миссия</h2>
              <p className="text-gray-600 mb-4">
                ModelMarket был создан с целью решить одну из самых больших проблем для продавцов на маркетплейсах — высокую стоимость и трудоемкость создания качественного визуального контента.
              </p>
              <p className="text-gray-600 mb-4">
                Мы верим, что технологии должны делать бизнес доступнее и эффективнее. Именно поэтому мы разработали сервис, который позволяет создавать профессиональные фотографии товаров с виртуальными моделями всего за несколько кликов.
              </p>
              <p className="text-gray-600">
                Наша миссия — демократизировать доступ к высококачественному визуальному контенту и помочь продавцам любого масштаба конкурировать на равных условиях с крупными игроками рынка.
              </p>
            </div>
            <div className="md:w-1/2 bg-gray-100 h-80 md:h-96 rounded-lg flex items-center justify-center">
              <div className="text-5xl">🚀</div>
            </div>
          </div>
        </div>
      </section>

      {/* Как это работает */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-bold text-gray-900 mb-10 text-center">Как работает ModelMarket</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm relative">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 text-purple-600 font-bold">1</div>
              <h3 className="font-bold text-gray-900 mb-3">Выберите или создайте модель</h3>
              <p className="text-gray-600">
                Создайте собственную виртуальную модель с нужными параметрами или выберите из готовых вариантов в нашей библиотеке.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm relative">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 text-purple-600 font-bold">2</div>
              <h3 className="font-bold text-gray-900 mb-3">Загрузите фото товара</h3>
              <p className="text-gray-600">
                Загрузите изображения вашей одежды или аксессуаров. Наш сервис автоматически обработает их для примерки на модель.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm relative">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 text-purple-600 font-bold">3</div>
              <h3 className="font-bold text-gray-900 mb-3">Получите готовый результат</h3>
              <p className="text-gray-600">
                Выберите позу, фон и другие параметры изображения. Через несколько минут получите готовое профессиональное фото.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-bold text-gray-900 mb-10 text-center">Преимущества использования ModelMarket</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 border border-gray-100 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 text-purple-600 text-xl">💰</div>
              <h3 className="font-bold text-gray-900 mb-2">Экономия до 90%</h3>
              <p className="text-gray-600">
                Забудьте о дорогих фотосессиях с моделями и студийной аренде
              </p>
            </div>
            
            <div className="p-6 border border-gray-100 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 text-purple-600 text-xl">⚡</div>
              <h3 className="font-bold text-gray-900 mb-2">Скорость</h3>
              <p className="text-gray-600">
                Создавайте десятки профессиональных изображений за считанные минуты
              </p>
            </div>
            
            <div className="p-6 border border-gray-100 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 text-purple-600 text-xl">🎯</div>
              <h3 className="font-bold text-gray-900 mb-2">Конверсия</h3>
              <p className="text-gray-600">
                Увеличивайте продажи благодаря качественным фото товаров на моделях
              </p>
            </div>
            
            <div className="p-6 border border-gray-100 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 text-purple-600 text-xl">🔄</div>
              <h3 className="font-bold text-gray-900 mb-2">Гибкость</h3>
              <p className="text-gray-600">
                Легко обновляйте визуальный контент при смене сезона или коллекции
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Команда */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-bold text-gray-900 mb-4 text-center">Наша команда</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
            ModelMarket создан командой экспертов в области компьютерного зрения, 
            искусственного интеллекта и электронной коммерции
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">👨‍💻</div>
              <h3 className="font-bold text-gray-900 mb-1">Александр Петров</h3>
              <p className="text-purple-600 text-sm mb-3">Основатель, CEO</p>
              <p className="text-gray-600 text-sm">
                10+ лет опыта в ML и компьютерном зрении
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">👩‍💼</div>
              <h3 className="font-bold text-gray-900 mb-1">Мария Иванова</h3>
              <p className="text-purple-600 text-sm mb-3">Директор по продукту</p>
              <p className="text-gray-600 text-sm">
                Эксперт в e-commerce и юзабилити
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">👨‍🎨</div>
              <h3 className="font-bold text-gray-900 mb-1">Дмитрий Сидоров</h3>
              <p className="text-purple-600 text-sm mb-3">Ведущий инженер ИИ</p>
              <p className="text-gray-600 text-sm">
                Специалист по генеративным моделям
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Технология */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2 order-2 md:order-1">
              <h2 className="font-bold text-gray-900 mb-6">Наша технология</h2>
              <p className="text-gray-600 mb-4">
                В основе ModelMarket лежат передовые алгоритмы компьютерного зрения и генеративные нейросети, которые мы адаптировали специально для задач электронной коммерции.
              </p>
              <p className="text-gray-600 mb-4">
                Мы используем собственную технологию для точной виртуальной примерки одежды на 3D-модели, что позволяет достичь фотореалистичного результата.
              </p>
              <p className="text-gray-600">
                Наши алгоритмы постоянно совершенствуются, обучаясь на миллионах изображений, чтобы предоставлять вам самое высокое качество генерации.
              </p>
            </div>
            <div className="md:w-1/2 bg-gray-100 h-80 md:h-96 rounded-lg flex items-center justify-center order-1 md:order-2">
              <div className="text-5xl">🧠</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA секция */}
      <section className="py-16 px-4 bg-purple-600">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="font-bold text-white mb-6">Готовы начать экономить на фотосессиях?</h2>
          <p className="text-purple-100 mb-8 max-w-3xl mx-auto">
            Присоединяйтесь к сотням продавцов, которые уже используют ModelMarket для создания профессиональных фотографий товаров
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button className="px-8 py-3 text-base bg-white text-purple-600 hover:bg-gray-100">
                Начать бесплатно
              </Button>
            </Link>
            <Link href="/pricing">
              <Button className="px-8 py-3 text-base bg-purple-700 text-white hover:bg-purple-800">
                Посмотреть тарифы
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-bold text-gray-900 mb-10 text-center">Часто задаваемые вопросы</h2>
          
          <div className="space-y-6">
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2">Какие требования к загружаемым изображениям?</h3>
              <p className="text-gray-600">
                Для лучших результатов загружайте изображения товаров на белом или прозрачном фоне с хорошим освещением. Рекомендуемое разрешение — не менее 1000px по меньшей стороне.
              </p>
            </div>
            
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2">Сколько времени занимает генерация одного изображения?</h3>
              <p className="text-gray-600">
                В зависимости от выбранных параметров и загруженности сервера, генерация одного изображения занимает от 30 секунд до 2 минут.
              </p>
            </div>
            
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2">Можно ли использовать сгенерированные изображения на любых маркетплейсах?</h3>
              <p className="text-gray-600">
                Да, вы получаете полные права на использование сгенерированных изображений. Вы можете размещать их на Wildberries, Ozon, AliExpress, Яндекс.Маркет и любых других площадках.
              </p>
            </div>
            
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2">Что входит в бесплатный тариф?</h3>
              <p className="text-gray-600">
                Бесплатный тариф включает до 3 сгенерированных изображений в месяц, доступ к базовым моделям и стандартным позам. Этого достаточно, чтобы оценить возможности сервиса.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 