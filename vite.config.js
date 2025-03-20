import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  if (mode === 'preprod') {
    return {
      plugins: [vue()],
      build: {
        outDir: './web-ui/',
        assetsDir: './dist/',
        sourcemap: true,
        minify: false
      },
      resolve: {
        alias: {
          '@': resolve(__dirname, './src')
        },
      },
      test: {
        environment: "happy-dom",
        coverage: {
          reporter: ['text', 'html'],
        }
      },
      css: {
        devSourcemap: true,
      }
    }
  } else {
    return {
      plugins: [vue()],
      build: {
        outDir: './web-ui/',
        assetsDir: './dist/',
        minify: true
      },
      resolve: {
        alias: {
          '@': resolve(__dirname, './src')
        }
      },
      test: {
        environment: "happy-dom",
        coverage: {
          reporter: ['text', 'html'],
        }
      }
    }
  }
})