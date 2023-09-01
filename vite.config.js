import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window',
  },
  server: {
      proxy: {
        '/getNews': 'http://localhost:5001',
        '/api/getCompletion': 'http://localhost:5001',
        '/api/getArticle': 'http://localhost:5001',
        '/api/getGrammarCheck': 'http://localhost:5001',
      },
    }
})
