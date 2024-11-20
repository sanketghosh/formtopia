// packages
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// components
import App from "@/App.tsx";
import {
  AuthContextProvider,
  QueryContextProvider,
  ThemeContextProvider,
} from "@/contexts";
import { Toaster } from "@/components/ui/sonner";
import "@/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <ThemeContextProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <QueryContextProvider>
          <Toaster />
          <App />
        </QueryContextProvider>
      </ThemeContextProvider>
    </AuthContextProvider>
  </StrictMode>,
);
