import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import packageJson from './package.json';
 
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version)
  },
})