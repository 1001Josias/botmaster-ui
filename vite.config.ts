/// <reference types="vitest" />

import { resolve } from 'path'

import { configDefaults } from 'vitest/config'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import hq from 'alias-hq'
import external from '@yelo/rollup-node-external'
import dts from 'vite-plugin-dts'
import postcssPresetEnv from 'postcss-preset-env'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: hq.get('rollup'),
    },
    plugins: [react(), dts({ rollupTypes: true, exclude: ['**/*.stories.(ts|tsx)'] })],
    build: {
        sourcemap: true,
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: resolve(__dirname, 'src/lib/index.ts'),
            name: 'Library name',
            // the proper extensions will be added
            fileName: 'index',
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: external(),
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    react: 'React',
                },
            },
        },
    },
    css: {
        modules: {
            localsConvention: 'camelCase',
        },
        postcss: {
            plugins: [postcssPresetEnv({})],
        },
    },
    test: {
        exclude: [
            ...configDefaults.exclude,
            'vite.config.ts',
            'vitest.config.ts',
            'postcss.config.js',
            '{postcss,tailwind}.config.js',
        ],
        environment: 'jsdom',
        alias: {
            '@': '/src',
        },
        globals: true,
    },
})
