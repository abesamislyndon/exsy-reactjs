import React  from 'react';
import { Route, useNavigate, Navigate} from 'react-router-dom';
import authService from '../services/auth.service';


const PrivateRoute = ({Component}) => {

    //const Navigate = useNavigate();
    const auth  = authService.isLogin();

    return auth  ? <Component /> : <Navigate to="/" />
}

export default PrivateRoute;