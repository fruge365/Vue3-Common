import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createHtmlPlugin } from 'vite-plugin-html';
import postcsspxtoviewport8plugin from 'postcss-px-to-viewport-8-plugin';

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
          additionalData: '@use "@/assets/sass/main.scss" as *;',
          api: 'modern-compiler'

        },
      },
      postcss: {
        plugins: [
          postcsspxtoviewport8plugin({
            unitToConvert: 'px', // 要转化的单位
            viewportWidth: 1920, // 设计稿的视口宽度
            unitPrecision: 6, // 转换后的精度，即小数点位数
            propList: ['*'], // 能转化为vw的属性列表
            viewportUnit: 'vw', // 希望使用的视口单位
            fontViewportUnit: 'vw', // 字体使用的视口单位
            selectorBlackList: [], // 需要忽略的CSS选择器
            minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
            mediaQuery: false, // 是否在媒体查询的css代码中也进行转换
            replace: true, // 是否转换后直接更换属性值
            exclude: [/node_modules/], // 忽略某些文件夹下的文件或特定文件
            // 其他配置选项...
          }),
        ],
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
        [env.VITE_APP_BASE_API]: {
          target: 'https://v2.xxapi.cn/api', // 代理到后端 API 服务
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^${env.VITE_APP_BASE_API}`), ''), // 去除 API 前缀
        },
      },
    },
  };
});
