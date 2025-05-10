import { 
  User, 
  VirtualModel, 
  Outfit, 
  GeneratedImage,
  SubscriptionPlan
} from '@/types';

// Мок-данные для планов подписки
export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Бесплатный',
    price: 0,
    features: [
      'До 3 изображений в месяц',
      'Базовые модели',
      'Ограниченные настройки',
      'Стандартная очередь обработки'
    ],
    imagesPerMonth: 3,
  },
  {
    id: 'premium',
    name: 'Премиум',
    price: 2999,
    features: [
      'Неограниченное количество изображений',
      'Все модели',
      'Все настройки',
      'Приоритетная обработка',
      'Экспорт в высоком разрешении'
    ],
    imagesPerMonth: Infinity,
    isPopular: true,
  }
];

// Мок-данные для текущего пользователя
export const currentUser: User = {
  id: 'user1',
  email: 'user@example.com',
  name: 'Иван Петров',
  companyName: 'Модный магазин',
  subscription: {
    plan: 'free',
    status: 'active',
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  },
  usage: {
    imagesGenerated: 2,
    imagesRemaining: 1,
    lastResetDate: new Date(),
  },
  createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
  updatedAt: new Date(),
};

// Мок-данные для виртуальных моделей
export const virtualModels: VirtualModel[] = [
  {
    id: 'model1',
    userId: 'user1',
    name: 'Женская модель 1',
    parameters: {
      gender: 'female',
      bodyType: 'slim',
      height: 175,
      skinTone: 'medium',
      hairStyle: 'long',
      hairColor: 'brown',
    },
    isDefault: true,
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'model2',
    userId: 'user1',
    name: 'Мужская модель 1',
    parameters: {
      gender: 'male',
      bodyType: 'athletic',
      height: 185,
      skinTone: 'fair',
      hairStyle: 'short',
      hairColor: 'black',
    },
    isDefault: false,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
  },
];

// Мок-данные для одежды
export const outfits: Outfit[] = [
  {
    id: 'outfit1',
    userId: 'user1',
    name: 'Синее платье',
    category: 'Платья',
    imageUrl: 'https://picsum.photos/id/237/800/1000',
    thumbnailUrl: 'https://picsum.photos/id/237/200/300',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'outfit2',
    userId: 'user1',
    name: 'Белая футболка',
    category: 'Футболки',
    imageUrl: 'https://picsum.photos/id/238/800/1000',
    thumbnailUrl: 'https://picsum.photos/id/238/200/300',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'outfit3',
    userId: 'user1',
    name: 'Джинсы',
    category: 'Брюки',
    imageUrl: 'https://picsum.photos/id/239/800/1000',
    thumbnailUrl: 'https://picsum.photos/id/239/200/300',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
];

// Мок-данные для сгенерированных изображений
export const generatedImages: GeneratedImage[] = [
  {
    id: 'image1',
    userId: 'user1',
    modelId: 'model1',
    outfitId: 'outfit1',
    imageUrl: 'https://picsum.photos/id/240/800/1000',
    thumbnailUrl: 'https://picsum.photos/id/240/200/300',
    parameters: {
      pose: 'standing',
      background: 'studio',
      angle: 'front',
    },
    status: 'completed',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'image2',
    userId: 'user1',
    modelId: 'model1',
    outfitId: 'outfit2',
    imageUrl: 'https://picsum.photos/id/241/800/1000',
    thumbnailUrl: 'https://picsum.photos/id/241/200/300',
    parameters: {
      pose: 'walking',
      background: 'park',
      angle: 'side',
    },
    status: 'completed',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
];

// Предопределенные настройки для генерации
export const predefinedPoses = [
  { id: 'standing', name: 'Стоя' },
  { id: 'sitting', name: 'Сидя' },
  { id: 'walking', name: 'В движении' },
  { id: 'posing', name: 'Позирование' },
];

export const predefinedBackgrounds = [
  { id: 'studio', name: 'Студия' },
  { id: 'park', name: 'Парк' },
  { id: 'urban', name: 'Городская среда' },
  { id: 'beach', name: 'Пляж' },
  { id: 'minimalist', name: 'Минималистичный' },
];

export const predefinedAngles = [
  { id: 'front', name: 'Спереди' },
  { id: 'side', name: 'Сбоку' },
  { id: 'back', name: 'Сзади' },
  { id: '34', name: '3/4' },
]; 