import React, { useState, useEffect, useMemo } from "react";
import { Button, useDisclosure, Container, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";


function Reportresult(props) {
    const [valuesquery, setValuesQuery] = useState([]);
    const data = props.queryresult
    const columns = useMemo(
        () => [

            {
                name: "CLIENT",
                selector: (row) => row.client,
                sortable: true,
            },
            {
                name: "DIVISION",
                selector: (row) => row.division,
                sortable: true,
            },
            {
                name: "ADDRESS",
                selector: (row) => row.address,
                sortable: true,
            },
            {
                name: "COMPLAIN",
                selector: (row) => row.complain,
                sortable: true,
            },
            {
                name: "TOTAL",
                selector: (row) => row.total,
                sortable: true,
            }
        ],
        []
    );

    const tableData = {
        columns,
        data,
    };
    return (
        <>
            <br />
            <DataTableExtensions {...tableData}>
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
        </>
    );
}

export default Reportresult;
