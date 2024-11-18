import App from "@/App.tsx";
import { ThemeContextProvider } from "@/contexts";
import "@/index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeContextProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
    </ThemeContextProvider>
  </StrictMode>,
);
