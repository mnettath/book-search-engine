import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      "/graphql": {
        target: "http://localhost:3001",
        secure: false,
        changeOrigin: true,
      },
    },
  },
  // build: {
  //   outDir: "./build",
  //   emptyOutDir: true,
  //   rollupOptions: {
  //     input: "client/src/main.jsx",
  //   },
  // },
});
