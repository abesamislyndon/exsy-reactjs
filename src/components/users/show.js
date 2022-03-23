import SidebarWithHeader from "../../shared/SidebarProps";


import {
  Container,
} from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import ShowDetail from "./showdetail";

function Show() {

  return (
    <SidebarWithHeader>
      <Container maxW="container.xl">
        <ShowDetail/>
      </Container>
    </SidebarWithHeader>
  );
}
export default Show;
