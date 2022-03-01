import React, { useState, useEffect } from "react";
import { Button, useDisclosure, Container } from "@chakra-ui/react";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import { FaTrashAlt } from "react-icons/fa";
import SidebarWithHeader from "../../shared/SidebarProps";
import DataService from "../../services/data.service";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";


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


  const data = values.joblist;
  const columns = [
    {
      name: "Date",
      selector: "dateEntry",
      sortable: true
    },
    {
      name: "Client",
      selector: "client_name",
      sortable: true
    },
    {
      name: "Division",
      selector: "division_name",
      sortable: true
    },
    {
      name: "Address",
      selector: "address",
      sortable: true
    },
    {
      name: "Complaine",
      selector: "natureofcomplain",
      sortable: true
    },
    {
      name: "Total",
      selector: "natureofcomplain",
      sortable: true
    }
    ,
    {
      name: "Actions",
      selector: "natureofcomplain",
      sortable: true
    }
  ]

  const tableData = {
    columns,
    data,
  };
  return (
    <>
      <SidebarWithHeader>
        <Container maxW="container.xl">
          <DataTableExtensions
            {...tableData}>
            <DataTable
              columns={columns}
              data={data}
              noHeader
              defaultSortField="id"
              defaultSortAsc={false}
              pagination
              highlightOnHover
            />
          </DataTableExtensions>
        </Container>
      </SidebarWithHeader>
    </>
  );
}

export default Joblists;
