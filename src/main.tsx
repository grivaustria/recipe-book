// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@src/App.tsx";
import "./index.css";
import "@mdxeditor/editor/style.css";
import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { themeMUI } from "@utils/theme-mui";
import UserProvider from "@context/UserContext.tsx";
import { store } from "@store/store";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={themeMUI}>
        <UserProvider>
          <App />
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
);
