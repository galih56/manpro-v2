import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import EnvironmentPlugin from 'vite-plugin-environment';

const hash = Math.floor(Math.random() * 90000) + 10000;

export default defineConfig(({mode})=>{
    return {
        plugins: [
          laravel({
              input: [
                'resources/css/app.css',
                'resources/js/app.tsx'
              ],
              refresh: true,
          }),
          react(),
          EnvironmentPlugin('all')
        ],
    }
});
