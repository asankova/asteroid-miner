import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    headers: {
      // Required for SharedArrayBuffer (robot comms bus)
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
  worker: {
    format: 'es',
  },
})
