import React, { useState, useEffect } from "react";
import { Button, useDisclosure , Container} from "@chakra-ui/react";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import { FaTrashAlt } from "react-icons/fa";
import SidebarWithHeader from "../../shared/SidebarProps";
import DataService from "../../services/data.service";

function Joblists() {

 const [values, setValues] = useState({
     joblist: []
 });
 
 useEffect(() => {
    getallJoblist();
  }, []);

  const getallJoblist = () => {
    const list = DataService.getAllJobinfo();
    list.then((response) => {
      setValues({ ...values, joblist: response });
    });
    console.log(values.joblist)
  };

  return (
  <>
  <SidebarWithHeader>
    <Container maxW="container.xl">
      <Table height={400} data={values.joblist}>
      <Column width={120} sortable>
          <HeaderCell>Jobwork # </HeaderCell>
          <Cell dataKey="id" />
        </Column>
        <Column width={200} sortable>
          <HeaderCell>Date Entry </HeaderCell>
          <Cell dataKey="dateEntry" />
        </Column>
        <Column width={200} sortable>
          <HeaderCell>ClieNament </HeaderCell>
          <Cell dataKey="client_name" />
        </Column>
        <Column width={190} sortable>
          <HeaderCell>Division Name</HeaderCell>
          <Cell dataKey="division_name" />
        </Column>
        <Column width={90} sortable>
          <HeaderCell>Block</HeaderCell>
          <Cell dataKey="block" />
        </Column>
        <Column width={200} sortable>
          <HeaderCell>Location</HeaderCell>
          <Cell dataKey="address" />
        </Column>
        <Column width={200} sortable>
          <HeaderCell>Total</HeaderCell>
          <Cell dataKey="div_name" />
        </Column>
        <Column width={120} fixed="right">
          <HeaderCell>Action</HeaderCell>
          <Cell>
            {(rowData) => {
              let id = rowData.id;
              return (
                <Button size="sm">
                  {" "}
                  {<FaTrashAlt />}
                </Button>
              );
            }}
          </Cell>
        </Column>
      </Table>
      </Container>
    </SidebarWithHeader>
    </>
  );
}

export default Joblists;
