import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./Firebase";
import AuthProvider from "./Context/Auth";
import { Provider } from "react-redux";
import store from "./Store/Store";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
