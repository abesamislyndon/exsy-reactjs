import React, { useState, useEffect } from "react";
import SidebarWithHeader from "../shared/SidebarProps";
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
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import DataService from "../services/data.service";
import ChartService from "../services/chart.services";
import NumberFormat from "react-number-format";
import { LineChart, PieChart, BarChart, AreaChart } from 'react-chartkick'
import 'chartkick/chart.js'

function Dashboard() {
  const [values, setValues] = useState({
    total: [],
    outstanding: []
   });
   
   React.useEffect(() => {
    const fetchDetails = async () => {
      try {
        const resDataService = await DataService.dashboard_total_Amount();
        const resChartService = await ChartService.Outstanding();
        setValues({ outstanding: resChartService, total: resDataService });
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
  }, []);

  const total_amount = values.total.map((total) => total.total_amount).toString()

  return (
    <SidebarWithHeader>
      <SimpleGrid columns={{ sm: 1, md: 2 }}>
        <Box boxShadow="sm" p="6" rounded="md" bg="white" height="auto" m={2}>
          <BarChart data={values.outstanding} colors = {[["#63b598", "#ce7d78", "#ea9e70", "#a48a9e", "#c6e1e8"]]} pointWidth = {92}/>
        </Box>
        <Box boxShadow="sm" p="6" rounded="m" bg="white" height="auto" m={2}>
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
              <StatLabel>Total Amount Jobwork</StatLabel>
              <StatNumber>
                {total_amount != "" ? (
                  <NumberFormat value={total_amount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                ) : "$0.00"}
              </StatNumber>
            </Stat>

            <Stat>
              <StatLabel>Overall Outstanding Jobwork</StatLabel>
              <StatNumber>
                {values.total.map((total) => total.total_outstanding)}
              </StatNumber>
            </Stat>
          </StatGroup>
        </Box>
      </SimpleGrid>
    </SidebarWithHeader>
  );
}
export default Dashboard;
