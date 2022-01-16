import React, {Component} from "react";
import { Route, Routes } from 'react-router-dom'
import Login from "./components/login.component";
import "./assets/css/login.scss";

class App extends Component{
  render(){
    return(  
      <div>
         <Routes>
              <Route exact path="/" element={<Login/>}/>
               <Route exact path="/" element={<Login/>}/>
          </Routes>
      </div> 
     
    );
  }
}
export default App;
