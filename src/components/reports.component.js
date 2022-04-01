import React from 'react';
import { useState, useEffect } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import SidebarWithHeader from "../shared/SidebarProps";
import { Flex, Container} from "@chakra-ui/react";

function Reports() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    } else {
      navigate("/");
      window.location.reload();
    }
  }, []);
  return (
    <> 
      <SidebarWithHeader>
      <Flex>
          <p>
            Report Page
         </p>
      </Flex>
      </SidebarWithHeader> 
    </>      
    );
}
export default Reports;