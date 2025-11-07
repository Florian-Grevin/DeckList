import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(),react()],
  server: {
    host: true,      // Permet l'accès via le réseau (utile pour Live Share)
    port: 5173       // Définit le port utilisé par Vite
  }
});
