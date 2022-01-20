
import { Route, Routes, Link } from 'react-router-dom'
import Login from "./components/login.component";
import Dashboard from "./components/dashboard.component";
import ErrorPage404 from "./components/error-404" 
import "./assets/css/login.scss";

function App(){ 
    return(  
        <Routes>
              <Route path='*' element={<ErrorPage404/>}/>
               <Route exact path="/" element={<Login/>}/>
               <Route exact path="/dashboard" element={<Dashboard/>}/>
        </Routes>
    );
}
export default App;
