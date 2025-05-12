export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'USER' | 'ADMIN';
  subscriptionStatus: 'FREE' | 'PREMIUM';
  credits: number;
};

export type AuthResponse = {
  success: boolean;
  message: string;
  data?: {
    user: User;
    token: string;
    refreshToken: string;
    expiresIn: number;
  };
  errors?: Array<{
    param: string;
    msg: string;
  }>;
};

export type Subscription = {
  plan: 'free' | 'premium';
  status: 'active' | 'canceled' | 'past_due';
  currentPeriodEnd: Date;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
};

export type Usage = {
  imagesGenerated: number;
  imagesRemaining: number;
  lastResetDate: Date;
};

export type VirtualModel = {
  id: string;
  userId: string;
  name: string;
  parameters: ModelParameters;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type ModelParameters = {
  gender: 'male' | 'female';
  bodyType: string;
  height: number;
  skinTone: string;
  hairStyle: string;
  hairColor: string;
  // Другие параметры
};

export type Outfit = {
  id: string;
  userId: string;
  name: string;
  category: string;
  imageUrl: string;
  thumbnailUrl: string;
  metadata?: Record<string, any>;
  createdAt: Date;
};

export type GeneratedImage = {
  id: string;
  userId: string;
  modelId: string;
  outfitId: string;
  imageUrl: string;
  thumbnailUrl: string;
  parameters: GenerationParameters;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: Date;
};

export type GenerationParameters = {
  pose: string;
  background: string;
  angle: string;
  // Другие параметры
};

export type SubscriptionPlan = {
  id: string;
  name: string;
  price: number;
  features: string[];
  imagesPerMonth: number;
  isPopular?: boolean;
}; 