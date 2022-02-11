import React, { useState, useEffect } from "react";
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
import "rsuite-table/dist/css/rsuite-table.css";
import DataService from "../../services/data.service";


function ClientForm(props) {
  const [values, setValues] = useState({
    clientName: "",
  });

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
      DataService.CreateClient(values.clientName);
      onClose();
      reset();
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      props.clientlist();
    }, 500);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} leftIcon={<FaPlus />} size="sm">
        New Client
      </Button>
      <br /> <br />
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Client</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(createClient)}  autoComplete="off">
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
export default ClientForm;
