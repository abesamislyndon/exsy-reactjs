import React  from 'react';
import { Route, useNavigate, Navigate, useParams, Outlet} from 'react-router-dom';
import authService from '../services/auth.service';


const PrivateRoute = ({Component}) => {

    //const Navigate = useNavigate();
    const auth  = authService.isLogin();
    return auth  ? <Component  /> : <Navigate to="/" />
}

const ProtectedRoute = ({
    isAllowed,
    redirectPath = '/',
    children,
  }) => {
    if (!isAllowed) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return children ? children : <Outlet />;
  };

export default ProtectedRoute;