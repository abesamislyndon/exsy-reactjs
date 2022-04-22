import React, { useState, useEffect } from "react";
import { StageSpinner } from "react-spinners-kit";
import SidebarWithHeader from "../../shared/SidebarProps";
import {
  Container,
  Grid,
  GridItem,
  Heading,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Stack,
  Text,
  Icon,
  Badge,
  Box,
} from "@chakra-ui/react";
import DataService from "../../services/data.service";
import 'chartkick/chart.js'


function PersonnelDashboard() {

  const [values, setValues] = useState({
    countdone: [],
    countoutstanding: [],
    loading: true
   });
   
   React.useEffect(() => {
    const fetchDetails = async () => {
      try {
        const resDataServicePersonnelOut = await DataService.dashboard_total_count_personnel();
        const resDataServicePersonnelDone = await DataService.dashboard_total_count_done_personnel();
        setValues({countoutstanding: resDataServicePersonnelOut, countdone: resDataServicePersonnelDone, loading: false });
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
  }, []);

  const total_count_outstanding = values.countoutstanding.map((total) => total.count).toString()
  const total_count_done = values.countdone.map((total) => total.count).toString()
  return (
    <SidebarWithHeader>
         <SimpleGrid columns={{ sm: 1, md: 2 }}>
        <Box
          boxShadow="sm"
          p="6"
          rounded="md"
          bg="white"
          height="140px"
          m={2}
          padding="5"
        >
          <StatGroup justifyContent="space-between">
            <Stat>
              <StatLabel>My overall Outstanding Jobwork</StatLabel>
              <StatNumber>
                {total_count_outstanding}
              </StatNumber>
              <StageSpinner  size={30}  color="#75C46B" loading={values.loading}  /> 
            </Stat>
          </StatGroup>
        </Box>

        <Box
          boxShadow="sm"
          p="6"
          rounded="md"
          bg="white"
          height="140px"
          m={2}
          padding="5"
        >
          <StatGroup justifyContent="space-between">
            <Stat>
              <StatLabel>My Overall Done Jobwork</StatLabel>
              <StatNumber>
                {total_count_done}
              </StatNumber>
              <StageSpinner  size={30}  color="#75C46B" loading={values.loading}  /> 
            </Stat>
          </StatGroup>
        </Box>
      </SimpleGrid>
    </SidebarWithHeader>
  );
}
export default PersonnelDashboard;
