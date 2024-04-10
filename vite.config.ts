import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import UnoCSS from 'unocss/vite'
// 可视化包大小
import { visualizer } from 'rollup-plugin-visualizer'
import Inspect from 'vite-plugin-inspect'
//自动导入插件
import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-react-components/vite'
// import { AntdResolver } from 'unplugin-react-components'
import type { ConfigEnv, UserConfig } from 'vite'

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv) => {
  const { VITE_DROP_CONSOLE } = loadEnv(mode, process.cwd())

  console.log(mode, 'mode')

  const config = {
    plugins: [
      react({
        babel: {
          parserOpts: {
            //开启装饰器  开启处于提议状态的语法
            plugins: ['decorators-legacy'],
          },
        },
      }),
      UnoCSS(),
      AutoImport({
        imports: ['react', 'react-router-dom'],
        dts: 'src/auto-import.d.ts',
      }),
      // Components({
      //   resolvers: [AntdResolver()],
      //     dts: {
      //       rootPath: path.resolve(__dirname, './src/'),
      //     },
      // }),
      Inspect(),
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
        filename: path.resolve(__dirname, './visualizer/stats.html'),
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/'),
      },
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
    },
    build: {
      // target: 'modules',
      target: 'esnext',
      outDir: 'dist',
      assetsDir: './src/assets/',
      // TODO:可能需要去掉 minify否则图片路径无法加载成功
      // minify: 'terser', // 混淆器
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks: {
            // lodashES: ['lodash-es'],
            antDesign: ['antd'],
            antDesignIcon: ['@ant-design'],
          },
        },
      },
      terserOptions: {
        compress: {
          // 根据官网: 防止chrome出现性能问题
          keep_infinity: true,
          //生产环境时移除console
          drop_debugger: VITE_DROP_CONSOLE === 'true',
          drop_console: VITE_DROP_CONSOLE === 'true',
        },
      },
      sourcemap: false,
    },
  }
  return defineConfig(config)
}
