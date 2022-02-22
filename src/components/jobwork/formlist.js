import React, { useEffect, useState } from "react";
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
  Input,
  Text,
  FormControl,
  useBreakpointValue,
  Button,
  useEventListenerMap,
  useToast,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import DataService from "../../services/data.service";
import {
  FaTrashAlt,
  FaBarcode,
  FaShoppingBasket,
  FaDollarSign,
} from "react-icons/fa";
import { resolveMotionValue } from "framer-motion";

const Formlist = () => {
  const toast = useToast();
  const colSpan = useBreakpointValue({ base: 2, md: 1 });
  const [values, setValues] = useState({
    startDate: new Date(),
    client_name: "",
    division_name: "",
    block: "",
    address: "",
    complain_desc: "",
    clients: [],
    divisions: [],
    clientBelong: [],
    error: ""
  });

  useEffect(() => {
    getClient();
  }, []);

  const getClient = () => {
    DataService.getAllClient().then((response) => {
      setValues({ ...values, clients: response });
    });
  };

  const getDivBelong = (name) => (event) => {
    const divId = event.target.value;
    DataService.divBelong(divId).then((response) => {
      setValues({
        ...values,
        clientBelong: response,
        client_name: event.target.value,
      });
    });
  };

  const [parts, setParts] = useState([
    {
      sorCode: "",
      quantity: "",
      item: "",
      rates: "",
      subtotal: "",
    },
  ]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
    getValues,
    setValue,
  } = useForm({
    shouldFocusError: false,
    defaultValues: {
      defectslist: [{ defects: "", recommendation: "" }],
      partslist: [{ sorCode: "", item: "" , quantity: "", rates: "", subtotal: ""}]
    }

  });

  const {
    fields: defectsFields,
    append: defectsAppend,
    remove: defectsRemove,
  } = useFieldArray({ control, name: "defectslist" });

  const {
    fields: partsField,
    append: partsAppend,
    remove: partsRemove,
  } = useFieldArray({ control, name: "partslist" });

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const handleChangeDefect = (name) => (event) => (index) => {
    setValues({ ...values[index], error: false, [name]: event.target.value });
  };

  const createJobinfo = async (data) => {
    const defectinfo = getValues("defectslist");
    const partsinfo = getValues("partslist");
    try {
      await   DataService.createJobinfo(
        values.division_name,
        values.client_name,
        values.startDate,
        values.complain_desc,
        values.address,
        values.block,
        defectinfo,
        partsinfo
      );
          toast({
            title: `Successfuly added Job Work`,
            position: "top-right",
            status: "success",
            isClosable: true,
          });
          reset();
   
    } catch (error) {
        console.log(error);
    }
  };

  const watchTest = useWatch({
    control,
    name: "partslist",
    defaultValue: parts,
  });

  return (
    <div className="container">
      <form onSubmit={handleSubmit(createJobinfo)} autoComplete="off">
        <Stack spacing={35}>
          <GridItem>
            <FormControl>
              <FormLabel>Date:</FormLabel>
              <Controller
                control={control}
                name="startDate"
                render={({ field }) => (
                  <DatePicker
                  placeholderText="Select date"
                    onChange={(date) => field.onChange(date)}
                    selected={field.value}
                    dateFormat="MM/dd/yy"
                    minDate={new Date()}
                    defaultValue={field.startDate}
                    className="chakra-input"
                  />
                )}
              />
            </FormControl>
          </GridItem>

          <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
            <GridItem>
            <FormControl isInvalid={errors.client_name?.message}>
                <FormLabel>Client:</FormLabel>
                <Select
                  placeholder="Select option"
                  {...register("client_name", {required: 'cannot be empty'})}
                  onChange={getDivBelong("client_name")}
                >
                  {values.clients.map((client, i) => {
                    return (
                      <option key={client.id} value={client.id}>
                        {client.client_name}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
              <Text
                as="sup"
                color="tomato"
                textAlign={3}
                className="login-error-msg"
              >
                {errors.client_name?.message}
              </Text>
            </GridItem>

            <GridItem>
              <FormControl isInvalid={errors.division_name?.message}>
                <FormLabel>Division:</FormLabel>
                <Select
                  placeholder="Select option"
                  {...register("division_name", {required: "cannot be empty"})}
                  onChange={handleChange("division_name")}
                >
                  {values.clientBelong.map((division, i) => {
                    return (
                      <option key={division.id} value={division.id}>
                        {division.div_name}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
              <Text
                as="sup"
                color="tomato"
                textAlign={3}
                className="login-error-msg"
              >
                {errors.division_name?.message}
              </Text>
            </GridItem>
          </SimpleGrid>

          <HStack>
            <GridItem>
              <FormControl isInvalid={errors.block?.message}>
                <FormLabel>Block:</FormLabel>
                <Input
                  {...register("block", { required: "cannot be empty" })}
                  onChange={handleChange("block")}
                />
              </FormControl>
              <Text
                as="sup"
                color="tomato"
                textAlign={3}
                className="login-error-msg"
              >
                {errors.block?.message}
              </Text>
            </GridItem>
            <SimpleGrid columns={1} columnGap={3} rowGap={6} w="full">
              <GridItem>
                <FormControl isInvalid={errors.address?.message}>
                  <FormLabel>Address:</FormLabel>
                  <Input
                    {...register("address", { required: "cannot be empty" })}
                    onChange={handleChange("address")}
                  />
                </FormControl>
                <Text
                  as="sup"
                  color="tomato"
                  textAlign={3}
                  className="login-error-msg"
                >
                  {errors.address?.message}
                </Text>
              </GridItem>
            </SimpleGrid>
          </HStack>

          <Heading size="sm">NATURAL OF COMPLAINT / FINDING</Heading>
          <Divider />
          <SimpleGrid columns={1} columnGap={3} rowGap={6} w="full">
            <GridItem>
              <FormControl isInvalid={errors.complain_desc?.message}>
                <FormLabel>Description of complaine</FormLabel>
                <Textarea
                  {...register("complain_desc", {
                    required: "cannot be empty",
                  })}
                  onChange={handleChange("complain_desc")}
                />
              </FormControl>
              <Text
                as="sup"
                color="tomato"
                textAlign={3}
                className="login-error-msg"
              >
                {errors.complain_desc?.message}
              </Text>
            </GridItem>
          </SimpleGrid>

          <Heading size="sm">DEFECTS DETECTED</Heading>
          <Divider />

          {defectsFields.map(({ id, defects, recommendation }, index) => (
            <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full" key={id}>
              <GridItem>
                <FormControl
                  isInvalid={
                    errors?.["defectslist"]?.[index]?.["defects"]?.["message"]
                  }
                >
                  <FormLabel>Defects</FormLabel>
                  <Textarea
                    type="text"
                    {...register(`defectslist[${index}].defects`, {
                      required: "cannot be empty",
                    })}
                    // onChange={handleChangeDefect("defects")}
                  />
                </FormControl>
                <Text
                  as="sup"
                  color="tomato"
                  textAlign={3}
                  className="login-error-msg"
                >
                  {errors?.["defectslist"]?.[index]?.["defects"]?.["message"]}
                </Text>
              </GridItem>
              <GridItem>
                <FormControl
                  isInvalid={
                    errors?.["defectslist"]?.[index]?.["recommendation"]?.[
                      "message"
                    ]
                  }
                >
                  <FormLabel>Recommendation / Remedial Action:</FormLabel>
                  <Textarea
                    type="text"
                    {...register(`defectslist[${index}].recommendation`, {
                      required: "cannot be empty",
                    })}
                    //onChange={handleChangeDefect("recommendation")}
                  />
                </FormControl>
                <Text
                  as="sup"
                  color="tomato"
                  textAlign={3}
                  className="login-error-msg"
                >
                  {
                    errors?.["defectslist"]?.[index]?.["recommendation"]?.[
                      "message"
                    ]
                  }
                </Text>
                <button
                  type="button"
                  onClick={() => defectsRemove(index)}
                  className="remove-btn"
                >
                  <span>Remove</span>
                </button>
              </GridItem>
            </SimpleGrid>
          ))}

          <GridItem>
            <Button onClick={() => defectsAppend({})}>+</Button>
          </GridItem>

          <Heading size="sm">PARTS TO REPLACED</Heading>

          <Table size="sm">
            <Thead>
              <Tr>
                <Th> SOR Code</Th>
                <Th>
                  <FaShoppingBasket color="gray.500" />
                  Item
                </Th>
                <Th>Quantity</Th>
                <Th>
                  <FaDollarSign color="gray.500" />
                  Rates
                </Th>
                <Th>Sub Total</Th>
              </Tr>
            </Thead>
            <Tbody>
              {partsField.map(
                ({ id, sorCode, quantity, item, rates, subtotal }, index) => {
                  const setTotal = (index, quantity, rates) => {
                    const amount = parseInt(quantity) * parseInt(rates);
                    setValue(`partslist[${index}].subtotal`, amount);
                  };

                  return (
                    <Tr key={id}>
                      <Td>
                        <FormControl
                          isInvalid={
                            errors?.["partslist"]?.[index]?.["sorCode"]?.[
                              "message"
                            ]
                          }
                        >
                          <Input
                            type="text"
                            {...register(`partslist[${index}].sorCode`, {
                              required: "cannot be empty",
                            })}
                            onChange={handleChange("sorCode")}
                          />
                        </FormControl>
                        <Text
                          as="sup"
                          color="tomato"
                          textAlign={3}
                          className="login-error-msg"
                        >
                          {
                            errors?.["partslist"]?.[index]?.["sorCode"]?.[
                              "message"
                            ]
                          }
                        </Text>
                      </Td>

                      <Td>
                        <FormControl
                          isInvalid={
                            errors?.["partslist"]?.[index]?.["item"]?.[
                              "message"
                            ]
                          }
                        >
                          <Input
                            type="text"
                            {...register(`partslist[${index}].item`, {
                              required: "cannot be empty",
                            })}
                            onChange={handleChange("item")}
                          />
                        </FormControl>
                        <Text
                          as="sup"
                          color="tomato"
                          textAlign={3}
                          className="login-error-msg"
                        >
                          {
                            errors?.["partslist"]?.[index]?.["item"]?.[
                              "message"
                            ]
                          }
                        </Text>
                      </Td>

                      <Td>
                        <FormControl
                          isInvalid={
                            errors?.["partslist"]?.[index]?.["quantity"]?.[
                              "message"
                            ]
                          }
                        >
                          <Input
                            type="text"
                            {...register(`partslist[${index}].quantity`, {
                              required: "cannot be empty",
                            })}
                            onChange={(e) => {
                              const quantity = e.target.value;
                              setTotal(index, quantity, watchTest[index].rates);
                              handleChange("quantity");
                            }}
                          />
                        </FormControl>
                        <Text
                          as="sup"
                          color="tomato"
                          textAlign={3}
                          className="login-error-msg"
                        >
                          {
                            errors?.["partslist"]?.[index]?.["quantity"]?.[
                              "message"
                            ]
                          }
                        </Text>
                      </Td>

                      <Td>
                        <FormControl
                          isInvalid={
                            errors?.["partslist"]?.[index]?.["rates"]?.[
                              "message"
                            ]
                          }
                        >
                          <Input
                            {...register(`partslist[${index}].rates`, {
                              required: "cannot be empty",
                            })}
                            onChange={(e) => {
                              const rates = e.target.value;
                              setTotal(index, watchTest[index].quantity, rates);
                              handleChange("rates");
                            }}
                          />
                        </FormControl>
                        <Text
                          as="sup"
                          color="tomato"
                          textAlign={3}
                          className="login-error-msg"
                        >
                          {
                            errors?.["partslist"]?.[index]?.["rates"]?.[
                              "message"
                            ]
                          }
                        </Text>
                      </Td>

                      <Td>
                        <FormControl
                          isInvalid={
                            errors?.["partslist"]?.[index]?.["subtotal"]?.[
                              "message"
                            ]
                          }
                        >
                          <Input
                            type="text"
                            {...register(`partslist[${index}].subtotal`, {required: "cannot be empty"})}
                          />
                        </FormControl>
                        <Text
                          as="sup"
                          color="tomato"
                          textAlign={3}
                          className="login-error-msg"
                        >
                          {
                            errors?.["partslist"]?.[index]?.["subtotal"]?.[
                              "message"
                            ]
                          }
                        </Text>
                      </Td>

                      <Td>
                        <button
                          type="button"
                          onClick={() => partsRemove(index)}
                          className="remove-btn"
                        >
                   
                          <FaTrashAlt color="gray.300" />
                        </button>
                      </Td>
                    </Tr>
                  );
                }
              )}
            </Tbody>
          </Table>
          <GridItem>
            <Button onClick={() => partsAppend({})}>+</Button>
          </GridItem>

          <VStack align="end">
            <Button colorScheme="brand" type="submit">
              Submit
            </Button>
          </VStack>
        </Stack>
      </form>
    </div>
  );
};

export default Formlist;
