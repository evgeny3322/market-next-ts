import { create, StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface StoreOptions {
  name: string;
  persist?: boolean;
}

export function createStore<T extends object>(
  initializer: StateCreator<T, [], []>,
  options: StoreOptions
) {
  const { name, persist: shouldPersist = false } = options;

  let store = initializer;

  // Добавление middleware devtools для дебага
  store = devtools(store, { name }) as StateCreator<T, [], []>;

  // Добавление middleware для сохранения состояния в localStorage
  if (shouldPersist) {
    store = persist(store, { name }) as StateCreator<T, [], []>;
  }

  return create<T>(store);
} 