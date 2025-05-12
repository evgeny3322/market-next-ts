import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useAuth } from '@/lib/context/auth-context';
import { Button } from '@/components/ui/button';

type RegisterFormData = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
};

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const { register: registerUser, isLoading } = useAuth();
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setError(null);
      setValidationErrors({});
      
      console.log('Submitting form data:', {
        email: data.email,
        password: data.password, 
        firstName: data.firstName,
        lastName: data.lastName
      });
      
      await registerUser(
        data.email,
        data.password,
        data.firstName,
        data.lastName
      );
      
      router.push('/dashboard');
    } catch (err) {
      console.error('Registration error:', err);
      
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === 'object' && err !== null) {
        const apiError = err as any;
        
        // Проверяем формат ошибки API
        if (apiError.errors && Array.isArray(apiError.errors)) {
          const errors: Record<string, string> = {};
          
          apiError.errors.forEach((e: any) => {
            if (e.path && e.msg) {
              errors[e.path] = e.msg;
            }
          });
          
          if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
          } else {
            setError(apiError.message || 'Произошла ошибка при регистрации');
          }
        } else {
          setError(apiError.message || 'Произошла ошибка при регистрации');
        }
      } else {
        setError('Произошла ошибка при регистрации. Попробуйте еще раз.');
      }
    }
  };

  // Объединяем ошибки из react-hook-form с ошибками валидации от сервера
  const getFieldError = (fieldName: keyof RegisterFormData) => {
    return errors[fieldName]?.message || validationErrors[fieldName];
  };

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Регистрация</h1>
        <p className="mt-2 text-gray-600">
          Создайте аккаунт для использования сервиса
        </p>
      </div>

      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('email', {
              required: 'Email обязателен',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Некорректный email',
              },
            })}
          />
          {getFieldError('email') && (
            <p className="text-sm text-red-500">{getFieldError('email')}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              Имя
            </label>
            <input
              id="firstName"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('firstName', {
                required: 'Имя обязательно',
                minLength: {
                  value: 2,
                  message: 'Имя должно содержать минимум 2 символа',
                },
              })}
            />
            {getFieldError('firstName') && (
              <p className="text-sm text-red-500">{getFieldError('firstName')}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Фамилия
            </label>
            <input
              id="lastName"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('lastName', {
                required: 'Фамилия обязательна',
                minLength: {
                  value: 2,
                  message: 'Фамилия должна содержать минимум 2 символа',
                },
              })}
            />
            {getFieldError('lastName') && (
              <p className="text-sm text-red-500">{getFieldError('lastName')}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Пароль
          </label>
          <input
            id="password"
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('password', {
              required: 'Пароль обязателен',
              minLength: {
                value: 6,
                message: 'Пароль должен содержать минимум 6 символов',
              },
            })}
          />
          {getFieldError('password') && (
            <p className="text-sm text-red-500">{getFieldError('password')}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Подтверждение пароля
          </label>
          <input
            id="confirmPassword"
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('confirmPassword', {
              required: 'Подтверждение пароля обязательно',
              validate: (value) => value === password || 'Пароли не совпадают',
            })}
          />
          {getFieldError('confirmPassword') && (
            <p className="text-sm text-red-500">{getFieldError('confirmPassword')}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700"
          isLoading={isLoading}
        >
          Зарегистрироваться
        </Button>
      </form>

      <div className="text-center text-sm">
        <p className="text-gray-600">
          Уже есть аккаунт?{' '}
          <Link href="/login" className="font-medium text-blue-600 hover:underline">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
} 