import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';

const path = (p: string) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@scheduler': path('../supabase/functions/_shared/scheduler') } },
  // Two pages: / = static landing (no JS), /app/ = the PWA (login, then Today).
  build: { rollupOptions: { input: { landing: path('index.html'), app: path('app/index.html') } } },
  server: { port: 5173, fs: { allow: ['..'] } }, // scheduler lives outside web/
});
