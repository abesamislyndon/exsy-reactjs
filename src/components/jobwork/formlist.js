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
    complaine_desc: "",
    total: "",
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
  } = useForm({ shouldFocusError: false });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  /*
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  */

  const handleChange = (e, i) => {
    const { name, value } = e.target;
    const list = [...defectlist];
    list[i][name] = value;
    setDefectList(list);
  };

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
              <FormControl>
                <FormLabel>Block:</FormLabel>
                <Input name="name" />
              </FormControl>
            </GridItem>
            <SimpleGrid columns={1} columnGap={3} rowGap={6} w="full">
              <GridItem>
                <FormControl>
                  <FormLabel>Address:</FormLabel>
                  <Input name="name" w="full" />
                </FormControl>
              </GridItem>
            </SimpleGrid>
          </HStack>

          <Heading size="xs">NATURAL OF COMPLAINT / FINDING</Heading>
          <Divider />
          <SimpleGrid columns={1} columnGap={3} rowGap={6} w="full">
            <GridItem>
              <FormControl>
                <FormLabel>Description of complaine</FormLabel>
                <Textarea />
              </FormControl>
            </GridItem>
          </SimpleGrid>

          <Heading size="xs">DEFECTS DETECTED</Heading>
          <Divider />

          {fields.map(({ id, defects, recommendation }, index) => (
            <div key={id}>
              <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
                <GridItem>
                  <FormControl>
                    <FormLabel>Defects</FormLabel>
                    <input
                      type="text"
                      {...register(`items[${index}].defects`)}
                      defaultValue={defects}
                    />
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl>
                    <FormLabel>Recommendation / Remedial Action:</FormLabel>
                    <input
                      type="text"
                      {...register(`items[${index}].recommendation`)}
                      defaultValue={recommendation}
                    />
                  </FormControl>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="remove-btn"
                  >
                    <span>Remove</span>
                  </button>
                </GridItem>
              </SimpleGrid>
            </div>
          ))}

          <GridItem>
            <Button onClick={() => append({})}>+</Button>
          </GridItem>

          <Heading size="xs">PARTS TO REPLACED</Heading>
          <Divider />
          {parts.map((element, index) => (
            <SimpleGrid
              columns={5}
              columnGap={3}
              rowGap={6}
              w="full"
              key={index}
            >
              <GridItem>
                <FormControl>
                  <FormLabel>SOR Code:</FormLabel>
                  <Input name="name" />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl>
                  <FormLabel>Quantity:</FormLabel>
                  <Input name="name" />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl>
                  <FormLabel>Item</FormLabel>
                  <Input name="name" />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl>
                  <FormLabel>Rates:</FormLabel>
                  <Input name="name" />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl>
                  <FormLabel>Subtotal</FormLabel>
                  <Input name="name" />
                </FormControl>
              </GridItem>
            </SimpleGrid>
          ))}
          <GridItem>
            <Button onClick={() => addPartsReplacedForm()}>+</Button>
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
