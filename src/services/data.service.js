import axios from "axios";
import authHeader from "./auth.header";

const header = authHeader();
const clientView = async () => {
  const endpoint_client = "/client";
  try {
    const response = await axios.get(endpoint_client, { headers: header });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const CreateClient = (clientName) => {
  const API_URL = "/client";
  let client = { client_name: clientName };
  axios.post(API_URL, { headers: header, client });
};

const DeleteClient = (id, getClient) => {
  const API_URL = `/client/${id}`;
  axios.delete(API_URL, { headers: header });
};

const DataService = {
  clientView,
  CreateClient,
  DeleteClient,
};

export default DataService;
