import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { Flex, Button} from "@chakra-ui/react";
import 'rsuite-table/dist/css/rsuite-table.css';
import ClientServices from '../../services/data.service';

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

function ClientAdd() {

  const navigate = useNavigate();
  const [values, setValues] = useState({
    clients: [],
    currentUser: undefined,
    clientName: '',
  });

 useEffect(() => {
    getClient();
    const user = AuthService.getCurrentUser();
    if (user) {
      setValues({...values, currentUser: user});  
    } else {
      navigate("/");
      window.location.reload();
    }
  }, []);

  const getClient = () =>{
    const clientList  = ClientServices.clientView();
    clientList.then(clients=>{
       setValues({...values, clients: clients})
     })  
  }

const createClient = async() =>{
     try{
       ClientServices.CreateClient(values.clientName);
     }
     catch (error){
        console.log(error);
     }
  }
  
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef()
  const finalRef = React.useRef()
 
 
  return ( 
   <> 
      <Flex>
              <Button onClick={onOpen} leftIcon={<FaPlus/>} size="sm" colorScheme="green">New Client</Button>
      </Flex>
      <br/>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Client</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={createClient}>
          <ModalBody pb={6}>
               <Input onChange={(e) => setValues({...values, clientName: e.target.value})}/>
          </ModalBody>
          <ModalFooter>
            <Button type = "submit" colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
    );
}
export default ClientAdd;