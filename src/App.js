
import { Route, Routes, Link } from 'react-router-dom'
import Login from "./components/login.component";
import Dashboard from "./components/dashboard.component";
import "./assets/css/login.scss";

function App(){ 
    return(  
      
        <Routes>
               <Route exact path="/" element={<Login/>}/>
               <Route exact path="/dashboard" element={<Dashboard/>}/>
        </Routes>
    );
}
export default App;
