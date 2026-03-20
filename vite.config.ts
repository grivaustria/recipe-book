import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        // eslint-disable-next-line @typescript-eslint/typedef
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("firebase")) {
              return "firebase";
            }

            if (
              id.includes("@mui") ||
              id.includes("@emotion") ||
              id.includes("styled-components")
            ) {
              return "ui-vendor";
            }

            if (id.includes("react-toastify")) {
              return "toast";
            }

            if (id.includes("framer-motion")) {
              return "motion";
            }

            if (id.includes("@iconify")) {
              return "iconify";
            }

            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("react-router")
            ) {
              return "react-vendor";
            }
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      "@mui/styled-engine": "@mui/styled-engine-sc",
    },
  },
});
