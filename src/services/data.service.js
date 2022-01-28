import axios from "axios";
import authHeader from "./auth.header";
import { useState } from "react";

const header = authHeader();
const API_URL = "/client";

const clientView = async () => {
  try {
    const response = await axios.get(API_URL, { headers: header });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const CreateClient = (clientName, pass) => {

const client = { client_name: clientName };
 axios.post(API_URL, {client },{ headers: header, }).then((res) => {
   console.log(res.data)
  
})
.catch((error) => {
  console.error(error)
})
};

const DeleteClient = (id) => {
  axios.delete(API_URL + `/${id}`, { headers: header });
};

const DataService = {
  clientView,
  CreateClient,
  DeleteClient,
};

export default DataService;
