import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import SidebarWithHeader from "../../shared/SidebarProps";
import { Button } from "@chakra-ui/react";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import ClientServices from "../../services/data.service";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";

function ClientRow() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        clients: [],
        currentUser: undefined,
    });

    useEffect(() => {
        getClient();
        const user = AuthService.getCurrentUser();

        if (user) {
            setValues({ ...values, currentUser: user });
            // getClient();
        } else {
            navigate("/");
            window.location.reload();
        }
    }, []);

    const getClient = () => {
        const clientList = ClientServices.clientView();
        clientList.then((clients) => {
            setValues({ ...values, clients: clients });
        });
    };

    const deleteClient = (id) => {
        let confirmDelete = window.confirm("Delete item forever?");
        if (confirmDelete) {
            axios
                .delete(`/client/${id}`, {
                    headers: {
                        Authorization:
                            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.8Af5IDvCbhcjU_lU9C-MwoiJRmPU0suHg6smUzsakdg",
                    },
                })
                .then((result) => {
                    getClient();
                });
        }
    };

    return (
        <>
            <Table height={400} data={values.clients}>
                <Column width={1010} sortable>
                    <HeaderCell>First Name</HeaderCell>
                    <Cell dataKey="client_name" />
                </Column>
                <Column width={120} fixed="right">
                    <HeaderCell>Action</HeaderCell>
                    <Cell>
                        {(rowData) => {
                            let id = rowData.id;
                            return (
                                <Button size='sm'
                                    onClick={(e) => {
                                        deleteClient(id);
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
export default ClientRow;
