import { useCallback } from 'react';
import { StoreApi, UseBoundStore } from 'zustand';

/**
 * Хук для выбора части состояния из хранилища с корректной типизацией
 * 
 * @param store Хранилище состояния
 * @param selector Функция выбора части состояния
 * @returns Выбранная часть состояния
 * 
 * @example
 * // Получение только части состояния
 * const user = useStoreSelector(useAuthStore, (state) => state.user);
 * 
 * // Получение нескольких свойств состояния
 * const { isLoading, error } = useStoreSelector(useAuthStore, 
 *   (state) => ({ isLoading: state.isLoading, error: state.error })
 * );
 */
export function useStoreSelector<S, U>(
  store: UseBoundStore<StoreApi<S>>,
  selector: (state: S) => U
): U {
  // useStore без селектора возвращает все состояние
  const state = store();
  
  // Применяем селектор к полному состоянию
  return selector(state);
}

/**
 * Хук для выбора действий из хранилища
 * 
 * @param store Хранилище состояния
 * @param actionsSelector Функция выбора действий из хранилища
 * @returns Объект с выбранными действиями
 * 
 * @example
 * const { login, logout } = useStoreActions(useAuthStore, 
 *   (state) => ({ login: state.login, logout: state.logout })
 * );
 */
export function useStoreActions<S, A extends Record<string, Function>>(
  store: UseBoundStore<StoreApi<S>>,
  actionsSelector: (state: S) => A
): A {
  const state = store();
  return actionsSelector(state);
} 