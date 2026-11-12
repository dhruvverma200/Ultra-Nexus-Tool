import { defineConfig } from '@tanstack/start/config';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  vite: {
    ssr: {
      noExternal: [
        'sonner',
        'class-variance-authority',
        '@radix-ui/react-dropdown-menu',
        '@radix-ui/react-avatar',
        '@radix-ui/react-tabs',
        '@radix-ui/react-accordion',
        '@radix-ui/react-select',
        '@radix-ui/react-dialog',
        '@radix-ui/react-slot',
        '@radix-ui/react-label',
      ],
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
});
