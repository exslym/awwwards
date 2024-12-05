import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
	root: './src',
	publicDir: '../public',
	base: './',

	build: {
		outDir: '../build',
		emptyOutDir: true,
	},

	plugins: [react()],
});
