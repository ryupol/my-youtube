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
        target: "https://my-youtube-2r800517o-ryus-projects-fdacd9ef.vercel.app", //"http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
