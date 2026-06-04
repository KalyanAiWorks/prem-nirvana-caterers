import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The mirrored foodtalescatering.com assets under /public/foodtalescatering.com/master/*
// are JPEGs saved without a file extension, so the static server hands them back as
// application/octet-stream — which browsers refuse to use as CSS background-image.
// This middleware tags those paths with the correct image MIME type.
function masterImageMime() {
  return {
    name: 'master-image-mime',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.includes('/master/') && !/\.[a-z0-9]+($|\?)/i.test(req.url)) {
          res.setHeader('Content-Type', 'image/jpeg')
        }
        next()
      })
    },
  }
}

// Enable SPA routing with historyApiFallback
function historyApiFallback() {
  return {
    name: 'history-api-fallback',
    configureServer(server) {
      return () => {
        server.middlewares.use((req, res, next) => {
          // Skip API routes, files with extensions, and specific paths
          if (
            req.url.includes('/api/') ||
            req.url.includes('/menu-images/') ||
            /\.[a-zA-Z0-9]+($|\?)/.test(req.url) ||
            req.url === '/'
          ) {
            return next()
          }

          // For all other requests (like /admin), rewrite to index.html
          req.url = '/'
          next()
        })
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), historyApiFallback(), masterImageMime()],
  server: {
    port: 5174,
    host: '0.0.0.0',
  },
})
