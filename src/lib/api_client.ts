// src/lib/api_client.ts
import axios from 'axios';

// 1. إنشاء نسخة axios الأساسية وتصديرها باسم 'api'
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
});

// 2. إضافة دالة لتحديث التوكن في كل الطلبات المستقبلية
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// 3. التحقق من وجود توكن عند تحميل التطبيق لأول مرة
if (typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken');
    if (token) {
        setAuthToken(token);
    }
}