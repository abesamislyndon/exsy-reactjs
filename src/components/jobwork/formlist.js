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
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import DataService from "../../services/data.service";

const Formlist = () => {
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

  const [defectlist, setDefectList] = useState([
    {
      defects: [],
    },
  ]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
    getValues,
  } = useForm({
    shouldFocusError: false,
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
  /*

  const handleChangeDefect = (e, index) => {
    const clonedData = [...defectlist];
    clonedData[index][e.target.name] = e.target.value;
    setDefectList(clonedData);
}
*/

  /*
  const removeDefectForm = (i) => {
    const list = [...defectlist];
    list.splice(i, 1);
    setDefectList(list);
    reset(list);
  };

  const addDefectForm = () => {
    setDefectList([...defectlist, { defects: "", recommendation: "" }]);
  };


  const addPartsReplacedForm = () => {
    setParts([
      ...parts,
      { sorCode: "", quantity: "", item: "", rates: "", subtotal: "" },
    ]);
  };
*/

  const createJobinfo = async (data) => {
    const defectinfo = getValues("defectslist");
    const partsinfo = getValues("partslist");
    try {
      DataService.createJobinfo(
        values.division_name,
        values.client_name,
        values.startDate,
        values.complain_desc,
        values.address,
        values.block,
        defectinfo,
        partsinfo
      );
      reset();
    } catch (error) {
      console.log(error);
    }
  };

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
                    selected={values.startDate}
                    dateFormat="MM/dd/yy"
                    minDate={new Date()}
                  />
                )}
              />
            </FormControl>
          </GridItem>

          <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
            <GridItem>
              <FormControl>
                <FormLabel>Client:</FormLabel>
                <Select
                  placeholder="Select option"
                  {...register("client_name")}
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
            </GridItem>

            <GridItem>
              <FormControl isInvalid={errors.division_id?.message}>
                <FormLabel>Division:</FormLabel>
                <Select
                  placeholder="Select option"
                  {...register("division_name")}
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
                {errors.division_id?.message}
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

          <Heading size="xs">NATURAL OF COMPLAINT / FINDING</Heading>
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
                  // onChange={handleChange("complain_desc")}
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

          <Heading size="xs">DEFECTS DETECTED</Heading>
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

          <Heading size="xs">PARTS TO REPLACED</Heading>
          <Divider />
          {partsField.map(
            ({ id, sorCode, quantity, item, rates, subtotal }, index) => (
              <SimpleGrid
                columns={5}
                columnGap={3}
                rowGap={6}
                w="full"
                key={id}
              >
                <GridItem>
                  <FormControl
                    isInvalid={
                      errors?.["partslist"]?.[index]?.["sorCode"]?.["message"]
                    }
                  >
                    <FormLabel>SOR Code:</FormLabel>
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
                    {errors?.["partslist"]?.[index]?.["sorCode"]?.["message"]}
                  </Text>
                </GridItem>

                <GridItem>
                  <FormControl
                    isInvalid={
                      errors?.["partslist"]?.[index]?.["quantity"]?.["message"]
                    }
                  >
                    <FormLabel>Quantity:</FormLabel>
                    <Input
                      type="text"
                      {...register(`partslist[${index}].quantity`, {
                        required: "cannot be empty",
                      })}
                      onChange={handleChange("quantity")}
                    />
                  </FormControl>
                  <Text
                    as="sup"
                    color="tomato"
                    textAlign={3}
                    className="login-error-msg"
                  >
                    {errors?.["partslist"]?.[index]?.["quantity"]?.["message"]}
                  </Text>
                </GridItem>

                <GridItem>
                  <FormControl
                    isInvalid={
                      errors?.["partslist"]?.[index]?.["item"]?.["message"]
                    }
                  >
                    <FormLabel>Item</FormLabel>
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
                    {errors?.["partslist"]?.[index]?.["item"]?.["message"]}
                  </Text>
                </GridItem>

                <GridItem>
                  <FormControl
                    isInvalid={
                      errors?.["partslist"]?.[index]?.["rates"]?.["message"]
                    }
                  >
                    <FormLabel>Rates:</FormLabel>
                    <Input
                      type="text"
                      {...register(`partslist[${index}].rates`, {
                        required: "cannot be empty",
                      })}
                      onChange={handleChange("rates")}
                    />
                  </FormControl>
                  <Text
                    as="sup"
                    color="tomato"
                    textAlign={3}
                    className="login-error-msg"
                  >
                    {errors?.["partslist"]?.[index]?.["rates"]?.["message"]}
                  </Text>
                </GridItem>

                <GridItem>
                  <FormControl
                    isInvalid={
                      errors?.["partslist"]?.[index]?.["subtotal"]?.["message"]
                    }
                  >
                    <FormLabel>Subtotal</FormLabel>
                    <Input
                      type="text"
                      {...register(`partslist[${index}].subtotal`, {
                        required: "cannot be empty",
                      })}
                      onChange={handleChange("subtotal")}
                    />
                  </FormControl>
                  <Text
                    as="sup"
                    color="tomato"
                    textAlign={3}
                    className="login-error-msg"
                  >
                    {errors?.["partslist"]?.[index]?.["subtotal"]?.["message"]}
                  </Text>
                  <button
                    type="button"
                    onClick={() => partsRemove(index)}
                    className="remove-btn"
                  >
                    <span>Remove</span>
                  </button>
                </GridItem>
              </SimpleGrid>
            )
          )}
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
