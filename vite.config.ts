import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dts from 'vite-plugin-dts';
import svgr from 'vite-plugin-svgr';
import lessVariables from './src/config/variables';

const config = defineConfig({
  plugins: [
    react(),
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
      'components': path.resolve(__dirname, './src/components')
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/components/index.ts'),
      name: 'HumanUI',
      formats: ['es', 'umd'],
      fileName: (format) => `human-ui.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'styled-components'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'styled-components': 'styled',
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
