import React, { useState, useEffect, useMemo } from "react";
import { Button, useDisclosure, Container, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "rsuite-table/dist/css/rsuite-table.css";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import DataService from "../../services/users.service";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

function Userlist() {
  const [values, setValues] = useState({
    userslist: [],
  });

  useEffect(() => {
    getallUsers();
  }, []);

  const getallUsers = () => {
    const list = DataService.getAllUsers();
    list.then((response) => {
      setValues({ ...values, userslist: response });
    });
  };

  const data = values.userslist;
  const columns = useMemo(
    () => [
      {
        name: "ID",
        selector: (row) => row.id,
        sortable: true,
        width: "8rem",
      },
      {
        name: "Email",
        selector: (row) => row.email,
        sortable: true,
      },
      {
        name: "Role",
        selector: (row) => row.role,
        sortable: true,
      },
      {
        name: "Username",
        selector: (row) => row.username,
        sortable: true,
      },
      {
        name: "Created",
        selector: (row) => row.created_at,
        sortable: true,
      },
      {
        name: "Last Update",
        selector: (row) => row.updated_at,
        sortable: true,
      },
      {
        cell: (data) => (
          <Link to={`/user/${data.id}`}>
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
        <Container maxW="container.xl">
        <Heading size="md">
           Users List
          </Heading>
          <br/>
          <DataTableExtensions {...tableData}>
            <DataTable
              columns={columns}
              data={data}
              noHeader
              defaultSortField="id"
              defaultSortAsc={false}
              pagination
              highlightOnHovers
            />
          </DataTableExtensions>
        </Container>
    </>
  );
}

export default Userlist;
