import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import SidebarWithHeader from "../../shared/SidebarProps";
import { Flex, Container, list, Button} from "@chakra-ui/react";
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import 'rsuite-table/dist/css/rsuite-table.css';
import ClientServices from '../../services/data.service';
import ClientRow from "./ClientRow";


function Client() {

  const navigate = useNavigate();
  const [values, setValues] = useState({
    currentUser: undefined,
  });

   useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setValues({...values, currentUser: user});
  
    } else {
      navigate("/");
      window.location.reload();
    }
  }, []);



  return ( 
      <SidebarWithHeader>
      <Container maxW='container.xl'>
  
    <ClientRow/>
      </Container>
      </SidebarWithHeader> 
    );
}
export default Client;