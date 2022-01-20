import { useState, useEffect } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import SidebarWithHeader from "../shared/SidebarProps";
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

  
  return(
      <div>

           <SidebarWithHeader/>
      </div>
    )
}

export default Dashboard;