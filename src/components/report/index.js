import React, { useState, useEffect } from "react";
import SidebarWithHeader from "../../shared/SidebarProps";
import Moment from "moment";
import authHeader from "../../services/auth.header";
import axios from "axios";
import {
  Container,
  GridItem,
  SimpleGrid,
  Button,
  Select,
  FormControl,
  FormLabel,
  useColorModeValue,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ExportToExcel } from "./ExportToExcel";
import DataService from "../../services/data.service";
import Reportresult from "../report/Reportresult";


function Report() {
  const header = authHeader();
  const API_URL_GENERATE_REPORT = "/generatereport";

  const [values, setValues] = useState({
    clients: [],
    id: "",
    client_name: "",
    datefrom: "",
    dateto: "",
    status: "",
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  useEffect(() => {
    getClient();
  }, []);

  const getClient = () => {
    const list = DataService.getAllClient();
    list.then((response) => {
      setValues({ ...values, clients: response });
    });
  };


  const fileName = "report"; // here enter filename for your excel file
  /*
   React.useEffect(() => {
      const fetchData = () => {
        axios
          .get("https://jsonplaceholder.typicode.com/posts")
          .then((r) => setData(r.data));
      };
      fetchData();
    }, []);
  */

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const colors = useColorModeValue(["#fcfcfc", "#fcfcfc"], ["#fff"]);
  const [tabIndex, setTabIndex] = React.useState(0);
  const bg = colors[tabIndex];

  const [response, setResponse] = useState([]);

  useEffect(() => {
  }, [response]); // Makes the useEffect dependent on response.



  const genReport = async (event, data) => {
    try {

      const params = {
        client_name: values.client_name,
        status: values.status,
        datefrom: Moment(values.datefrom).format("DD-MM-YYYY"),
        dateto: Moment(values.dateto).format("DD-MM-YYYY")
      }
      axios.get(API_URL_GENERATE_REPORT, {
        params,
        headers: header
      }).then((response) => {
        setResponse(response.data);
      });
      console.log(response)

    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    }
  };
  const handleChange1 = (dateChange) => {
    setValues("datefrom", dateChange, {
      shouldDirty: true
    });
    setValues({ ...values, datefrom: dateChange });
  };
  const handleChange2 = (dateChange) => {
    setValues("dateto", dateChange, {
      shouldDirty: true
    });
    setValues({ ...values, dateto: dateChange });
  };
  return (
    <SidebarWithHeader>
      <Container maxW="container.xl">
        <form onSubmit={handleSubmit(genReport)} autoComplete="off">
          <SimpleGrid columns={5} columnGap={3} rowGap={6} w="full" className="report-date">
            <GridItem>
              <FormControl>
                <FormLabel>Status:</FormLabel>
                <Select
                  placeholder="Select option"
                  {...register("status")}
                  onChange={handleChange("status")}
                >
                  <option value="0">Outstanding</option>
                  <option value="1">Job Done</option>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel>Client:</FormLabel>
                <Select
                  placeholder="Select option"
                  {...register("client_name")}
                  onChange={handleChange("client_name")}
                >
                  {values.clients?.map((client, i) => {
                    return (
                      <option value={client.client_name}>
                        {client.client_name}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel>Date From:</FormLabel>
                <Controller
                  control={control}
                  name="datefrom"
                  render={({ field }) => (
                    <DatePicker
                      placeholderText="Select date"
                      onChange={handleChange1}
                      selected={values.datefrom}
                      dateFormat="MM-dd-yy"
                      className="chakra-input"
                    />
                  )}
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel>Date To:</FormLabel>
                <Controller
                  control={control}
                  name="dateto"
                  render={({ field }) => (
                    <DatePicker
                      placeholderText="Select date"
                      onChange={handleChange2}
                      selected={values.dateto}
                      dateFormat="MM-dd-yy"
                      className="chakra-input"
                    />
                  )}
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <Button type="submit" size="sm" className="reportBtn">
                Generate Report
              </Button>
            </GridItem>
          </SimpleGrid>
        </form>
     
        <Reportresult queryresult={response} />
        <ExportToExcel apiData={response} fileName={fileName} />
      </Container>
    </SidebarWithHeader>
  );
}
export default Report;
