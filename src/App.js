
import { Route, Routes} from 'react-router-dom'
import Login from "./components/login.component";
import Dashboard from "./components/dashboard.component";
import Jobwork from "./components/jobwork.component";
import Client from "./components/client/client.component";
import Usermanagement from "./components/user.manangement.component";
import Reports from "./components/reports.component";
import ErrorPage404 from "./components/error-404" 
import "./assets/css/login.scss";
import theme from './themes/index';
import { ChakraProvider } from '@chakra-ui/react';


function App(){ 
    return(      
        <ChakraProvider theme={theme}> 
        <Routes>
               <Route  path='*' element={<ErrorPage404/>}/>
               <Route  exact path="/" element={<Login/>}/>
               <Route  exact path="/jobwork" element={<Jobwork/>}/>
               <Route  exact path="/dashboard" element={<Dashboard/>}/>
               <Route  exact path="/client" element={<Client/>}/>
               <Route  exact path="/users" element={<Usermanagement/>}/>
               <Route  exact path="/reports" element={<Reports/>}/>
        </Routes>   
        </ChakraProvider>     
    );
}
export default App;
