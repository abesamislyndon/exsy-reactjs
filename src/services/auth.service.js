import React, {Component} from "react";
import axios from "axios";

//const API_URL = 'http://0.0.0.0:3001/api/v1/';
//\\\export default class AuthService {

 async function login(username, password){
        return axios.post("http://localhost:3001/api/v1/auth_user", {
            username,
            password
        }).then( response=>{
            if(response.data.token){
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return  response.data;
        });
  }
export default login
//}

