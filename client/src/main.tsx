// packages
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// components
import App from "@/App.tsx";
import {
  AuthContextProvider,
  FormBuilderContextProvider,
  QueryContextProvider,
  ThemeContextProvider,
} from "@/contexts";
import { Toaster } from "@/components/ui/sonner";
import "@/index.css";
import HolyLoader from "holy-loader";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <FormBuilderContextProvider>
        <ThemeContextProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <HolyLoader
            color="blue"
            height="4px"
            speed={450}
            easing="linear"
            showSpinner
          />
          <QueryContextProvider>
            <Toaster />
            <App />
          </QueryContextProvider>
        </ThemeContextProvider>
      </FormBuilderContextProvider>
    </AuthContextProvider>
  </StrictMode>,
);
