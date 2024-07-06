import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { TripContextProvider } from "./tripContext/TripContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TripContextProvider>
      <App />
    </TripContextProvider>
  </React.StrictMode>
);
