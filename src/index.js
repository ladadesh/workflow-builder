import React from "react";
import "./index.css";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";

import ReactDOM from "react-dom";
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
