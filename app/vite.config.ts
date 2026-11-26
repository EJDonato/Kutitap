import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';

const scheduler = fileURLToPath(new URL('../supabase/functions/_shared/scheduler', import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@scheduler': scheduler } },
  server: { port: 5173, fs: { allow: ['..'] } }, // scheduler lives outside app/
});
