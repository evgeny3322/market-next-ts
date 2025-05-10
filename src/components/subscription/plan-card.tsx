import { SubscriptionPlan } from '@/types';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { useAuth } from '@/lib/context/auth-context';
import { CheckCircle } from 'lucide-react';

interface PlanCardProps {
  plan: SubscriptionPlan;
  onSelect: (planId: string) => void;
}

export function PlanCard({ plan, onSelect }: PlanCardProps) {
  const { user } = useAuth();
  const isCurrentPlan = user?.subscription.plan === plan.id;

  return (
    <div 
      className={`
        flex flex-col p-6 border rounded-lg shadow-sm transition-all
        ${plan.isPopular ? 'border-blue-500 shadow-md' : 'border-gray-200'}
        ${isCurrentPlan ? 'bg-blue-50 border-blue-400' : 'bg-white'}
      `}
    >
      {plan.isPopular && (
        <div className="py-1 px-3 bg-blue-600 text-white text-xs font-bold uppercase tracking-wide rounded-full self-start mb-4">
          Популярный выбор
        </div>
      )}
      
      <h3 className="text-xl font-bold">{plan.name}</h3>
      
      <div className="mt-4 flex items-baseline">
        <span className="text-3xl font-extrabold">{formatCurrency(plan.price)}</span>
        <span className="ml-1 text-gray-500">/месяц</span>
      </div>
      
      <div className="flex-grow mt-6 space-y-4">
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mr-2" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mt-8">
        {isCurrentPlan ? (
          <Button
            disabled
            className="w-full"
          >
            Текущий тариф
          </Button>
        ) : (
          <Button
            onClick={() => onSelect(plan.id)}
            className={`w-full ${plan.isPopular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
          >
            {plan.id === 'free' ? 'Выбрать' : 'Подписаться'}
          </Button>
        )}
      </div>
    </div>
  );
} 