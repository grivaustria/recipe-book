import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

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
      "@src": fileURLToPath(new URL("./src", import.meta.url)),
      "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
      "@component": fileURLToPath(new URL("./src/component", import.meta.url)),
      "@context": fileURLToPath(new URL("./src/context", import.meta.url)),
      "@data": fileURLToPath(new URL("./src/data", import.meta.url)),
      "@hooks": fileURLToPath(new URL("./src/hooks", import.meta.url)),
      "@routes": fileURLToPath(new URL("./src/routes", import.meta.url)),
      "@store": fileURLToPath(new URL("./src/store", import.meta.url)),
      "@app-types": fileURLToPath(new URL("./src/types", import.meta.url)),
      "@utils": fileURLToPath(new URL("./src/utils", import.meta.url)),
      "@mui/styled-engine": "@mui/styled-engine-sc",
    },
  },
});
