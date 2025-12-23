import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

/* 🇦🇪 HARD DUBAI REGION LOCK — MUST RUN BEFORE APP */
document.documentElement.setAttribute("data-region", "AE");
document.documentElement.setAttribute("data-city", "Dubai");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
