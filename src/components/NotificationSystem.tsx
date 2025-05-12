import { useEffect } from 'react';
import { useStoreSelector, useStoreActions, useUIStore } from '../store';

export function NotificationSystem() {
  // Получаем уведомления из хранилища
  const notifications = useStoreSelector(useUIStore, state => state.notifications);
  
  // Получаем действия для работы с уведомлениями
  const { removeNotification } = useStoreActions(useUIStore, state => ({
    removeNotification: state.removeNotification
  }));

  // Автоматически удаляем уведомления через 5 секунд
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    notifications.forEach(notification => {
      const timer = setTimeout(() => {
        removeNotification(notification.id);
      }, 5000);
      
      timers.push(timer);
    });
    
    // Очищаем таймеры при размонтировании компонента
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [notifications, removeNotification]);

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`rounded-md p-4 shadow-md flex items-start justify-between ${getNotificationColor(
            notification.type
          )}`}
        >
          <div className="flex-1">
            <p className="text-sm">{notification.message}</p>
          </div>
          <button
            onClick={() => removeNotification(notification.id)}
            className="ml-4 text-gray-500 hover:text-gray-700"
            aria-label="Закрыть"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}

// Вспомогательная функция для определения цвета уведомления
function getNotificationColor(type: 'success' | 'error' | 'info' | 'warning'): string {
  switch (type) {
    case 'success':
      return 'bg-green-100 text-green-800';
    case 'error':
      return 'bg-red-100 text-red-800';
    case 'warning':
      return 'bg-yellow-100 text-yellow-800';
    case 'info':
    default:
      return 'bg-blue-100 text-blue-800';
  }
} 