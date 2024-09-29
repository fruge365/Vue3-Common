import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'

// 官方配置文档：https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), // 使用vue插件
    createHtmlPlugin({
      inject: {
        data: {
          title: process.env.VITE_APP_TITLE || '默认标题',
        },
      },
    }),],
  // root: './src', // 将根目录设置为 src 文件夹
  // base: '/my-app/', // 应用将被部署到 /my-app/ 子路径
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/sass/main.scss";'
      }
    }
  },
  build: {
    outDir: 'dist', // 将打包后的文件输出到 dist 目录
    minify: 'esbuild', // 使用 terser或者esbuild 进行压缩
  },
  resolve: {
    alias: {
      '@': '/src',
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  server: {
    port: 80, // 修改开发服务器端口为 80
    hmr: true, // 热模块替换
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // 代理到后端 API 服务
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // 去除 /api 前缀
      },
    },
  },

})