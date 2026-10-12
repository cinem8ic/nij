import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, Plugin } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Automatic GitHub Pages SPA & Jekyll bypass plugin
function githubPagesSpaPlugin(): Plugin {
  return {
    name: 'vite-plugin-github-pages-spa',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      if (fs.existsSync(distDir)) {
        // 1. Ensure .nojekyll exists so GitHub Pages serves all assets without filtering
        const noJekyllPath = path.join(distDir, '.nojekyll');
        if (!fs.existsSync(noJekyllPath)) {
          fs.writeFileSync(noJekyllPath, '');
        }

        // 2. Ensure 404.html duplicates index.html for seamless SPA routing on page reload
        const indexPath = path.join(distDir, 'index.html');
        const notFoundPath = path.join(distDir, '404.html');
        if (fs.existsSync(indexPath)) {
          fs.copyFileSync(indexPath, notFoundPath);
        }
      }
    },
  };
}

export default defineConfig(() => {
  // Determine base path seamlessly across Vercel, GitHub Pages, and local dev
  const getBase = () => {
    if (process.env.BASE_PATH) return process.env.BASE_PATH;
    if (process.env.BASE_URL) return process.env.BASE_URL;
    if (process.env.GITHUB_PAGES_BASE_PATH) return process.env.GITHUB_PAGES_BASE_PATH;
    if (process.env.VERCEL) return '/';
    if (process.env.CF_PAGES) return '/';
    if (process.env.NETLIFY) return '/';
    if (process.env.GITHUB_ACTIONS && process.env.GITHUB_REPOSITORY) {
      const parts = process.env.GITHUB_REPOSITORY.split('/');
      const repo = parts[1];
      if (repo && repo.toLowerCase().endsWith('.github.io')) {
        return '/';
      }
      return repo ? `/${repo}/` : '/';
    }
    return '/';
  };

  return {
    base: getBase(),
    plugins: [react(), tailwindcss(), githubPagesSpaPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '~': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
