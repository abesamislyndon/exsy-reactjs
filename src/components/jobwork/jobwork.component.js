import SidebarWithHeader from "../../shared/SidebarProps";
import Formlist from "./formlist";

import {
  Container,
} from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";

function Jobwork() {

  return (
    <SidebarWithHeader>
      <Container maxW="container.xl">
        <Formlist/>
      </Container>
    </SidebarWithHeader>
  );
}
export default Jobwork;
