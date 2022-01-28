import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/login.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter}  from "react-router-dom";
import axios from 'axios'
import { ChakraProvider } from '@chakra-ui/react'

let userJson = localStorage.getItem('user');
let authTokenJson = JSON.parse(userJson);
axios.defaults.baseURL = 'http://0.0.0.0:3001/api/v1/';
if (userJson) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + authTokenJson.token;
} else {
  axios.defaults.headers.common['Authorization'] = null;
}

ReactDOM.render(

  <ChakraProvider>
  <App/>
  </ChakraProvider>
  , document.getElementById("root"));

reportWebVitals();





