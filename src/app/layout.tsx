import type { Metadata } from 'next';
import QueryProvider from '@/contexts/QueryProvider';
import { ThemeProvider } from '@/contexts/ThemeProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Medical AI Platform',
  description: 'Your personal AI health assistant',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body>
         <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}