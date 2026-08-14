import { defineConfig } from 'vite';

// GitHub Pages 部署在 https://Yeximiao.github.io/（根路径），base 用 '/'
export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsInlineLimit: 0,
  },
  server: {
    port: 5173,
    open: true,
  },
});
