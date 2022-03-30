import SidebarWithHeader from "../../shared/SidebarProps";
import Userlist from "./userslist";

import {
  Container,
} from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import Newuser from "./newuser";

function Users() {

  return (
    <SidebarWithHeader>
      <Container maxW="container.xl">
        <Newuser/>
        <Userlist/>
      </Container>
    </SidebarWithHeader>
  );
}


export default Users;
