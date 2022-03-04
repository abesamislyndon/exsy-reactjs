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
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import faker from "faker";
import DataService from "../services/data.service";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Outstanding Jobwork",
    },
  },
};

export const options_amount_total_each = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 0,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Total Amount Town Council',
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Aljunied-Hougang",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 20 })),
      backgroundColor: "rgba(237, 76, 103,1.0)",
    },
    {
      label: "Ang Mo Kio",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 20 })),
      backgroundColor: "rgba(181, 52, 113,1.0)",
    },
    {
      label: "Bishan-Toa Payoh",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 20 })),
      backgroundColor: "rgba(131, 52, 113,1.0)",
    },
    {
      label: "Jurong-Clementi",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 20 })),
      backgroundColor: "rgba(111, 30, 81,1.0)",
    },
    {
      label: "Marine Parade",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 20 })),
      backgroundColor: "rgba(87, 88, 187,1.0)",
    },
    {
      label: "Nee Soon",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 20 })),
      backgroundColor: "rgba(153, 128, 250,1.0)",
    },
    {
      label: "Tampines",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 20 })),
      backgroundColor: "rgba(217, 128, 250,1.0)",
    },
  ],
};


const labels2 = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data2 = {
  labels,
  datasets: [
    {
      label: 'Aljunied-Hougang ',
      data: labels2.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(196, 229, 56,1.0)',
    },
    {
      label: 'Ang Mokio',
      data: labels2.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(163, 203, 56,1.0)',
    },
    {
      label: 'Bishan-Toa Payoh',
      data: labels2.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(0, 148, 50,1.0)',
    },
    {
      label: 'Jurong Clementi',
      data: labels2.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'Marine Parade',
      data: labels2.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(247, 159, 31,1.0)',
    },
  ],
};

function Dashboard() {
  const [values, setValues] = useState({
    total_amount: [],
    total_outstanding: []
  });

  useEffect(() => {
    getTotalAmount();
  }, []);



  const getTotalAmount = () => {
    DataService.dashboard_total_Amount().then((response) => {
      setValues({total_amount:response});
      DataService.dashboard_total_outstanding().then((response) => {
        setValues({total_amount:response});
      });
    });
  };



  return (
    <SidebarWithHeader>
      <SimpleGrid columns={{ sm: 1, md: 2 }}>
        <Box boxShadow='sm' p='6' rounded='md' bg='white'  height="auto" m={2}>
          <Bar options={options} data={data} bg="red" />
        </Box>
        <Box boxShadow='sm' p='6' rounded='md' bg='white'  height="auto" m={2}>
          <Bar options={options_amount_total_each} data={data2} bg="red" />
        </Box>
        <Box boxShadow='sm' p='6' rounded='md' bg='white' height="140px" m={2} padding="5">
          <StatGroup justifyContent="space-between">
            <Stat>
              <StatLabel>Total Amount Jobwork</StatLabel>
              <StatNumber>${values.total_amount.map((total)=>total.total_amount)}</StatNumber>
            </Stat>

            <Stat>
              <StatLabel>Overall Outstanding Jobwork</StatLabel>
              <StatNumber>{values.total_amount.map((total)=>total.total_outstanding)}</StatNumber>
            </Stat>
          </StatGroup>
        </Box>
      </SimpleGrid>
    </SidebarWithHeader>
  );
}
export default Dashboard;
