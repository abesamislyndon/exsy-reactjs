import React, { useState } from "react";
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
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import { useForm, useFieldArray } from "react-hook-form";

const Formlist = () => {
  const colSpan = useBreakpointValue({ base: 2, md: 1 });
  const [values, setValues] = useState({
    startDate: new Date(),
    client_id: "",
    division_id: "",
    block: "",
    address: "",
    complain_desc: "",
  });

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
      defects: "",
      recommendation: "",
    },
  ]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
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
  


  const handleChangeDefect = (e, i) => {
    const { name, value } = e.target;
    const list = [...defectlist];
    list[i][name] = value;
    setDefectList(list);
  };

  

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

  return (
    <div className="container">
      <form onSubmit={handleSubmit(console.log)} autoComplete="off">
        <Stack spacing={35}>
          <GridItem>
            <FormControl>
              <FormLabel>Date:</FormLabel>
              <DatePicker
                className="chakra-input"
                selected={values.startDate}
                onChange={(date) => setValues({ ...values, startDate: date })}
              />
            </FormControl>
          </GridItem>

          <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
            <GridItem>
              <FormControl>
                <FormLabel>Client:</FormLabel>
                <Select placeholder="Select option">
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl>
                <FormLabel>Division:</FormLabel>
                <Select placeholder="Select option">
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </FormControl>
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
                  isInvalid= {errors?.['defectslist']?.[index]?.['defects']?.['message']}
                >
                  <FormLabel>Defects</FormLabel>
                  <Textarea
                    type="text"
                    {...register(`defectslist[${index}].defects`, {
                      required: "cannot be empty",
                    })}
                    onChange={(e)=>handleChangeDefect(e,index)}
                  />
                </FormControl>
                <Text
                  as="sup"
                  color="tomato"
                  textAlign={3}
                  className="login-error-msg"
                >
                   {errors?.['defectslist']?.[index]?.['defects']?.['message']}
                </Text>
              </GridItem>
              <GridItem>
                <FormControl
                  isInvalid= {errors?.['defectslist']?.[index]?.['recommendation']?.['message']}
                >
                  <FormLabel>Recommendation / Remedial Action:</FormLabel>
                  <Textarea
                    type="text"
                    {...register(`defectslist[${index}].recommendation`, {
                      required: "cannot be empty",
                    })}
                    onChange={(e)=>handleChangeDefect(e,index)}
                  />
                </FormControl>
                <Text
                  as="sup"
                  color="tomato"
                  textAlign={3}
                  className="login-error-msg"
                >
                  {errors?.['defectslist']?.[index]?.['recommendation']?.['message']}
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
                    isInvalid= {errors?.['partslist']?.[index]?.['sorCode']?.['message']}
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
                   {errors?.['partslist']?.[index]?.['sorCode']?.['message']}
                  </Text>
                </GridItem>

                <GridItem>
                  <FormControl
                    isInvalid={errors?.['partslist']?.[index]?.['quantity']?.['message']}
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
                    {errors?.['partslist']?.[index]?.['quantity']?.['message']}
                  </Text>
                </GridItem>

                <GridItem>
                  <FormControl
                    isInvalid={errors?.['partslist']?.[index]?.['item']?.['message']}
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
                    {errors?.['partslist']?.[index]?.['item']?.['message']}
                  </Text>
                </GridItem>

                <GridItem>
                  <FormControl
                    isInvalid={errors?.['partslist']?.[index]?.['rates']?.['message']}
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
                    {errors?.['partslist']?.[index]?.['rates']?.['message']}
                  </Text>
                </GridItem>

                <GridItem>
                  <FormControl
                    isInvalid={errors?.['partslist']?.[index]?.['subtotal']?.['message']}
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
                   {errors?.['partslist']?.[index]?.['subtotal']?.['message']}
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
