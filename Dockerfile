# المرحلة 1: تثبيت التبعيات
FROM node:20-alpine AS deps
WORKDIR /app

# نسخ ملفات package.json وتثبيت التبعيات
COPY package.json package-lock.json ./
RUN npm install

# ---
# المرحلة 2: بناء المشروع
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# سيقوم Next.js تلقائيًا باكتشاف أننا داخل Docker ولن يجمع بيانات الاستخدام
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# ---
# المرحلة 3: صورة التشغيل النهائية (صغيرة الحجم)
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1

# إنشاء مستخدم ونقل الملكية لزيادة الأمان
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# نسخ مخرجات البناء المستقلة من مرحلة البناء
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

# تشغيل خادم Next.js
CMD ["node", "server.js"]