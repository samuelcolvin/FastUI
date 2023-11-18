import path from 'path'

import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

export default () => {
  const serverConfig = {
    host: true,
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8000',
    },
  }

  return defineConfig({
    // @ts-expect-error - no need to type check this file
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        fastui: path.resolve(__dirname, '../fastui/src'),
        'fastui-bootstrap': path.resolve(__dirname, '../fastui-bootstrap/src'),
      },
    },
    server: serverConfig,
    preview: serverConfig,
    build: {
      outDir: '../../packages-dist/vanilla',
    },
  })
}
