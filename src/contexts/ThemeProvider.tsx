'use client';

import * as React from 'react';
// --- بداية التعديل ---
// تم دمج الاستيراد في سطر واحد وإزالة المسار القديم
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from 'next-themes';
// --- نهاية التعديل ---

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}