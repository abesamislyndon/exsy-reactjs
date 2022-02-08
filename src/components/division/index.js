import React, { useState, useEffect } from "react";
import SidebarWithHeader from "../../shared/SidebarProps";
import { Flex, Container, list, Button } from "@chakra-ui/react";
import "rsuite-table/dist/css/rsuite-table.css";
import DivisionList from "./DivisionList";
import DivisionForm from "./DivisionForm";
import DataService from "../../services/data.service";

function Division(props) {
  const [values, setValues] = useState({
    divisions: [],
    id: "",
  });

  useEffect(() => {
    getDivision();
  }, []);

  const getDivision = () => {
    const list = DataService.getAllDivision();
    list.then((response) => {
      setValues({ ...values, divisions: response });
    });
  };

  const deleteDivision = (id) => {
    let confirmDelete = window.confirm("Delete item forever?");
    const Division = DataService;
    if (confirmDelete) {
      Division.deleteDivision(id);
      setTimeout(() => {
        getDivision();
      }, 500);
    }
  };

  return (
    <SidebarWithHeader>
      <Container maxW="container.xl">
        <DivisionForm divlists={getDivision} />
        <DivisionList
          divlists={values.divisions}
          handleDelete={deleteDivision}
        />
      </Container>
    </SidebarWithHeader>
  );
}
export default Division;
