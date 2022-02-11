import React, { useState, useEffect } from "react";
import SidebarWithHeader from "../../shared/SidebarProps";
import { Flex, Container, list, Button } from "@chakra-ui/react";
import "rsuite-table/dist/css/rsuite-table.css";
import ClientList from "./ClientList";
import ClientForm from "./ClientForm";
import DataService from "../../services/data.service";

function Client() {

  const [values, setValues] = useState({
      clients: [],
      id: ""
  });

  useEffect(()=>{
    getClient();
  },[]);


  const getClient = () =>{
      const list = DataService.getAllClient();
      list.then((response)=>{
          setValues({...values, clients: response});
      });    
  }

  const deleteClient = (id) =>{
    let confirmDelete = window.confirm("Delete Client Forever?");
    const Client = DataService;
    if(confirmDelete){
        Client.DeleteClient(id);
        setTimeout(()=>{
          getClient();
        }, 500);
    }
  }

  return (
    <SidebarWithHeader>
      <Container maxW="container.xl">
        <ClientForm clientlist = {getClient} />
        <ClientList clientlist = {values.clients} handleDelete={deleteClient}/>
      </Container>
    </SidebarWithHeader>
  );
}
export default Client;
