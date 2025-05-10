'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { subscriptionPlans } from '@/lib/mockData';
import { PlanCard } from '@/components/subscription/plan-card-fixed';
import { useAuth } from '@/lib/context/auth-context';

export default function PricingPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSelectPlan = (planId: string) => {
    if (!isAuthenticated) {
      router.push('/register');
      return;
    }

    setSelectedPlan(planId);
    // Переходим на оплату, если выбрали платный план
    if (planId !== 'free') {
      router.push('/subscription/checkout');
    } else {
      // Если бесплатный план, просто показываем сообщение об успехе
      alert('Вы успешно подписались на бесплатный план!');
      router.push('/dashboard');
    }
  };

  return (
    <div className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900">
            Тарифные планы
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Выберите подходящий тариф для вашего бизнеса и начните создавать
            профессиональные изображения уже сегодня
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {subscriptionPlans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onSelect={handleSelectPlan}
            />
          ))}
        </div>

        <div className="mt-20 bg-gray-50 rounded-lg p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900">Часто задаваемые вопросы</h2>
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Могу ли я сменить тариф?</h3>
              <p className="mt-2 text-gray-600">
                Да, вы можете в любой момент перейти с бесплатного тарифа на премиум 
                или отменить премиум-подписку и вернуться к бесплатному тарифу.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Как происходит оплата?</h3>
              <p className="mt-2 text-gray-600">
                Оплата производится ежемесячно. Мы принимаем оплату картами Visa, Mastercard, 
                МИР, а также через ЮMoney.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Что если лимит исчерпан?</h3>
              <p className="mt-2 text-gray-600">
                Если вы достигли лимита бесплатного тарифа, вы можете перейти на премиум-план 
                для доступа к неограниченному количеству изображений.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Есть ли скидки для большого объема?</h3>
              <p className="mt-2 text-gray-600">
                Да, для компаний с большим объемом товаров мы предлагаем индивидуальные 
                корпоративные тарифы. Свяжитесь с нами для получения подробностей.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}