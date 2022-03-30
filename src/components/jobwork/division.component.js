import React, { useEffect, useState, useMemo } from "react";
import {
  Select,
  FormLabel,
  Text,
  FormControl,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";

import { ErrorMessage } from "@hookform/error-message";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import DataService from "../../services/data.service";
import { useParams } from "react-router-dom";

const Division = (props) => {
  const { id } = useParams();
  const [jobdetail, setJobdetail] = useState([]);

  useEffect(() => {
    getJobDetail();
  }, []);

  const getJobDetail = () => {
    DataService.jobinfo_detail(id).then((response) => {
      setJobdetail(response);
    });
  };

  useEffect(() => {
    reset(jobdetail);
  }, [jobdetail]);

  const [values, setValues] = useState({
    divisionsSelected: [],
    clientBelong: [],
    error: "",
    jobid: id,
  });

  const {
    register,
    formState: { errors },
    reset,
  } = useForm();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };




  const getDivision = () =>{
    DataService.getAllDivision().then((response) => {
      setValues({ ...values, divisionsSelected: response });
    });
   }
  
   useEffect(()=>{
     getDivision();
   },[])
  {console.log(values.divisionsSelected)}

  return (
    <>
      <FormControl isInvalid={errors.division_name?.message}>
        <FormLabel>Division:</FormLabel>
        <Select
          placeholder="Select option"
          {...register("division_name", {
            required: "cannot be empty",
          })}
          onChange={handleChange("division_name")}
        >
          {values.divisionsSelected.map((division, i) => {
            return (
              <option
                value={division.id}
                selected={props.propsDefaultDivision == division.id}
              >
                {division.div_name}
              </option>
            );
          })}
        </Select>
        {console.log(values.propsDivisionBelong)}
      </FormControl>
      <Text as="sup" color="tomato" textAlign={3} className="login-error-msg">
        {errors.division_name?.message}
      </Text>
    </>
  );
};

export default Division;
