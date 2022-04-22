import axios from "axios";
import authHeader from "./auth.header";
import Moment from "moment";
import React, {
  useEffect,
  useState
} from "react";

import {
  useToast
} from "@chakra-ui/react";

const header = authHeader();
const BASE_URL_API = process.env.REACT_APP_BASE_URL_API;
const BASE_URL = process.env.REACT_APP_BASE_URL;

/*
   USERS SERVICES
*/

const API_URL_USER = "/users";


const getAllUsers = async () => {
  try {
    const response = await axios.get(API_URL_USER, {
      headers: header,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


const createUser = async (
  username,
    email,
    password,
    password_confirmation,
    role
) => {
  const user = {
    username: username,
    email: email,
    password: password,
    password_confirmation: password_confirmation,
    role: role

  };

  axios
    .post(
      API_URL_USER, {
        user,
      }, {
        headers: header,
      }
    )
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.error(error);
    });

};


const userDetail = async (id) => {
    try {
      const response = await axios.get(`users/${id}`, {
        headers: header,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

 const updateUser = (
    email,
    role,
    username,
    password,
    password_confirmation,
    userid
  ) => {
    const user = {
      email: email,
      role: role,
      username: username,
      password: password,
      password_confirmation: password_confirmation

    };

  
    axios
      .put(
        `${BASE_URL_API}/users/${userid}`, {
          user,
        }, {
          headers: header,
        }
      ).then((response) => {
         console.log(response)
    })
  };

  const destroyUser = async (id) => {
    axios
      .delete(`/users/${id}`, {
        headers: header,
      })
      .then((result) => {
        return result;
      });
  };
  

const DataService = {
    getAllUsers,
    userDetail,
    updateUser,
    createUser,
    destroyUser
}

export default DataService;