import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import cartstore from "./store/cartstore.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={cartstore}>
      <App />
    </Provider>
  </React.StrictMode>
);
