import { fileURLToPath, URL } from 'node:url'

import { defineConfig, type UserConfigFnObject } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// @ts-ignore
import eslintPlugin from 'vite-plugin-eslint'
import VueDevTools from 'vite-plugin-vue-devtools'

const pathSrc = fileURLToPath(new URL('./src', import.meta.url))

export default defineConfig(({ mode }) => {
	return {
		plugins: [
			VueDevTools(),
			vue(),
			vueJsx(),
			eslintPlugin({
				include: ['src/**/*.js', 'src/**/*.ts', 'src/**/*.vue', 'src/*.js', 'src/*.ts', 'src/*.vue']
			})
		],
		resolve: {
			alias: {
				'@': pathSrc
			}
		},
		//配置代理
		server: {
			host: '0.0.0.0',
			port: 8080,
			open: false,
			https: false,
			headers: {
				'Cross-Origin-Embedder-Policy': 'require-corp',
				'Cross-Origin-Opener-Policy': 'same-origin'
			}
		},
		// 生产环境打包配置
		build: {
			cssCodeSplit: true, // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
			sourcemap: false, // 构建后是否生成 source map 文件。如果为 true，将会创建一个独立的 source map 文件
			target: 'modules', // 设置最终构建的浏览器兼容目标。默认值是一个 Vite 特有的值——'modules'  还可设置为 'es2015' 'es2016'等
			chunkSizeWarningLimit: 2000, // 单位kb  打包后文件大小警告的限制 (文件大于此此值会出现警告)
			minify: 'terser',
			terserOptions: {
				compress: {
					drop_console: mode === 'production',
					drop_debugger: true
				}
			}
		}
	}
}) as UserConfigFnObject
