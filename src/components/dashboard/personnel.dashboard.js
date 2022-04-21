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
import Personelcompleted from "../../components/jobwork/personnel/jobwork/completed"

function PersonnelDashboard() {


  return (
    <SidebarWithHeader>
        Dashboard
    </SidebarWithHeader>
  );
}
export default PersonnelDashboard;
