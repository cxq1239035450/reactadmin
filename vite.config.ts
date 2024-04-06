import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import UnoCSS from 'unocss/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import type { ConfigEnv, UserConfig } from 'vite'
//自动导入插件
import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-react-components/vite'
// import { AntdResolver } from 'unplugin-react-components'

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv) => {
  console.log(mode, 'mode')

  const config = {
    plugins: [
      react(),
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
  }
  return defineConfig(config)
}
