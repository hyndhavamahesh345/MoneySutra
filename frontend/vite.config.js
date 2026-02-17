import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5000", // Replace with your API base URL
        // target:"https://codecrafters-yndf.onrender.com",
        changeOrigin: true, // Ensures the host header matches the target
        secure: false, // Set to true if using HTTPS with valid SSL
        rewrite: (path) => path.replace(/^\/api/, ""), // Remove "/api" prefix in requests
      },
    },
  },
});
