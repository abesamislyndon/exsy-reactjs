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
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import DataService from "../../services/data.service";
import ChartService from "../../services/chart.services";
import NumberFormat from "react-number-format";
import { LineChart, PieChart, BarChart, ColumnChart, AreaChart } from 'react-chartkick'
import 'chartkick/chart.js'

function PersonnelDashboard() {
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
      personnel dashboard
    </SidebarWithHeader>
  );
}
export default PersonnelDashboard;
