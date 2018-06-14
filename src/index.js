import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import axios from "axios";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
axios.defaults.headers.common["Authorization"] = "Frankie TOKEN";
axios.defaults.headers.post["content-type"] = "application/json";

axios.interceptors.request.use(
  request => {
    console.log("axios.interceptors.request", request);
    // make changes to request
    return request;
  },
  error => {
    console.log("axios.interceptors.request ERROR : ", error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    console.log("axios.interceptors.response ", response);
    return response;
  },
  error => {
    console.log("axios.interceptors.response ERROR : ", error);
    return Promise.reject(error);
  }
);
ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
