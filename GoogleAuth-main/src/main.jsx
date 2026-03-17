import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

/**
 * main.jsx  –  Application entry point
 * ──────────────────────────────────────
 * Wraps <App> in:
 *   • <StrictMode>    – surfaces potential issues in development
 *   • <BrowserRouter> – enables client-side routing via React Router
 */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
