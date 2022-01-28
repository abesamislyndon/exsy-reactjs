import { useState, useEffect } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import SidebarWithHeader from "../shared/SidebarProps";
import { Flex, Container} from "@chakra-ui/react";

function Jobwork() {
  return (
      <SidebarWithHeader>
      <Container maxW='container.xl'>
      </Container>
      </SidebarWithHeader>   
    );
}
export default Jobwork;