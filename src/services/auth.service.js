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
    }).catch(function (error) {
      console.log(error);
    })
};

const login = async (username, password) => {
  const response = await axios
    .post(API_URL, {
      username,
      password,
    });
  if (response.data.auth_token) {
    localStorage.setItem("user", JSON.stringify(response.data));
    
    localStorage.setItem("info", JSON.stringify(
      {
        id: response.data.user.id,
        name: response.data.user.username,
        permissions: ['analyze'],
        roles: [`${response.data.user.role}`],
      }
    ));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("info");
};

const isLogin = () => {
  if (localStorage.getItem("user")) {
    return true;
  }
  return false
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
  isLogin
};




export default authService;