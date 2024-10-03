import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createHtmlPlugin } from 'vite-plugin-html';

// 官方配置文档：https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      vue(),
      createHtmlPlugin({
        inject: {
          data: {
            title: env.VITE_APP_TITLE || '默认标题', // 使用环境变量
          },
        },
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/sass/main.scss";',
        },
      },
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
        '/dev-api': {
          target: 'https://api.vvhan.com/api', // 代理到后端 API 服务
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/dev-api/, ''), // 去除 /api 前缀
        },
      },
    },
  };
});
