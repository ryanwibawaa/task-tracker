import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import GlobalState from "./context/index";

createRoot(document.getElementById("root")).render(
  <GlobalState>
    <StrictMode>
      <App />
    </StrictMode>
  </GlobalState>
);
