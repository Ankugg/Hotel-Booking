import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { SearchContextProvider } from "./context/SearchContext";
import { Store } from "./context/Store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <SearchContextProvider>
        <App />
      </SearchContextProvider>
    </Provider>
  </React.StrictMode>
);
