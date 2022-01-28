import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import SidebarWithHeader from "../../shared/SidebarProps";
import { Flex, Container, list, Button} from "@chakra-ui/react";
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import 'rsuite-table/dist/css/rsuite-table.css';
import ClientServices from '../../services/data.service';
import ClientRow from "./ClientRow";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input
} from '@chakra-ui/react'
import { FaPlus, FaEdit} from "react-icons/fa";
import ClientAdd from "./ClientForm";

function Client() {

  const navigate = useNavigate();
  const [values, setValues] = useState({
    clients: [],
    currentUser: undefined,
    clientName: '',
  });

   useEffect(() => {
    const user = AuthService.getCurrentUser();
    const list = ClientServices.clientView();

    if (user) {
      setValues({...values, currentUser: user});
      list.then(clients=>{
        setValues({...values, clients: clients})
      })  
    } else {
      navigate("/");
      window.location.reload();
    }
  }, []);

  const createClient = async() =>{
     try{
       await  ClientServices.CreateClient(values.clientName);
     }
     catch (error){
        console.log(error);
     }
  }


  return ( 
      <SidebarWithHeader>
      <Container maxW='container.xl'>
      <ClientAdd/>
      <ClientRow/>
      </Container>
      </SidebarWithHeader> 
    );
}
export default Client;