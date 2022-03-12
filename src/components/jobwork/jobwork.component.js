import SidebarWithHeader from "../../shared/SidebarProps";
import Form from "./form";

import {
  Container,
} from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";

function Jobwork() {

  return (
    <SidebarWithHeader>
      <Container maxW="container.xl">
        <Form/>
      </Container>
    </SidebarWithHeader>
  );
}
export default Jobwork;
