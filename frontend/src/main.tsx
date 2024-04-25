import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthContextProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
    </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
