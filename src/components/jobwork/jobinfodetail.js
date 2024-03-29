import React, { useEffect, useState, useMemo } from "react";
import "../../assets/css/jobdetail.scss";
import { StageSpinner } from "react-spinners-kit";
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
  FormControl,
  useBreakpointValue,
  Button,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Text,
  Th,
  Td,
  NumberInput,
  NumberInputField,
  Switch,
  Img,
  Checkbox,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import { ErrorMessage } from "@hookform/error-message";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import DataService from "../../services/data.service";
import { useParams, Link } from "react-router-dom";
import { FaRegFilePdf, FaTrash } from "react-icons/fa";
import NumberFormat from "react-number-format";
import SimpleReactLightbox from 'simple-react-lightbox'
import { SRLWrapper } from "simple-react-lightbox";


const Jobinfodetail = (props) => {
  const { id } = useParams();
  const toast = useToast();
  const colSpan = useBreakpointValue({ base: 2, md: 1 });
  const [jobdetail, setJobdetail] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [pdfdetail, setPDF] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const BASE_URL_PHOTO = process.env.REACT_APP_BASE_URL_PHOTO;

  React.useEffect(() => {
    getJobDetail();
  }, []);

  /* const getJobDetail = () => {
    DataService.jobinfo_detail(id).then((response) => {
      setJobdetail(response);
      setPDF(response)
    });
  };
  */

  const getJobDetail = async () => {
    try {
      const resDataService = await DataService.jobinfo_detail(id);
      setJobdetail(resDataService);
    } catch (error) {
      console.log(error);
    } finally {
      setDataLoaded(true);
    }
  };

  useEffect(() => {
    reset(jobdetail);
  }, [jobdetail]);

  const [values, setValues] = useState({
    startDate: new Date(),
    client_name: "",
    client_id: "",
    division_name: "",
    block: "",
    address: "",
    natureofcomplain: "",
    gtotal: "",
    clients: [],
    divisions: [],
    clientBelong: [],
    error: "",
    jobid: id,
    photo_url: "",
    loading: true,
  });

  const [outstand, setOutstand] = useState(jobdetail.status);

  useEffect(() => {
    getClient();
  }, []);

  const getClient = () => {
    DataService.getAllClient().then((response) => {
      setValues({ ...values, clients: response, loading: false });
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
      sorcode: "",
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
    control,
    getValues,
    setValue,
    reset,
    initialState,
  } = useForm();

  const {
    fields: defectsFields,
    append: defectsAppend,
    remove: defectsRemove,
  } = useFieldArray({ control, name: "defect_details" });

  const {
    fields: partsField,
    append: partsAppend,
    remove: partsRemove,
  } = useFieldArray({ control, name: "partsreplaces" });

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
    // console.log(result);
  };

  const [images, setImages] = useState(null);
  const onImageChange = (event) => {
    setImages(event.target.files[0]);
    /*  
     const images = [];
     for (let i = 0; i < event.target.files.length; i++) {
       images.push(event.target.files[i]);
     }
     setImages(images);
     */

    // console.log(images);
  };
  const updateJobinfo = async (event, data) => {
    const defectinfo = getValues("defect_details");
    const partsinfo = getValues("partsreplaces");
    values.gtotal = result;

    try {
      await DataService.updateJobinfo(
        getValues("division_name"),
        getValues("client_name"),
        getValues("startDate"),
        getValues("natureofcomplain"),
        getValues("address"),
        getValues("block"),
        //getValues("gtotal"),
        values.gtotal,
        getValues("status"),
        defectinfo,
        partsinfo,
        images,
        values.jobid
      );
      toast({
        title: `Successfuly Updated Job Work`,
        position: "top-right",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      if (error.response) {
        // console.log(error.response.data);
      }
    }
  };

  const removePartslist = (id) => {
    let confirmDelete = window.confirm(`${values.item}`);
    if (confirmDelete) {
      DataService.removePartslist(id);
      setTimeout(() => {
        getJobDetail();
        updateJobinfo();
      }, 500);
    }
  };

  const removeDefect = (id) => {
    let confirmDelete = window.confirm(`${values.item}`);
    if (confirmDelete) {
      DataService.removeDefect(id);
      setTimeout(() => {
        getJobDetail();
        updateJobinfo();
      }, 500);
    }
  };

  const watchTest = useWatch({
    control,
    name: "partsreplaces",
    defaultValue: parts,
  });

  const subtotalFields = getValues("partsreplaces");
  const result = subtotalFields?.reduce(
    (total, currentValue) =>
      (total = total + parseFloat(currentValue.subtotal)),
    0
  );

  useEffect(() => {
    setValues({ ...values, gtotal: result });
  }, []);

  return (
    <>
      <div className="container">
        <form
          onSubmit={handleSubmit(updateJobinfo)}
          autoComplete="on"
          encType="multipart/form-data"
        >
          <Stack spacing={5}>
            <SimpleGrid columns={3} columnGap={3} rowGap={2} w="full">
              <GridItem>
                <FormControl>
                  <FormLabel>Date:</FormLabel>
                  <Controller
                    control={control}
                    name="startDate"
                    render={({ field }) => (
                      <DatePicker
                        placeholderText={jobdetail.dateentry}
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
              <GridItem></GridItem>
              <GridItem colStart={4}>
                <VStack align="end">
                  <Link to={`/pdf/${id}`} target="_blank" className="pdfIcon">
                    <FaRegFilePdf />
                  </Link>
                </VStack>
                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="email-alerts" mb="0">
                    Work Status
                  </FormLabel>

                  {dataLoaded && (
                    <Switch
                      colorScheme="green"
                      size="lg"
                      {...register("status")}
                      we
                      onChange={(e) =>
                        setValues({ ...values, status: e.target.value })
                      }
                      checked={jobdetail.status === 1}
                    />
                  )}
                  {console.log(jobdetail.status)}
                </FormControl>
              </GridItem>
            </SimpleGrid>

            <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
              <GridItem>
                <FormControl isInvalid={errors.client_name?.message}>
                  <FormLabel>Client:</FormLabel>
                  <Select
                    placeholder="Select option"
                    {...register("client_name")}
                    onChange={getDivBelong("client_name")}
                  >
                    {values.clients?.map((client, i) => {
                      return (
                        <option
                          value={client.client_name}
                          selected={jobdetail.client_name == client.client_name}
                        >
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
                    <option
                      value={jobdetail.division_name}
                      selected={
                        jobdetail.division_name
                      }
                    >
                      {jobdetail.division_name}
                    </option>
                    {values.clientBelong?.map((division, i) => {
                      return (
                        <option
                          value={division.division_name}
                          selected={
                            jobdetail.division_name == division.div_name
                          }
                        >
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
                <FormLabel>Block:</FormLabel>
                <Input
                  {...register("block", { required: "cannot be empty" })}
                  onChange={handleChange("block")}
                />

                <Text
                  as="sup"
                  color="tomato"
                  textAlign={3}
                  className="login-error-msg"
                >
                  <ErrorMessage
                    errors={errors}
                    name="block"
                    render={({ messages }) => {
                      return messages
                        ? Object.entries(messages).map(([type, message]) => (
                          <p key={type}>{message}</p>
                        ))
                        : null;
                    }}
                  />
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

            <Heading size="sm">REMARKS / FINDINGS</Heading>
            <Divider />
            <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
              <GridItem>
                <FormControl isInvalid={errors.natureofcomplain?.message}>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    {...register("natureofcomplain", {
                      required: "cannot be empty",
                    })}
                    onChange={handleChange("natureofcomplain")}
                  />
                </FormControl>
                <Text
                  as="sup"
                  color="tomato"
                  textAlign={3}
                  className="login-error-msg"
                >
                  {errors.natureofcomplain?.message}
                </Text>
              </GridItem>
              <GridItem>
                <SimpleReactLightbox>
                  <SRLWrapper>
                    <a href={`${BASE_URL_PHOTO}${jobdetail.photo_url}`}>
                      <Img src={`${BASE_URL_PHOTO}${jobdetail.photo_url}`}  className="photo"/>
                    </a>
                  </SRLWrapper>
                </SimpleReactLightbox>
                <StageSpinner
                  size={30}
                  color="#75C46B"
                  loading={values.loading}
                />
              </GridItem>
            </SimpleGrid>

            <Heading size="sm">DEFECTS DETECTED</Heading>
            <Divider />
            {defectsFields.map((field, index) => (
              <SimpleGrid
                columns={2}
                columnGap={3}
                rowGap={6}
                w="full"
                key={field.id}
              >
                <GridItem>
                  <FormControl
                    isInvalid={
                      errors?.["defect_details"]?.[index]?.["defects"]?.[
                      "message"
                      ]
                    }
                  >
                    <FormLabel>Defects</FormLabel>
                    <Textarea
                      type="text"
                      {...register(`defect_details[${index}].defects`, {
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
                    {
                      errors?.["defect_details"]?.[index]?.["defects"]?.[
                      "message"
                      ]
                    }
                  </Text>
                </GridItem>
                <GridItem>
                  <FormControl
                    isInvalid={
                      errors?.["defect_details"]?.[index]?.["recommendation"]?.[
                      "message"
                      ]
                    }
                  >
                    <FormLabel>Actions:</FormLabel>
                    <Textarea
                      type="text"
                      {...register(`defect_details[${index}].recommendation`, {
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
                      errors?.["defect_details"]?.[index]?.["recommendation"]?.[
                      "message"
                      ]
                    }
                  </Text>
                  <Button
                    size="xs"
                    rightIcon={<FaTrash />}
                    onClick={() => removeDefect(field.uid)}
                    className="remove-btn"
                  >
                    remove
                  </Button>
                </GridItem>
              </SimpleGrid>
            ))}

            <GridItem>
              <Button onClick={() => defectsAppend({})}>+</Button>
            </GridItem>

            <Heading size="sm">Solutions</Heading>

            <Table size="sm" className="table-custom">
              <Thead>
                <Tr>
                  <Th> SOR Code</Th>
                  <Th width="40%">Item</Th>
                  <Th>Quantity</Th>
                  <Th>Rates</Th>
                  <Th>Sub Total</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {partsField.map((field, index) => {
                  const setTotal = (index, quantity, rates) => {
                    const amount = parseInt(quantity) * parseFloat(rates);
                    setValue(`partsreplaces[${index}].subtotal`, amount);
                  };

                  return (
                    <Tr key={field.id}>
                      <Td>
                        <FormControl
                          isInvalid={
                            errors?.["partsreplaces"]?.[index]?.["sorcode"]?.[
                            "message"
                            ]
                          }
                        >
                          <Input
                            type="text"
                            {...register(`partsreplaces[${index}].sorcode`, {
                              required: "cannot be empty",
                            })}
                            onChange={handleChange("sorcode")}
                          />
                        </FormControl>
                        <Text
                          as="sup"
                          color="tomato"
                          textAlign={3}
                          className="login-error-msg"
                        >
                          {
                            errors?.["partsreplaces"]?.[index]?.["sorcode"]?.[
                            "message"
                            ]
                          }
                        </Text>
                      </Td>

                      <Td>
                        <FormControl
                          isInvalid={
                            errors?.["partsreplaces"]?.[index]?.["item"]?.[
                            "message"
                            ]
                          }
                        >
                          <Textarea
                            {...register(`partsreplaces[${index}].item`, {
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
                            errors?.["partsreplaces"]?.[index]?.["item"]?.[
                            "message"
                            ]
                          }
                        </Text>
                      </Td>

                      <Td>
                        <FormControl
                          isInvalid={
                            errors?.["partsreplaces"]?.[index]?.["quantity"]?.[
                            "message"
                            ]
                          }
                        >
                          <Input
                            type="text"
                            {...register(`partsreplaces[${index}].quantity`, {
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
                            errors?.["partsreplaces"]?.[index]?.["quantity"]?.[
                            "message"
                            ]
                          }
                        </Text>
                      </Td>

                      <Td>
                        <FormControl
                          isInvalid={
                            errors?.["partsreplaces"]?.[index]?.["rates"]?.[
                            "message"
                            ]
                          }
                        >
                          <NumberInput>
                            <NumberInputField
                              type="text"
                              {...register(`partsreplaces[${index}].rates`, {
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
                            errors?.["partsreplaces"]?.[index]?.["rates"]?.[
                            "message"
                            ]
                          }
                        </Text>
                      </Td>

                      <Td>
                        <FormControl
                          isInvalid={
                            errors?.["partsreplaces"]?.[index]?.["subtotal"]?.[
                            "message"
                            ]
                          }
                        >
                          <Input
                            type="text"
                            {...register(`partsreplaces[${index}].subtotal`, {
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
                            errors?.["partsreplaces"]?.[index]?.["subtotal"]?.[
                            "message"
                            ]
                          }
                        </Text>
                      </Td>

                      <Td>
                        <Button
                          size="xs"
                          rightIcon={<FaTrash />}
                          onClick={() => removePartslist(field.uid)}
                          className="remove-btn"
                        >
                          remove
                        </Button>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
            <GridItem>
              <Button onClick={() => partsAppend({})}>+</Button>
            </GridItem>

            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
              <GridItem w="100%" h="10" />
              <GridItem w="100%" h="10" />
              <GridItem w="100%" h="10" />
              <GridItem w="100%" h="10" />
              <GridItem w="100%" h="10">
                <Heading size="md">
                  TOTAL:
                  <NumberFormat
                    value={result}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </Heading>
                <Input
                  value={parseFloat(result)}
                  type="hidden"
                  {...register("gtotal")}
                  onChange={handleChange("gtotal")}
                />
              </GridItem>
            </Grid>

            <VStack align="end">
              <Button colorScheme="brand" type="submit" size="lg">
                Submit
              </Button>
            </VStack>
          </Stack>
        </form>
      </div>
    </>
  );
};

export default Jobinfodetail;