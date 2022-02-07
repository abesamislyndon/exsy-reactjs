import React, { useState, useEffect } from "react";
import SidebarWithHeader from "../../shared/SidebarProps";
import { Flex, Container, list, Button } from "@chakra-ui/react";
import "rsuite-table/dist/css/rsuite-table.css";
import DivisionList from "./DivisionList";
import DivisionForm from "./DivisionForm"

function Division() {
  return (
    <SidebarWithHeader>
      <Container maxW="container.xl">
        <DivisionForm/>
       <DivisionList/>
      </Container>
    </SidebarWithHeader>
  );
}
export default Division;
