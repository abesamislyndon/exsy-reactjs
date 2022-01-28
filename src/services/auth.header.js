export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.auth_token) {
       return { Authorization: 'Bearer ' + user.auth_token , 'ACCEPT':'application/json'}; // for Spring Boot back-end
    } else {
      return {};
    }
  }
              