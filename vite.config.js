import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        rollupOptions: {
            output: {
                // Split heavy vendors so the main bundle stays cacheable and small.
                manualChunks: {
                    three: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'],
                    motion: ['motion', 'gsap'],
                    router: ['react-router-dom'],
                },
            },
        },
    },
});
