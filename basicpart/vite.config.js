import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { copyFileSync } from 'fs';

// Plugin to copy index.html to 404.html for SPA routing on static hosts
const spa404Plugin = () => ({
	name: 'spa-404',
	closeBundle() {
		copyFileSync('dist/index.html', 'dist/404.html');
		console.log('Created 404.html for SPA routing');
	}
});

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [preact(), spa404Plugin()],
});
