import React, { useState, useEffect } from "react";
import { Flex, Button, FormControl} from "@chakra-ui/react";
import 'rsuite-table/dist/css/rsuite-table.css';
import ClientServices from '../../services/data.service';
import {useForm } from "react-hook-form";

import {
  CircularProgress,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Text
} from '@chakra-ui/react'
import { FaPlus, FaEdit} from "react-icons/fa";
import axios from "axios";
import authHeader from "../../services/auth.header";


function ClientAdd() {
  const header = authHeader();
  const [values, setValues] = useState({
      clientName: "",
      clients: []
  });





  return ( 
   <> 
      
    </>
    );
}
export default ClientAdd;