import React, { useState } from "react";
import {
  Stack,
  HStack,
  VStack,
  Select,
  Text,
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
import { useForm } from "react-hook-form";

const Formlist = () => {
  const colSpan = useBreakpointValue({ base: 2, md: 1 });
  const [values, setValues] = useState({
    startDate: new Date(),
  });
  const [formValues, setformValues] = useState([
    {
      complain: "",
      recommendation: "",
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
  } = useForm({ shouldFocusError: false });

  const handleChange = (name) => (i, event) => {
    setValues({ ...formValues, error: false, [name]: event.target.value });
  };

  /*
  let handleChange = (name)=>(i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setformValues(newFormValues);
  }
  */

  const addDefectForm = () => {
    setformValues([...formValues, { complain: "", recommenation: "" }]);
  };

  const removeDefectForm = (i) => {
    let newFormVAlues = [...formValues];
    newFormVAlues.splice(i, 1);
    setformValues(newFormVAlues);
  };

  const addPartsReplacedForm = () => {
    setformValues([
      ...formValues,
      { sorCode: "", quantity: "", item: "", rates: "", subtotal: "" },
    ]);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit()}>
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

          {formValues.map((element, index) => (
            <SimpleGrid
              columns={2}
              columnGap={3}
              rowGap={6}
              w="full"
              key={index}
            >
              <GridItem>
                <FormControl>
                  <FormLabel>Recommendation / Remedial Action:</FormLabel>
                  <Textarea
                    {...register(`complain[${index}]`, "cannot be empty")}
                  //  onChange={handleChange("complain")}
                  />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl>
                  <FormLabel>Recommendation / Remedial Action:</FormLabel>
                  <Textarea
                    {...register("recomendation", {
                      required: "cannot be empty",
                    })}
                    onChange={handleChange("recomendation")}
                  />
                </FormControl>
                {index ? (
                  <Button type="button" onClick={() => removeDefectForm(index)}>
                    Remove
                  </Button>
                ) : null}
              </GridItem>
            </SimpleGrid>
          ))}

          <GridItem>
            <Button onClick={() => addDefectForm()}>+</Button>
          </GridItem>

          <Heading size="xs">PARTS TO REPLACED</Heading>
          <Divider />
          {formValues.map((element, index) => (
            <SimpleGrid columns={5} columnGap={3} rowGap={6} w="full" key={index}>
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
                <Button onClick={()=>addPartsReplacedForm()}>+</Button>
              </GridItem>
          <VStack align="end">
            <Button colorScheme="brand">Submit</Button>
          </VStack>
        </Stack>
      </form>
    </div>
  );
};

export default Formlist;
