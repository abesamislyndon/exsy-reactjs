import React from "react";
import { Button, useDisclosure } from "@chakra-ui/react";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import { FaTrashAlt } from "react-icons/fa";

function ClientList(props) {
  return (
    <>
      <Table height={400} data={props.clientlist}>
        <Column width={1010} sortable>
          <HeaderCell>Client Name</HeaderCell>
          <Cell dataKey="client_name" />
        </Column>
        <Column width={120} fixed="right">
          <HeaderCell>Action</HeaderCell>
          <Cell>
            {(rowData) => {
              let id = rowData.id;
              return (
                <Button
                  size="sm"
                  onClick={(e) => {
                    props.handleDelete(rowData.id);
                  }}
                >
                  {" "}
                  {<FaTrashAlt />}
                </Button>
              );
            }}
          </Cell>
        </Column>
        <Column width={120} fixed="right">
          <HeaderCell>Action</HeaderCell>
          <Cell>
            {(rowData) => {
              let id = rowData.id;
              return (
                <Button
                  size="sm"
                  onClick={(e) => {
                    props.handleDelete(rowData.id);
                  }}
                >
                  {" "}
                  {<FaTrashAlt />}
                </Button>
              );
            }}
          </Cell>
        </Column>
      </Table>
    </>
  );
}
export default ClientList;
