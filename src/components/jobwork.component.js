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
  Button
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
          <Stack spacing={35}>
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
       
            <Heading size="xs">
             NATURAL OF COMPLAINT / FINDING
             </Heading>
             <Divider/>
             <SimpleGrid columns={1} columnGap={3} rowGap={6} w="full">
               <GridItem>
                 <FormControl>
                   <FormLabel>Description of complaine</FormLabel>
                   <Textarea placeholder='Here is a sample placeholder' />
                </FormControl>
               </GridItem>
             </SimpleGrid>
             
             <Heading size="xs">DEFECTS DETECTED</Heading>
             <Divider/>
             <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
              <GridItem>
                <FormControl>
                  <FormLabel>Defect Summary:</FormLabel>
                  <Input name="name" />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl>
                  <FormLabel>Recommendation / Remedial Action:</FormLabel>
                  <Input name="name" />
                </FormControl>
              </GridItem>

              <GridItem>
                 <Button>+</Button>
              </GridItem> 
            </SimpleGrid>


            <Heading size="xs">PARTS TO REPLACED</Heading>
             <Divider/>
             <SimpleGrid columns={5} columnGap={3} rowGap={6} w="full">
              <GridItem>
                <FormControl>
                  <FormLabel>SOR Code:</FormLabel>
                  <Input name="name" />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl>
                  <FormLabel>Quantity:</FormLabel>
                  <Input name="name"  w={12}/>
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
              

              <GridItem>
                 <Button>+</Button>
              </GridItem>
              

            </SimpleGrid>

             <VStack align="end">
               <Button colorScheme="brand">Submit</Button>
             </VStack>


             </Stack>   


        </div>
      </Container>
    </SidebarWithHeader>
  );
}
export default Jobwork;
