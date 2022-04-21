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
  Grid,
  Input,
  Text,
  FormControl,
  useBreakpointValue,
  Button,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import DataService from "../../../services/data.service";
import { FaTrashAlt, FaImages } from "react-icons/fa";
import NumberFormat from "react-number-format";

const Contractoradminform = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const toast = useToast();
  const colSpan = useBreakpointValue({ base: 2, md: 1 });
  const [values, setValues] = useState({
    startDate: new Date(),
    client_name: "",
    division_name: "",
    block: "",
    address: "",
    complain_desc: "",
    gtotal: "",
    status: 0,
    clients: [],
    divisions: [],
    clientBelong: [],
    error: "",
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
      quantity: 0,
      item: "",
      rates: 0.0,
      subtotal: 0.0,
    },
  ]);

  const [gtotal, setGtotal] = useState("");

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
      defectslist: [{ defects: "", recommendation: "", photo: "" }],
      partslist: [
        { sorCode: "", item: "", quantity: "", rates: 0.0, subtotal: 0.0 },
      ],
    },
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
    console.log(result);
  };

  const [images, setImages] = useState(null);
  const [imagesPreview, setimagesPreview] = useState(null);
  const onImageChange = (event) => {
    setImages(event.target.files[0]);
    setimagesPreview(URL.createObjectURL(event.target.files[0]));
    /*  
   const images = [];
   for (let i = 0; i < event.target.files.length; i++) {
     images.push(event.target.files[i]);
   }
   setImages(images);
   */

    console.log(images);
  };

  const createJobinfo = async (event, data) => {
    const defectinfo = getValues("defectslist");
    const partsinfo = getValues("partslist");
    values.gtotal = result;

    try {
      await DataService.createJobinfo(
        values.division_name,
        values.client_name,
        values.startDate,
        values.complain_desc,
        values.address,
        values.block,
        values.gtotal,
        values.status,
        defectinfo,
        partsinfo,
        images
      );
      toast({
        title: `Successfuly added Job Work`,
        position: "top-right",
        status: "success",
        isClosable: true,
      });
      reset();
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    }

    setimagesPreview(null);
  };

  const watchTest = useWatch({
    control,
    name: "partslist",
    defaultValue: parts,
  });

  const subtotalFields = getValues("partslist");
  const result = subtotalFields.reduce(
    (total, currentValue) => (total = total + currentValue.subtotal),
    0
  );

  useEffect(() => {
    setValues({ ...values, gtotal: result });
  }, []);

  return (
    <div className="container">
      <form
        onSubmit={handleSubmit(createJobinfo)}
        autoComplete="off"
        encType="multipart/form-data"
      >
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
                  {...register("client_name", { required: "cannot be empty" })}
                  onChange={getDivBelong("client_name")}
                >
                  {values?.clients.map((client, i) => {
                    return (
                      <option key={client?.id} value={client?.client_name}>
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
                  {...register("division_name", {
                    required: "cannot be empty",
                  })}
                  onChange={handleChange("division_name")}
                >
                  {values.clientBelong.map((division, i) => {
                    return (
                      <option key={division.id} value={division.division_name}>
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
          <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
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
            <GridItem>
              <label className="custom-file-upload">
                <Input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => onImageChange(e)}
                />
                Attach Photo
              </label>

              <img src={imagesPreview} className="imgpreview" />
            </GridItem>
          </SimpleGrid>

          <Heading size="sm">DEFECTS DETECTED</Heading>
          <Divider />

          {defectsFields.map(
            ({ id, defects, recommendation, photo }, index) => (
              <SimpleGrid
                columns={2}
                columnGap={3}
                rowGap={6}
                w="full"
                key={id}
              >
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

                  <Button
                    size="xs"
                    rightIcon={<FaTrashAlt />}
                    onClick={() => defectsRemove(index)}
                    className="remove-btn"
                  >
                    remove
                  </Button>
                </GridItem>
              </SimpleGrid>
            )
          )}

          <GridItem>
            <Button onClick={() => defectsAppend({})}>+</Button>
          </GridItem>

          <Heading size="sm">PARTS TO REPLACED</Heading>
          <Table size="sm" className="table-custom">
            <Thead>
              <Tr>
                <Th> SOR Code</Th>
                <Th>Item</Th>
                <Th>Quantity</Th>
                {user.user.role === "towncouncilAdmin" || "superadmin" ? (
                  <>
                    <Th>Rates</Th>
                    <Th>Sub Total</Th>
                    <Th>Action</Th>
                  </>
                ) : (
                  ""
                )}
              </Tr>
            </Thead>
            <Tbody>
              {partsField.map(
                ({ id, sorCode, quantity, item, rates, subtotal }, index) => {
                  const setTotal = (index, quantity, rates) => {
                    const amount = parseInt(quantity) * parseFloat(rates);
                    setValue(
                      `partslist[${index}].subtotal`,
                      parseFloat(amount)
                    );
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
                      {user.user.role === "towncouncilAdmin" ||
                      user.user.role === "superadmin" ? (
                        <>
                          <Td>
                            <FormControl
                              isInvalid={
                                errors?.["partslist"]?.[index]?.["rates"]?.[
                                  "message"
                                ]
                              }
                            >
                              <NumberInput>
                                <NumberInputField
                                  precision={2}
                                  type="text"
                                  {...register(`partslist[${index}].rates`, {
                                    required: "cannot be empty",
                                  })}
                                  onChange={(e) => {
                                    const rates = e.target.value;
                                    setTotal(
                                      index,
                                      watchTest[index].quantity,
                                      rates
                                    );
                                    handleChange("rates");
                                  }}
                                />
                              </NumberInput>
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
                                {...register(`partslist[${index}].subtotal`, {
                                  required: "cannot be empty",
                                })}
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
                        </>
                      ) : (
                        <>
                          <NumberInput>
                            <NumberInputField
                              precision={2}
                              type="text"
                              {...register(`partslist[${index}].rates`)}
                              onChange={(e) => {
                                const rates = e.target.value;
                                setTotal(
                                  index,
                                  watchTest[index].quantity,
                                  rates
                                );
                                handleChange("rates");
                              }}
                            />
                          </NumberInput>

                          <Input
                            type="hidden"
                            {...register(`partslist[${index}].subtotal`, {
                              required: "cannot be empty",
                            })}
                          />
                        </>
                      )}

                      <Td>
                        <Button
                          size="xs"
                          rightIcon={<FaTrashAlt />}
                          onClick={() => partsRemove(index)}
                          className="remove-btn"
                        >
                          remove
                        </Button>
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
          <Grid templateColumns="repeat(5, 1fr)" gap={1}>
            <GridItem w="100%" h="10" />
            <GridItem w="100%" h="10" />
            <GridItem w="100%" h="10" />
            <GridItem w="100%" h="10" />
            <GridItem w="100%" h="10">
              <Heading size="md">
                TOTAL:{" "}
                <NumberFormat
                  value={result}
                  displayType={"text"}
                  thousandsGroupStyle="thousand"
                  decimalsScale="2"
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </Heading>
              <Input
                type="hidden"
                value={result}
                {...register("gtotal")}
                onChange={handleChange("gtotal")}
              />
              <Input
                type="hidden"
                defaultValue={values.status}
                {...register("status")}
                onChange={handleChange("status")}
              />
            </GridItem>
          </Grid>

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

export default Contractoradminform;
