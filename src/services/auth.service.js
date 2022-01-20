import axios from "axios";

const API_URL = "/auth_user";

const signup = (username, password) => {
  return axios
    .post(API_URL + "/signup", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    }).catch(function(error) {
      console.log(error);
    })
};

const login = (username, password) => {
  return axios
    .post(API_URL, {
      username,
      password,
    })
    .then((response) => {
      if (response.data.auth_token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    })
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;