import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default defineConfig((configEnv) =>
	mergeConfig(
		viteConfig(configEnv),
		defineConfig({
			test: {
				environment: 'jsdom',
				exclude: [...configDefaults.exclude, 'e2e/*'],
				root: fileURLToPath(new URL('./', import.meta.url)),
				transformMode: {
					web: [/\.[jt]sx$/]
				}
			}
		})
	)
)
