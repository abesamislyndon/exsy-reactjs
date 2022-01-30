import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import {
  Button,
  CircularProgress,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Text,
  FormControl,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import ClientServices from "../../services/data.service";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import authHeader from "../../services/auth.header";

function ClientRow() {
  const header = authHeader();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    clients: [],
    clientName: "",
  });

  useEffect(() => {
    getClient();
    reset(values.clientName);
  }, []);

  const getClient = () => {
    axios.get(`/client`, { headers: header }).then((response) => {
      setValues({ ...values, clients: response.data });
    });
  };

  const deleteClient = (id) => {
    let confirmDelete = window.confirm("Delete item forever?");
    if (confirmDelete) {
      axios.delete(`/client/${id}`, { headers: header }).then((result) => {
        getClient();
      });
    }
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ shouldFocusError: false });

  const createClient = async () => {
    try {
      ClientServices.CreateClient(values.clientName);
      onClose();
      reset();
      getClient();
    } catch (error) {
      console.log(error);
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} leftIcon={<FaPlus />} size="sm">
        New Client
      </Button>
      <br /> <br />
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
                <Button
                  size="sm"
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
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Client</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(createClient)}>
            <ModalBody pb={6}>
              <FormControl isInvalid={errors.clientName?.message}>
                <Input
                  {...register("clientName", { required: "cannot be empty" })}
                  onChange={handleChange("clientName")}
                />
              </FormControl>
              <Text
                as="sup"
                color="tomato"
                textAlign={3}
                className="login-error-msg"
              >
                {errors.clientName?.message}
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" mr={3}>
                {values.isLoading ? (
                  <CircularProgress isIndeterminate size="24px" color="brand" />
                ) : (
                  "Submit"
                )}
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
export default ClientRow;
