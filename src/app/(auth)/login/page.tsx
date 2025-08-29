'use client';

import Link from 'next/link';
import Image from 'next/image';
import LoginForm from '@/components/auth/LoginForm';
import SocialButton from '@/components/auth/SocialButton';
import { useLoginMutation } from '@/services/authService';
import type { LoginFormData } from '@/types';

// Google Icon Component
const GoogleIcon = () => (
 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"/>
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l.003-."/>
  </svg>
);


export default function LoginPage() {
  const { mutate, isPending, isError } = useLoginMutation();

  const handleLogin = (data: LoginFormData) => {
    mutate(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm px-4">
        <div className="mb-8 flex justify-center">
          <Image src="/icons/logo.png" alt="Platform Logo" width={100} height={100} />
        </div>

        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Sign in to SorLink</h1>
        </div>
        
        <div>
          {isError && (
            <div className="mb-4 rounded-md bg-red-100 p-3 text-center text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
              Login failed. Please check your credentials.
            </div>
          )}
          <LoginForm onSubmit={handleLogin} isSubmitting={isPending} />
        </div>
        
        <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
          Don t have an account?{' '}
          <Link href="/register" className="font-medium text-green-600 hover:underline dark:text-green-500">
            Sign up
          </Link>
        </p>

        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
          <span className="mx-4 flex-shrink text-xs font-medium uppercase text-gray-400">
            OR
          </span>
          <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
        </div>

        <div className="space-y-3">
          <SocialButton Icon={<GoogleIcon />} label="Continue with Google" />
        </div>

      </div>
    </div>
  );
}
