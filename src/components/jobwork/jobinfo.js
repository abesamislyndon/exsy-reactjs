import React from 'react';
import SidebarWithHeader from "../../shared/SidebarProps";
import Form from "./form";

import {
  Container,
} from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import Jobinfodetail from "./jobinfodetail";

function Jobwork() {

  return (
    <SidebarWithHeader>
      <Container maxW="container.xl">
        <Jobinfodetail/>
      </Container>
    </SidebarWithHeader>
  );
}
export default Jobwork;
