import axios from "axios";
import authHeader from "./auth.header";
import {
  useState
} from "react";

const header = authHeader();

/*
   CLIENT SERVICES
*/

const API_URL_CLIENT = "/client";
const getAllClient = async () => {
  try {
    const response = await axios.get(API_URL_CLIENT, {
      headers: header
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const CreateClient = (clientName, pass) => {
  const client = {
    client_name: clientName
  };
  axios
    .post(API_URL_CLIENT, {
      client
    }, {
      headers: header
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

const DeleteClient = (id) => {
  axios.delete(API_URL_CLIENT + `/${id}`, {
    headers: header
  });
};

/*
   DIVISION SERVICES
*/
const API_URL_DIVISION = "/division";

const CreateDivision = (clientId, divisionName, divShort) => {
  const division = {
    client_id: clientId,
    div_name: divisionName,
    div_short: divShort,
  };
  axios
    .post(API_URL_DIVISION, {
      division
    }, {
      headers: header
    })
    .then((res) => {
      console.log(res.data);
    });
};

const getAllDivision = async () => {
  try {
    const response = await axios.get(API_URL_DIVISION, {
      headers: header
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const deleteDivision = async (id) => {
  axios.delete(`/division/${id}`, {
    headers: header
  }).then((result) => {
    return result;
  });
};

const divBelong = async (divId) => {
  try {
    const response = await axios.get(`/divbelong/${divId}`, {
      headers: header,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

/*
   JOBINFO SERVICES
*/

const API_URL_JOBINFO = "/jobinfo";

const createJobinfo = (
  division_name,
  client_name,
  dateEntry,
  complain_desc,
  address,
  block,
  defectinfo,
  partsinfo
) => {
  const jobinfo = {
    division_name: division_name,
    client_name: client_name,
    dateEntry: dateEntry,
    natureofcomplain: complain_desc,
    address: address,
    block: block,
    defect_details_attributes: defectinfo.map((item) => {
      return {
        defects: item.defects,
        recommendation: item.recommendation
      };
    }),
    partsreplace_attributes: partsinfo.map((item) => {
      return {
        sorcode: item.sorCode,
        item: item.item,
        quantity: item.quantity,
        rates: item.rates,
        subtotal: item.subtotal
      };
    }),
  };
  axios.post(API_URL_JOBINFO, {
    jobinfo
  }, {
    headers: header
  }).then((res) => {
    console.log(res.data);
  });
};

const DataService = {
  getAllClient,
  CreateClient,
  DeleteClient,
  CreateDivision,
  getAllDivision,
  deleteDivision,
  divBelong,
  createJobinfo,
};

export default DataService;