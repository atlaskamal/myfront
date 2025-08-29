// src/types/index.ts

export type LoginFormData = {
  email: string;
  password: string;
};

export type RegisterFormData = {
  full_name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// ----------------------------------------------------
// 👇 التعديلات والإضافات تبدأ من هنا
// ----------------------------------------------------

// 1. تم تعديل User ليشمل التوكن ويجعل الاسم اختياريًا مؤقتًا
export type User = {
  id: string;
  full_name?: string; // جعلناه اختياريًا لأن التوكن قد لا يحتوي عليه
  email: string;
  token?: string; // أضفنا التوكن هنا
};

// 2. أضفنا هذا النوع لتعريف شكل الرد عند تسجيل الدخول
export type UserAuthResponse = {
  access_token: string;
  token_type: string;
};

// 3. أضفنا هذا النوع لتعريف شكل بيانات المستخدم داخل التوكن
export type DecodedToken = {
  sub: string; // البريد الإلكتروني
  user_id: string; // معرّف المستخدم
  exp: number; // تاريخ انتهاء الصلاحية
};