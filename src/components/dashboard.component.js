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

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Aljunied-Hougang",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 20 })),
      backgroundColor: "rgba(255, 76, 48, 0.5)",
    },
    {
      label: "Ang Mo Kio",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 20 })),
      backgroundColor: "rgba(249, 180, 45, 0.5)",
    },
    {
      label: "Bishan-Toa Payoh",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 20 })),
      backgroundColor: "rgba(95, 16, 245, 0.5)",
    },
    {
      label: "Jurong-Clementi",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 20 })),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "Marine Parade",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 20 })),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "Nee Soon",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 20 })),
      backgroundColor: "rgba(231, 76, 60,0.5)",
    },
    {
      label: "Tampines",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 20 })),
      backgroundColor: "rgba(26, 188, 156,0.5)",
    },
  ],
};

function Dashboard() {
  return (
    <SidebarWithHeader>
      <SimpleGrid columns={{ sm: 1, md: 2 }} >
        <Box bg="#fff" height="auto" m={2}> 
          <Bar options={options} data={data} bg="red"  />
        </Box>
        <Box bg="#fff" height="140px" m={2} padding="5">
          <StatGroup justifyContent="space-between">
            <Stat>
              <StatLabel>Total Amount Jobwork</StatLabel>
              <StatNumber>$45,670sgd</StatNumber>
            </Stat>

            <Stat>
              <StatLabel>Total Outstanding Jobwork</StatLabel>
              <StatNumber>45</StatNumber>
             </Stat>

          </StatGroup>
        </Box>
      </SimpleGrid>
    </SidebarWithHeader>
  );
}
export default Dashboard;
