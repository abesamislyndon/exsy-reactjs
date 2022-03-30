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
  FormLabel,
  Select
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import "rsuite-table/dist/css/rsuite-table.css";
import authHeader from "../../services/auth.header";
import DataService from "../../services/users.service";


function Newuser(props) {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: ""
  });


  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm({ shouldFocusError: false });

  const createUser = async () => {
    try {
      DataService.createUser(values.username, values.email, values.password, values.password_confirmation, values.role);
      onClose();
      reset();
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
        props.divlists();
    }, 500);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} leftIcon={<FaPlus />} size="sm">
        Add User
      </Button>
      <br/><br/>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add User</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(createUser)}  autoComplete="off">
            <ModalBody pb={6}>
            <FormControl isInvalid={errors.username?.message}>
              <FormLabel>Username</FormLabel>
                <Input
                  {...register("username", { required: "cannot be empty" })}
                  onChange={handleChange("username")}
                />
              </FormControl>
              <Text
                as="sup"
                color="tomato"
                textAlign={3}
                className="login-error-msg"
              >
                {errors.username?.message}
              </Text>

              <br/>
              <FormControl isInvalid={errors.email?.message}>
              <FormLabel>email</FormLabel>
                <Input
                  {...register("email", { required: "cannot be empty" })}
                  onChange={handleChange("email")}
                />
              </FormControl>
              <Text
                as="sup"
                color="tomato"
                textAlign={3}
                className="login-error-msg"
              >
                {errors.email?.message}
              </Text>

              <br/>
              <FormControl isInvalid={errors.password?.message}>
              <FormLabel>Password</FormLabel>
                <Input
                 type = "password"
                  {...register("password", { required: "cannot be empty" })}
                  onChange={handleChange("password")}
                />
              </FormControl>
              <Text
                as="sup"
                color="tomato"
                textAlign={3}
                className="login-error-msg"
              >
                {errors.password?.message}
              </Text>
              <br/>
              <FormControl isInvalid={errors.password_confirmation?.message}>
              <FormLabel>Password Confirmation</FormLabel>
                <Input
                 type = "password"
                  {...register("password_confirmation", { required: "cannot be empty" })}
                  onChange={handleChange("password_confirmation")}
                />
              </FormControl>
              <Text
                as="sup"
                color="tomato"
                textAlign={3}
                className="login-error-msg"
              >
                {errors.password_confirmation?.message}
              </Text>

              <br/>
              <FormControl isInvalid={errors.role?.message}>
              <FormLabel>Role:</FormLabel>
              <Select {...register("role")} placeholder="Select option"
               onChange={handleChange("role")}
              >
                <option value ="personnel">Personnel</option>
                <option value ="admin">Admin</option>
                <option value ="superadmin">Super Admin</option>
                </Select>
              </FormControl>
              <Text
                as="sup"
                color="tomato"
                textAlign={3}
                className="login-error-msg"
              >
                {errors.role?.message}
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
export default Newuser;
