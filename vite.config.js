import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// Ensure local dev server rewrites /admin directly to /admin.html
function adminRewritePlugin() {
    return {
        name: 'admin-rewrite-plugin',
        configureServer(server) {
            server.middlewares.use((req, res, next) => {
                const url = req.url ? req.url.split('?')[0] : '';
                if (url === '/admin' || url === '/admin/') {
                    req.url = '/admin.html';
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
        adminRewritePlugin()
    ],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                admin: resolve(__dirname, 'admin.html')
            }
        }
    }
})