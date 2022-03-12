import axios from "axios";
import authHeader from "./auth.header";
import Moment from "moment";
import React, { useEffect, useState } from "react";
import { DirectUpload } from "activestorage";

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
      API_URL_CLIENT,
      {
        client,
      },
      {
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
      API_URL_DIVISION,
      {
        division,
      },
      {
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
  complain_desc,
  address,
  block,
  gtotal,
  defectinfo,
  partsinfo,
  images
) => {
  const jobinfo = {
    division_name: division_name,
    client_name: client_name,
    dateEntry: Moment(dateEntry).format("DD-MM-YYYY"),
    natureofcomplain: complain_desc,
    address: address,
    block: block,
    gtotal: gtotal,
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
      API_URL_JOBINFO,
      {
        jobinfo,
      },
      {
        headers: header,
      }
    )
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .then((response) => {
      uploadFile(images);
    });

  const uploadImg = (images) => {
    console.log(images);
  };

  const uploadFile = (images) => {
    const upload = new DirectUpload(
      images,
      "http://localhost:3001/rails/active_storage/direct_uploads"
    );
    upload.create((error, blob) => {
      console.log("dondon");
      if (error) {
        console.log(error);
      } else {
        console.log("no error yehey");
      }
    });
  };
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
  getAllJobinfo,
  dashboard_total_Amount,
};

export default DataService;
