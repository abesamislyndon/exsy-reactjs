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
import ProtectedRoute from "./components/privateRoute";
import Jobinfo from "./components/jobwork/jobinfo";
import authService from "./services/auth.service";
import Users from "./components/users/users";
import UserShowDetail from "./components/users/show";
import Newuser from "./components/users/newuser";
import Report from "./components/report";
import Items from "./components/item";
import mypdf from "./components/jobwork/pdf/jobworkpdf";

const App = () => {
  const userinfo = () => {
    authService.getCurrentUser();
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const info = JSON.parse(localStorage.getItem("info"));

  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="*" element={<ErrorPage404 />} />
        <Route exact path="/" element={<Login />} />
        <Route
          path="form"
          element={
            <ProtectedRoute
              redirectPath="/"
              isAllowed={!!user}
            >
              <Jobwork />
            </ProtectedRoute>
          }
        />
        <Route
          path="outstanding"
          element={
            <ProtectedRoute
              redirectPath="/"
              isAllowed={!!user && info.roles.includes('superadmin') || info.roles.includes('towncouncilAdmin')}
            >
              <Outstanding />
            </ProtectedRoute>
          }
        />
        <Route
          path="completed"
          element={
            <ProtectedRoute
              redirectPath="/"
              isAllowed={!!user && info.roles.includes('superadmin') || info.roles.includes('towncouncilAdmin')}
            >
              <Completed />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/jobinfo/:id/"
          element={<PrivateRoute Component={Jobinfo} />}
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
          path="users"
          element={
            <ProtectedRoute
              redirectPath="/"
              isAllowed={!!user && info.roles.includes('superadmin') || info.roles.includes('towncouncilAdmin')}
            >
              <Users />
            </ProtectedRoute>
          }
        />
          <Route
          path="newuser"
          element={
            <ProtectedRoute
              redirectPath="/"
              isAllowed={!!user && info.roles.includes('superadmin') || info.roles.includes('towncouncilAdmin')}
            >
              <Newuser />
            </ProtectedRoute>
          }
        />

          <Route
          path="/user/:id/"
          element={
            <ProtectedRoute
              redirectPath="/"
              isAllowed={!!user && info.roles.includes('superadmin') || info.roles.includes('towncouncilAdmin')}
            >
              <UserShowDetail />
            </ProtectedRoute>
          }
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

        <Route
          path="dashboard"
          element={
            <ProtectedRoute
              redirectPath="/"
              isAllowed={!!user}
            >
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="reports"
          element={
            <ProtectedRoute
              redirectPath="/"
              isAllowed={!!user && info.roles.includes('superadmin') || info.roles.includes('towncouncilAdmin')}
            >
              <Report />
            </ProtectedRoute>
          }
        />
      </Routes>
    </ChakraProvider>
  );
};
export default App;
