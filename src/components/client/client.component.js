import React, { useState, useEffect } from "react";
import SidebarWithHeader from "../../shared/SidebarProps";
import { Flex, Container, list, Button } from "@chakra-ui/react";
import "rsuite-table/dist/css/rsuite-table.css";
import ClientRow from "./ClientRow";

function Client() {
  return (
    <SidebarWithHeader>
      <Container maxW="container.xl">
        <ClientRow />
      </Container>
    </SidebarWithHeader>
  );
}
export default Client;
