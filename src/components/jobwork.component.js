import React, { useState } from "react";
import SidebarWithHeader from "../shared/SidebarProps";

import {
  Container,
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
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Jobwork() {
  const [startDate, setStartDate] = useState(new Date());
  const colSpan = useBreakpointValue({ base: 2, md: 1 });
  return (
    <SidebarWithHeader>
      <Container maxW="container.xl">
        <div className="container">
          <Stack spacing={5}>
            <GridItem>
              <FormControl>
                <FormLabel>Date:</FormLabel>
                <DatePicker
                  className="chakra-input"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </FormControl>
            </GridItem>

            <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
              <GridItem>
                <FormControl>
                  <FormLabel>Client:</FormLabel>
                  <Input name="name" />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl>
                  <FormLabel>Division:</FormLabel>
                  <Input name="name" />
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
            <Divider />
          </Stack>
        </div>
      </Container>
    </SidebarWithHeader>
  );
}
export default Jobwork;
