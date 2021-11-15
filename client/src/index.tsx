import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import en_US from "@douyinfe/semi-ui/lib/es/locale/source/en_US";
import { LocaleProvider } from "@douyinfe/semi-ui";

axios.defaults.baseURL = "http://127.0.0.1:4000";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <LocaleProvider locale={en_US}>
          <App />
        </LocaleProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
