import React, { useState, useEffect } from "react";
import { StageSpinner } from "react-spinners-kit";
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
import { LineChart, PieChart, BarChart, ColumnChart, AreaChart } from 'react-chartkick'
import 'chartkick/chart.js'

function Dashboard() {
  const [values, setValues] = useState({
    total: [],
    outstanding: [],
    count: [],
    loading: true
   });
   
   React.useEffect(() => {
    const fetchDetails = async () => {
      try {
        const resDataService = await DataService.dashboard_total_Amount();
        const resChartService = await ChartService.Outstanding();
        const resChartServicecount = await ChartService.Outstandingcount();
        setValues({ outstanding: resChartService, total: resDataService, count: resChartServicecount, loading: false });
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
        <h5>Total Outstanding Amount (Town Council)</h5>
         <BarChart data={values.outstanding} colors = {[["#F1E1DD", "#E79F89", "#E16E65", "#E25088", "#D149AB", "#A948C6", "#7938B8", "#270667"]]} pointWidth = {92}/>
         <StageSpinner  size={30}  color="#75C46B" loading={values.loading}  /> 
        </Box>
        <Box boxShadow="sm" p="6" rounded="m" bg="white" height="auto" m={2}>
          <h5>Total Outstanding Job (Town Council)</h5>
        <ColumnChart data={values.count} colors = {[["#D6512B", "#E57930", "#E59337", "#E1B739", "#DEDA4B"]]} pointWidth = {92}/>
        <StageSpinner  size={30}  color="#75C46B" loading={values.loading}  /> 
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
              <StageSpinner  size={30}  color="#75C46B" loading={values.loading}  /> 
            </Stat>

            <Stat>
              <StatLabel>Overall Outstanding Jobwork</StatLabel>
              <StatNumber>
                {values.total.map((total) => total.total_outstanding)}
              </StatNumber>
              <StageSpinner  size={30}  color="#75C46B" loading={values.loading}  /> 
            </Stat>
          </StatGroup>
        </Box>
      </SimpleGrid>
    </SidebarWithHeader>
  );
}
export default Dashboard;
