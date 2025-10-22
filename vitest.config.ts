import swc from 'unplugin-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		environment: 'node',
		root: './',
		include: ['**/*.spec.ts'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
			exclude: [
				'node_modules/',
				'dist/',
				'coverage/',
				'**/*.spec.ts',
				'**/*.config.ts',
				'**/main.ts',
			],
		},
	},
	plugins: [
		tsconfigPaths(),
		swc.vite({
			module: { type: 'es6' },
		}),
	],
});
