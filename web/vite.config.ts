import generouted from '@generouted/solid-router/plugin'
import path from 'path'
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solid(), generouted()],
  server: {
    host: "0.0.0.0",
    hmr: {
      clientPort: 3000,
    },
    port: 3000,
    watch: {
      usePolling: true
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  base: "/map"
})
