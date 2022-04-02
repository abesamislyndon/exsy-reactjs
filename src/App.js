import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login.component";
import Dashboard from "./components/dashboard.component";
import Jobwork from "./components/jobwork/jobwork.component";
import Outstanding from "./components/jobwork/outstanding";
import Completed from "./components/jobwork/completed";
import Client from "./components/client";
import Division from "./components/division";
import Usermanagement from "./components/user.manangement.component";
import Reports from "./components/reports.component";
import ErrorPage404 from "./components/error-404";
import "./assets/css/login.scss";
import theme from "./themes/index";
import { ChakraProvider, Show } from "@chakra-ui/react";
import PrivateRoute from "./components/privateRoute";
import Jobinfo from "./components/jobwork/jobinfo";
import authService from './services/auth.service';
import Users from "./components/users/users";
import UserShowDetail from "./components/users/show";
import Newuser from "./components/users/newuser";
import Report from "./components/report";
import Items from "./components/item";
import mypdf from "./components/jobwork/pdf/jobworkpdf";



function App() {

  const userinfo = () => {
    authService.getCurrentUser();
  }

  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="*" element={<ErrorPage404 />} />
        <Route exact path="/" element={<Login />} />
        <Route
          exact
          path="/form"
          element={<PrivateRoute Component={Jobwork} />}
        />
        <Route
          exact
          path="/outstanding"
          element={<PrivateRoute Component={Outstanding} />}
        />
        <Route
          exact
          path="/completed"
          element={<PrivateRoute Component={Completed} />}
        />
        <Route
          exact
          path="/jobinfo/:id/"
          element={<PrivateRoute Component={Jobinfo} />}
        />
        <Route
          exact
          path="/dashboard"
          element={<PrivateRoute Component={Dashboard} />}
        />
        <Route
          exact
          path="/client"
          element={<PrivateRoute Component={Client} />}
        />
        <Route
          exact
          path="/division"
          element={<PrivateRoute Component={Division} />}
        />
        <Route
          exact
          path="/users"
          element={<PrivateRoute Component={Users} />}
        />
        <Route
          exact
          path="/newuser"
          element={<PrivateRoute Component={Newuser} />}
        />
        <Route
          exact
          path="/user/:id/"
          element={<PrivateRoute Component={UserShowDetail} />}
        />
        <Route
          exact
          path="/reports"
          element={<PrivateRoute Component={Report} />}
        />

        <Route
          exact
          path="/items"
          element={<PrivateRoute Component={Items} />}
        />

<Route
          exact
          path="/pdf/:id/"
          element={<PrivateRoute Component={mypdf} />}
        />



      </Routes>
    </ChakraProvider>
  );
}
export default App;
