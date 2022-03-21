import axios from "axios";
import authHeader from "./auth.header";
import Moment from "moment";
import React, {
  useEffect,
  useState
} from "react";
import {
  DirectUpload
} from "activestorage";

const header = authHeader();

/*
   CLIENT SERVICES
*/

const API_URL_CLIENT = "/client";
const getAllClient = async () => {
  try {
    const response = await axios.get(API_URL_CLIENT, {
      headers: header,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const CreateClient = (clientName, pass) => {
  const client = {
    client_name: clientName,
  };
  axios
    .post(
      API_URL_CLIENT, {
        client,
      }, {
        headers: header,
      }
    )
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

const DeleteClient = (id) => {
  axios.delete(API_URL_CLIENT + `/${id}`, {
    headers: header,
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
    .post(
      API_URL_DIVISION, {
        division,
      }, {
        headers: header,
      }
    )
    .then((res) => {
      console.log(res.data);
    });
};

const getAllDivision = async () => {
  try {
    const response = await axios.get(API_URL_DIVISION, {
      headers: header,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const deleteDivision = async (id) => {
  axios
    .delete(`/division/${id}`, {
      headers: header,
    })
    .then((result) => {
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
const getAllJobinfo = async () => {
  try {
    const response = await axios.get(API_URL_JOBINFO, {
      headers: header,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const createJobinfo = (
  division_name,
  client_name,
  dateEntry,
  natureofcomplain,
  address,
  block,
  gtotal,
  status,
  defectinfo,
  partsinfo,
  images
) => {
  const jobinfo = {
    division_name: division_name,
    client_name: client_name,
    dateEntry: Moment(dateEntry).format("DD-MM-YYYY"),
    natureofcomplain: natureofcomplain,
    address: address,
    block: block,
    gtotal: gtotal,
    status: status,
    defect_details_attributes: defectinfo.map((defect_info) => {
      //  defectinfo.map((defect_info)=>{
      //    let reader = new FileReader();
      //    reader.readAsDataURL(defect_info.photo[0]);
      //   let imgfile = defect_info.photo[0];
      //    uploadImg(imgfile);
      // })

      return {
        defects: defect_info.defects,
        recommendation: defect_info.recommendation,
      };
    }),
    partsreplaces_attributes: partsinfo.map((item) => {
      return {
        sorcode: item.sorCode,
        item: item.item,
        quantity: item.quantity,
        rates: item.rates,
        subtotal: item.subtotal,
      };
    }),
  };

  axios
    .post(
      API_URL_JOBINFO, {
        jobinfo,
      }, {
        headers: header,
      }
    ).then((response) => {
      uploadFile(images);
    });

  const uploadFile = (images, jobinfo) => {
    const upload = new DirectUpload(
      images,
      "http://localhost:3001/api/v1/direct_uploads"
    //  "http://localhost:3001/rails/active_storage/direct_uploads"
    );
    upload.create((error, blob) => {
      console.log(blob);
     /* if (error) {
        console.log(error);
      } else {
          fetch(`http://localhost:3001/api/v1/jobinfo/${blob.id}`,{
            method: 'PUT',
            headers: header,
            body: JSON.stringify({photo: blob.signed_id})
          })
          .then(response => response.json())
          .then(result => console.log(result))
      }
      */
    });
  };
};



const updateJobinfo = (
  division_name,
  client_name,
  dateEntry,
  natureofcomplain,
  address,
  block,
  gtotal,
  status,
  defectinfo,
  partsinfo,
  images,
  jobid
) => {
  const jobinfo = {
    division_name: division_name,
    client_name: client_name,
    dateEntry: Moment(dateEntry).format("DD-MM-YYYY"),
    natureofcomplain: natureofcomplain,
    address: address,
    block: block,
    gtotal: gtotal,
    status: status,
    defect_details_attributes: defectinfo.map((defect_info) => {
      //  defectinfo.map((defect_info)=>{
      //    let reader = new FileReader();
      //    reader.readAsDataURL(defect_info.photo[0]);
      //   let imgfile = defect_info.photo[0];
      //    uploadImg(imgfile);
      // })
      return {
        id: defect_info.id,
        defects: defect_info.defects,
        recommendation: defect_info.recommendation,
      };
    }),
    partsreplaces_attributes: partsinfo.map((item) => {
      return {
        id: item.id,
        sorcode: item.sorcode,
        item: item.item,
        quantity: item.quantity,
        rates: item.rates,
        subtotal: item.subtotal,
      };
    }),
  };
  axios
    .put(
      `http://localhost:3001/api/v1/jobinfo/${jobid}`, {
        jobinfo,
      }, {
        headers: header,
      }
    );

  const uploadFile = (images) => {
    const upload = new DirectUpload(
      images,
      "http://localhost:3001/api/v1/direct_uploads"
    //  "http://localhost:3001/rails/active_storage/direct_uploads"
    );
    upload.create((error, blob) => {
      console.log(blob);
      if (error) {
        console.log(error);
      } else {
        console.log("no error yehey");
      }
    });
  };
};

const jobinfo_detail = async (id) => {
  try {
    const response = await axios.get(`jobinfo/${id}`, {
      headers: header,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const API_URL_TOTAL_AMOUNT = "/totalamount";
const dashboard_total_Amount = async () => {
  try {
    const response = await axios.get(API_URL_TOTAL_AMOUNT, {
      headers: header,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
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
  updateJobinfo,
  getAllJobinfo,
  dashboard_total_Amount,
  jobinfo_detail
};

export default DataService;