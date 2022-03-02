import { useState, useEffect } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import SidebarWithHeader from "../shared/SidebarProps";
import { Flex, Container, Grid, GridItem } from "@chakra-ui/react";
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
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Bishan - Toa Payoh",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(255, 76, 48, 0.5)",
    },
    {
      label: "Kallang",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(249, 180, 45, 0.5)",
    },
    {
      label: "Marina",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(95, 16, 245, 0.5)",
    },
    {
      label: "Ang Mokio",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

function Dashboard() {
  /*
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    } else {
      navigate("/");
      window.location.reload();
    }
  }, []);
  */

  return (
    <SidebarWithHeader>
      <Grid templateColumns="repeat(2, 1fr)" gap={1}>
        <GridItem w="100%" h="10">
          <Bar options={options} data={data} />
        </GridItem>
        <GridItem w="100%" h="10"  />
      </Grid>
    </SidebarWithHeader>
  );
}
export default Dashboard;
