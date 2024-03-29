import React from "react";
import axios from "axios";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./components/context/AuthContext.tsx";

axios.defaults.baseURL = "http://localhost:5003/api/v1";
axios.defaults.withCredentials = true;
const theme = createTheme({
  typography: {
    fontFamily: "Roboto Slab, serif",
    allVariants: { color: "white" },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Toaster position={"top-right"} />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
);
