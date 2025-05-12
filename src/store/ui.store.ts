import { createStore } from './createStore';

export type Theme = 'light' | 'dark' | 'system';

export interface UIState {
  theme: Theme;
  sidebarOpen: boolean;
  notifications: {
    id: string;
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
  }[];

  // Actions
  setTheme: (theme: Theme) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  addNotification: (notification: Omit<UIState['notifications'][0], 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useUIStore = createStore<UIState>(
  (set) => ({
    theme: 'system',
    sidebarOpen: false,
    notifications: [],

    setTheme: (theme) => set({ theme }),
    
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    
    setSidebarOpen: (open) => set({ sidebarOpen: open }),
    
    addNotification: (notification) => set((state) => ({
      notifications: [
        ...state.notifications,
        {
          ...notification,
          id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        },
      ],
    })),
    
    removeNotification: (id) => set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
    
    clearNotifications: () => set({ notifications: [] }),
  }),
  {
    name: 'ui-store',
    persist: true,
  }
); 