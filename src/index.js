import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/global.scss";
import "./assets/css/table.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

let userJson = localStorage.getItem("user");
let authTokenJson = JSON.parse(userJson);
const BASE_URL_API = process.env.REACT_APP_BASE_URL_API;
axios.defaults.baseURL = BASE_URL_API;

if (userJson) {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + authTokenJson.token;
} else {
  axios.defaults.headers.common["Authorization"] = null;
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
