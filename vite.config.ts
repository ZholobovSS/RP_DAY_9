import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import checker from 'vite-plugin-checker';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return {
        publicDir: 'public',
        plugins: [
            react(),
            checker({
                typescript: true,
                eslint: {
                    useFlatConfig: true,
                    lintCommand: 'eslint ./src --max-warnings 0',

                    dev: {
                        logLevel: ['error'],
                    },
                },
                stylelint: {
                    lintCommand: 'stylelint "src/**/*.{css,scss}" --max-warnings 0 --allow-empty-input',
                    dev: {
                        logLevel: ['error'],
                    },
                },
            }),
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        optimizeDeps: {
            include: ['@emotion/react', '@emotion/styled', '@mui/icons-material', '@mui/material'],
        },
        preview: {
            open: true,
        },
        build: {
            outDir: 'build',
            target: 'es2020',
            sourcemap: true,
            minify: 'esbuild',

            rollupOptions: {
                output: {
                    manualChunks: (id) => {
                        if (id.includes('node_modules')) {
                            if (id.includes('react-hook-form')) {
                                return 'react-hook-form';
                            }
                        }
                    },
                },
            },
        },
    };
});
