import React, { useState, useEffect } from "react";
import { Button, useDisclosure } from "@chakra-ui/react";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import authHeader from "../../services/auth.header";
import DataService from "../../services/data.service";

function DivisionList() {
  const header = authHeader();

  const [values, setValues] = useState({
    divisions: [],
    clientName: "",
    divisionName: "",
    divShort: "",
    clientId: "",
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
      Division.deleteDivision(id).then((response) => {
        getDivision();
      });
    }
  };

  return (
    <>
      <Table height={400} data={values.divisions}>
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
                    deleteDivision(id);
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
