import axios from "axios";
import authHeader from "./auth.header";
import Moment from "moment";
import React, {
  useEffect,
  useState
} from "react";


const header = authHeader();

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
    userid
  ) => {
    const user = {
      email: email,
      role: role,
      username: username

    };
    axios
      .put(
        `http://localhost:3001/api/v1/users/${userid}`, {
          user,
        }, {
          headers: header,
        }
      );
  };
  

const DataService = {
    getAllUsers,
    userDetail,
    updateUser
}

export default DataService;