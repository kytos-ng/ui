import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import eslint from 'vite-plugin-eslint';
import { resolve } from 'path';

export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  if (mode === 'preprod') {
    return {
      plugins: [vue(), /**eslint()**/],
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
        environment: "jsdom",
        css: true,
        coverage: {
          reporter: ['text', 'html'],
          exclude:[
            ...configDefaults.exclude
          ]
        }
      },
      css: {
        devSourcemap: true,
      }
    }
  } else {
    return {
      plugins: [vue(), /**eslint()**/],
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
        environment: "jsdom",
        css: true,
        coverage: {
          reporter: ['text', 'html'],
          exclude:[
            ...configDefaults.exclude
          ]
        }
      }
    }
  }
})