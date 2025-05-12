// Экспорт функции для создания хранилища
export { createStore } from './createStore';

// Экспорт хуков для работы с хранилищами
export { useStoreSelector, useStoreActions } from './hooks';

// Экспорт хранилищ
export { useAuthStore } from './auth.store';
export { useUIStore } from './ui.store';

// Типы
export type { AuthState, User } from './auth.store';
export type { UIState, Theme } from './ui.store'; 