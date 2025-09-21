// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { ThemeProvider } from "@mui/material";
import { themeMUI } from "./utils/theme-mui.ts";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider theme={themeMUI}>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
