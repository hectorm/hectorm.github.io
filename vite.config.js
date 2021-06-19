import { defineConfig } from 'vite';
import glob from 'glob';
import path from 'path';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			'~/': path.join(__dirname, 'src/'),
		},
	},
	root: path.join(__dirname, 'src/'),
	publicDir: path.join(__dirname, 'public/'),
	build: {
		outDir: path.join(__dirname, 'dist/'),
		emptyOutDir: true,
		brotliSize: false,
		rollupOptions: {
			input: glob.sync(path.join(__dirname, 'src/*.html')),
		},
	},
});
