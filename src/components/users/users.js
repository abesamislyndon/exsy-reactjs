import SidebarWithHeader from "../../shared/SidebarProps";
import Userlist from "./userslist";

import {
  Container,
} from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";

function Users() {

  return (
    <SidebarWithHeader>
      <Container maxW="container.xl">
        <Userlist/>
      </Container>
    </SidebarWithHeader>
  );
}


export default Users;
