import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  FormLabel,
  Select
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import "rsuite-table/dist/css/rsuite-table.css";
import authHeader from "../../services/auth.header";
import DataService from "../../services/data.service";
import DivisionList from "./DivisionList";


function DivisionForm() {
  const [values, setValues] = useState({
    clients: [],
    divisions: [],
    clientName: "",
    divisionName: "",
    divShort: "",
    clientId: ""
  });

  useEffect(() => { 
     getClient();
    reset(values.clientName);
  }, []);

  const getClient = () => {
    DataService.getAllClient().then((response)=>{
      setValues({ ...values, clients: response});
    })
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

  const createDivision = async () => {
    try {
      DataService.CreateDivision(values.clientId, values.divisionName, values.divShort);
      onClose();
      reset();

    } catch (error) {
      console.log(error);
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} leftIcon={<FaPlus />} size="sm">
        New Division
      </Button>
      <br/><br/>
{console.log(values)}
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Division</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(createDivision)}>
            <ModalBody pb={6}>
              <FormControl isInvalid={errors.clientName?.message}>
              <FormLabel>Client:</FormLabel>
              <Select {...register("clientId")} placeholder="Select option"
               onChange={handleChange("clientId")}
              >
                    {values.clients.map((client, i)=>{
                        return(
                            <option key={client.id} value={client.id}>{client.client_name}</option>
                        )
                    })}
                </Select>
              </FormControl>
              <Text
                as="sup"
                color="tomato"
                textAlign={3}
                className="login-error-msg"
              >
                {errors.clientId?.message}
              </Text>

              <FormControl isInvalid={errors.clientName?.message}>
              <FormLabel>Division Name:</FormLabel>
                <Input
                  {...register("divisionName", { required: "cannot be empty" })}
                  onChange={handleChange("divisionName")}
                />
              </FormControl>
              <Text
                as="sup"
                color="tomato"
                textAlign={3}
                className="login-error-msg"
              >
                {errors.divisionName?.message}
              </Text>
              <FormControl isInvalid={errors.clientName?.message}>
              <FormLabel>Division Short Name:</FormLabel>
                <Input
                  {...register("divShort", { required: "cannot be empty" })}
                  onChange={handleChange("divShort")}
                />
              </FormControl>
              <Text
                as="sup"
                color="tomato"
                textAlign={3}
                className="login-error-msg"
              >
                {errors.divShort?.message}
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
export default DivisionForm;
