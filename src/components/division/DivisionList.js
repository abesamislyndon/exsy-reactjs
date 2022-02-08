import React, { useState, useEffect } from "react";
import { Button, useDisclosure } from "@chakra-ui/react";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import { FaTrashAlt } from "react-icons/fa";

function DivisionList(props) {
  return (
    <>
      <Table height={400} data={props.divlists}>
        <Column width={1010} sortable>
          <HeaderCell>Division Name</HeaderCell>
          <Cell dataKey="div_name" />
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

export default DivisionList;
