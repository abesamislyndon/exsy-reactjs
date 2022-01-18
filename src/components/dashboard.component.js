/*import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";


export default class Dashboard extends Component{

    constructor(props) {
        super(props);
        this.state = {
          redirect: null,
          userReady: false,
          currentUser: { username: "" }
        };
    }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    if(!currentUser) this.setState({ redirect: "/" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render(){
         if (this.state.redirect) {
            return <Navigate to={this.state.redirect} />
          }
          return(
               <div>
                    {(this.state.userReady) ?

                <p>sample</p>
                : null}
            </div>
        );
    }
}
*/

import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
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
           <a href="/" className="nav-link" onClick={logOut}>
                Logout
              </a>
      </div>
    )
}

export default Dashboard;