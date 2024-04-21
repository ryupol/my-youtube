import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://my-youtube-api.vercel.app",
        changeOrigin: true,
      },
    },
  },
});
