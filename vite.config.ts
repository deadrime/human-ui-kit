import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dts from 'vite-plugin-dts';
import svgr from 'vite-plugin-svgr';
import lessVariables from './public/config/variables';

const config = defineConfig({
  plugins: [
    react({
      jsxRuntime: 'classic',
    }),
    svgr({
      exportAsDefault: true,
      svgrOptions: {
        dimensions: false
      }
    }),
    dts({
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@icons': path.resolve(__dirname, './src/icons'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@const': path.resolve(__dirname, './src/constants'),
    },
  },
  optimizeDeps: {
    include: ['react/jsx-runtime'],
  },
  build: {
    sourcemap: true,
    minify: true,
    lib: {
      entry: path.resolve(__dirname, 'src/components/index.ts'),
      name: 'HumanUI',
      formats: ['es'],
      fileName: (format) => `human-ui.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: lessVariables,
        javascriptEnabled: true,
      },
    }
  }
})

// https://vitejs.dev/config/
export default config
