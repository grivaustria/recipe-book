// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import "@mdxeditor/editor/style.css";
import { ThemeProvider } from "@mui/material";
import { themeMUI } from "./utils/theme-mui.ts";
import UserProvider from "./context/UserContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider theme={themeMUI}>
      <UserProvider>
        <App />
      </UserProvider>
    </ThemeProvider>
  </BrowserRouter>,
);
