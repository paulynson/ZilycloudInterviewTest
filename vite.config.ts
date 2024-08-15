// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests to the backend server
      "/api": {
        target: "https://zam.zilytst.com", // Your backend server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api/v1"), // Rewrite the path if necessary
      },
    },
  },
});
