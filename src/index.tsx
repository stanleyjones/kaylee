import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, theme } from "@liftedinit/ui";

import App from "./components/App";

const root = document.getElementById("root");
createRoot(root!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
