import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

function docsFallbackPlugin() {
  return {
    name: 'docs-fallback',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url.startsWith('/docs') && req.headers.accept?.includes('text/html')) {
          req.url = '/docs/index.html';
        }
        next();
      });
    }
  };
}

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        docsFallbackPlugin()
    ],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                docs: resolve(__dirname, 'docs/index.html')
            }
        }
    }
})