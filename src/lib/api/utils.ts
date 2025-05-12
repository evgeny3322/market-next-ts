// Вспомогательная функция для обработки ответов от API
export async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    // Если ответ не OK (не 2xx), пытаемся получить сообщение об ошибке
    try {
      const errorData = await response.json();
      throw new Error(errorData.message || `Ошибка HTTP: ${response.status}`);
    } catch (e) {
      // Если не можем распарсить JSON или сервер вернул ошибку 500, выдаем общую ошибку
      if (response.status === 500) {
        throw { 
          statusCode: 500, 
          message: 'Внутренняя ошибка сервера', 
          isServerError: true 
        };
      }
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
  }
  
  // Если успешно, возвращаем распарсенные данные
  return await response.json();
} 