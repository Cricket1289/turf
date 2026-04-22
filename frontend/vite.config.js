import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    server: {
      port: 4310,
      allowedHosts: true,
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:4210',
          changeOrigin: true,
        }
      }
    },
    define: {
      __VITE_API_URL__: JSON.stringify(env.VITE_API_URL || 'http://localhost:4210'),
    }
  }
})
