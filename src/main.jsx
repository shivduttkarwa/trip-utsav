import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

/* Base tokens/reset/typography/layout first, then shared area styles in
   cascade order. Component-specific styles (buttons, navbar, footer) are
   colocated with their components. */
import "./styles/base.css";
import "./styles/hero.css";
import "./styles/components.css";
import "./styles/cards.css";
import "./styles/sections.css";
import "./styles/forms.css";
import "./styles/misc.css";
import "./styles/pages.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* basename tracks Vite's base so routes use the same mount path in
        development and production. */}
    <BrowserRouter
      basename={import.meta.env.BASE_URL}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
