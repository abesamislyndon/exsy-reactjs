import React, { useEffect, useState, useMemo } from "react";
import {
  Stack,
  HStack,
  VStack,
  Select,
  Heading,
  Textarea,
  Divider,
  FormLabel,
  SimpleGrid,
  GridItem,
  Grid,
  Input,
  Text,
  FormControl,
  useBreakpointValue,
  Button,
  useToast,
  Badge
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import { ErrorMessage } from "@hookform/error-message";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import DataService from "../../services/users.service";
import { useParams } from "react-router-dom";

const ShowDetail = () => {
  const { id } = useParams();
  const toast = useToast();
  const colSpan = useBreakpointValue({ base: 2, md: 1 });
  const [userdetail, setUserdetail] = useState([]);

  useEffect(() => {
    DataService.userDetail(id).then((response) => {
      setUserdetail(response);
    });
  }, []);

  useEffect(() => {
    reset(userdetail);
  }, [userdetail]);

  const [values, setValues] = useState({
    email: "",
    role: "",
    username: "",
    userid: id,
    error: "",
    password: "",
    password_confirmation: ""
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    getValues,
    setValue,
    reset,
    initialState,
  } = useForm();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
    // console.log(result);
  };

  const updateuser = async (event, data) => {

    if (values.password !== values.password_confirmation) {
      toast({
        title: `Password Don't Match`,
        position: "top-right",
        status: "error",
        isClosable: true,
      });
    } else {
      try {
        await DataService.updateUser(
          getValues("email"),
          getValues("role"),
          getValues("username"),
          getValues("password"),
          getValues("password_confirmation"),
          values.userid
        );

        toast({
          title: `Successfully Updated`,
          position: "top-right",
          status: "success",
          isClosable: true,
        });
      } catch (error) {
        if (error.response) {
          alert('asd')
        }
      }
    }


  };


  return (
    <div className="container">
      <form
        onSubmit={handleSubmit(updateuser)}
        autoComplete="on"
        encType="multipart/form-data"
      >
        <Stack spacing={5}>
          <SimpleGrid columns={3} columnGap={3} rowGap={6} w="full">

            <GridItem>
              <FormControl isInvalid={errors.role?.message}>
                <FormLabel>Role:</FormLabel>
                <Select
                  placeholder="Select option"
                  {...register("role", {
                    required: "cannot be empty",
                  })}
                  onChange={handleChange("division_name")}
                >
                  <option selected value={userdetail.role}>
                    {userdetail.role}
                  </option>

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
            </GridItem>

            <GridItem>
              <FormControl isInvalid={errors.email?.message}>
                <FormLabel>Email:</FormLabel>
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
            </GridItem>

            <GridItem>
              <FormControl isInvalid={errors.username?.message}>
                <FormLabel>Username:</FormLabel>
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
            </GridItem>
          </SimpleGrid>
          <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
            <GridItem>
              <Badge variant='solid' colorScheme='orange'>
                Leave Blank if you dont want to change password
              </Badge>
            </GridItem>
          </SimpleGrid>
          <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
            <GridItem>
              <FormLabel>Password:</FormLabel>
              <Input
                type="password"
                {...register("password")}
                onChange={handleChange("password")}
              />
            </GridItem>
            <GridItem>
              <FormLabel>Password Confirmation:</FormLabel>
              <Input
                type="password"
                {...register("password_confirmation")}
                onChange={handleChange("password_confirmation")}
              />
            </GridItem>
          </SimpleGrid>
          <VStack align="end">
            <Button colorScheme="brand" type="submit" size="lg">
              Update
            </Button>
          </VStack>
        </Stack>
      </form>
    </div>
  );
};

export default ShowDetail;
