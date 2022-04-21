import React, { useState, useEffect, useMemo } from "react";
import { Button, useDisclosure, Container, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import SidebarWithHeader from "../../../../shared/SidebarProps";
import DataService from "../../../../services/data.service";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

function Completed() {
  const [values, setValues] = useState({
    joblist: [],
  });

  useEffect(() => {
    getallJoblist();
  }, []);

  const getallJoblist = () => {
    const list = DataService.Outstanding_jobwork_personnel();
    list.then((response) => {
      setValues({ ...values, joblist: response });
    });
    console.log(values.joblist);
  };

  const data = values.joblist;
  const columns = useMemo(
    () => [
      {
        name: "JW ID",
        selector: (row) => row.id,
        sortable: true,
        width: "8rem",
      },
      {
        name: "DATE",
        selector: (row) => row.dateEntry,
        sortable: true,
      },
      {
        name: "CLIENT",
        selector: (row) => row.client_name,
        sortable: true,
      },
      {
        name: "DIVISION",
        selector: (row) => row.division_name,
        sortable: true,
      },
      {
        name: "ADDRESS",
        selector: (row) => row.address,
        sortable: true,
      },
      {
        name: "COMPLAIN",
        selector: (row) => row.natureofcomplain,
        sortable: true,
      },
      {
        cell: (data) => (
          <Link to={`/personneljobinfo/${data.id}`}>
            <Button leftIcon={<FaEdit />} size="xs">
              view
            </Button>
          </Link>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
    ],
    []
  );

  const tableData = {
    columns,
    data,
  };
  return (
    <>
    <SidebarWithHeader>
        <Container maxW="container.xl">
        <Heading size="md">
            Outstanding Job Work
          </Heading>
          <br/>
          <DataTableExtensions {...tableData}>
            <DataTable
              columns={columns}
              data={data}
              noHeader
              defaultSortField="id"
              defaultSortAsc={true}
              pagination
              highlightOnHovers
              fixedHeader
              fixedHeaderScrollHeight="900px"
            />
          </DataTableExtensions>
        </Container>
        </SidebarWithHeader>        
    </>
  );
}

export default Completed;
