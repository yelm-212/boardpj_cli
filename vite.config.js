import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { manualChunksPlugin } from 'vite-plugin-webpackchunkname';

// ckeditor
import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

export default defineConfig({
    plugins: [vue(), manualChunksPlugin(), ckeditor5({ theme: require.resolve('@ckeditor/ckeditor5-theme-lark') })],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});
