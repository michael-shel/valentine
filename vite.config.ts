import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			'$components': path.resolve('./src/components'),
			'$lib': path.resolve('./src/lib')
		}
	},
	server: {
		fs: {
			// Allow serving files from one level up to the project root
			allow: ['..'],
		},
	},
	build: {
		target: 'esnext' //browsers can handle the latest ES features
	}
});
