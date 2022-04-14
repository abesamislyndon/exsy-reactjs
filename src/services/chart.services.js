import axios from "axios";
import authHeader from "./auth.header";

const header = authHeader();

const outstanding_url = "/outstanding";
const Outstanding = async () => {
  try {
    const response = await axios.get(outstanding_url, {
      headers: header,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const outstanding_url_count = "/outstandingcount";
const Outstandingcount = async () => {
  try {
    const response = await axios.get(outstanding_url_count, {
      headers: header,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


const DataService = {
    Outstanding,
    Outstandingcount
  };
  
  export default DataService;