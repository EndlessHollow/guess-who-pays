import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import { AppStateProvider } from "@contexts/use-app-state";
import { App } from "./app";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppStateProvider>
      <div className="min-h-screen bg-zinc-100">
        <App />
      </div>
    </AppStateProvider>
  </StrictMode>,
);
