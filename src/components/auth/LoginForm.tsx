'use client';

import { useForm } from 'react-hook-form';
import type { LoginFormData } from '@/types';

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  isSubmitting: boolean;
}

export default function LoginForm({ onSubmit, isSubmitting }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  return (
    <form
      className="space-y-5"
      aria-label="Login form"
      method="POST"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="relative">
        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register('email', {
            required: 'Email address is required',
            pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address' },
          })}
          aria-invalid={!!errors.email}
          className="dir-ltr text-left peer block w-full appearance-none rounded-2xl border border-gray-300 bg-transparent px-3.5 pb-2.5 pt-4 text-sm text-gray-900 transition focus:border-green-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-green-500"
          placeholder=" "
        />
        <label
          htmlFor="email"
          className="absolute left-3 top-2 z-10 origin-left -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-green-600 dark:bg-gray-900 dark:text-gray-400 dark:peer-focus:text-green-500"
        >
          Email Address
        </label>
        {errors.email && <p className="mt-1 text-xs text-red-600 dark:text-red-500">{errors.email.message}</p>}
      </div>

      <div className="relative">
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 8, message: 'Password must be at least 8 characters' },
          })}
          aria-invalid={!!errors.password}
          className="dir-ltr text-left peer block w-full appearance-none rounded-2xl border border-gray-300 bg-transparent px-3.5 pb-2.5 pt-4 text-sm text-gray-900 transition focus:border-green-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-green-500"
          placeholder=" "
        />
        <label
          htmlFor="password"
          className="absolute left-3 top-2 z-10 origin-left -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-green-600 dark:bg-gray-900 dark:text-gray-400 dark:peer-focus:text-green-500"
        >
          Password
        </label>
        {errors.password && <p className="mt-1 text-xs text-red-600 dark:text-red-500">{errors.password.message}</p>}
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-12 w-full items-center justify-center rounded-2xl bg-green-600 text-base font-semibold text-white shadow-sm transition hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:opacity-60"
        >
          {isSubmitting ? '...' : 'Continue'}
        </button>
      </div>
    </form>
  );
}
