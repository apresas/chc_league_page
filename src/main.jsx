import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { DateProvider } from "./context/DateContext.jsx";
import { StandingsProvider } from "./context/StandingsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <StandingsProvider>
    <DateProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DateProvider>
  </StandingsProvider>
  // </React.StrictMode>
);
