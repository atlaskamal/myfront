// src/services/authService.ts
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { api, setAuthToken } from '@/lib/api_client'; // الآن ستعمل هذه الإستيرادات
import { useUserStore } from '@/store/useUserStore';
import type { LoginFormData, RegisterFormData, UserAuthResponse, DecodedToken } from '@/types';

const loginUser = async (data: LoginFormData): Promise<UserAuthResponse> => {
  const params = new URLSearchParams();
  params.append('username', data.email);
  params.append('password', data.password);

  const response = await api.post('/auth/login', params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.data;
};

const registerUser = async (data: RegisterFormData) => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

export const useLoginMutation = () => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const { access_token } = data;
      localStorage.setItem('authToken', access_token);
      setAuthToken(access_token);
      const decodedToken: DecodedToken = jwtDecode(access_token);
      setUser({
        id: decodedToken.user_id,
        email: decodedToken.sub,
        token: access_token,
      });
      router.push('/');
    },
    onError: (error) => console.error('Login failed:', error),
  });
};

export const useRegisterMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => router.push('/login'),
    onError: (error) => console.error('Registration failed:', error),
  });
};