import { useState, useEffect } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import AuthService from "../services/auth.service";

function Dashboard(){

  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const user = AuthService.getCurrentUser();

  if (user) {
      setCurrentUser(user);
    }else{
      navigate("/");
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };
  
  return(
      <div>
           <Link to="/" onClick={logOut}>Logout</Link>
      </div>
    )
}

export default Dashboard;