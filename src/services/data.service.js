import axios from "axios";
import authHeader from "./auth.header";
import Moment from "moment";
import {DirectUpload} from "@rails/activestorage"

const header = authHeader();
const BASE_URL_API = process.env.REACT_APP_BASE_URL_API;
const BASE_URL = process.env.REACT_APP_BASE_URL;

/*
   CLIENT SERVICES
*/

const API_URL_CLIENT = "/client";
const getAllClient = async() => {
    try {
        const response = await axios.get(API_URL_CLIENT, {headers: header});
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const CreateClient = (clientName, pass) => {
    const client = {
        client_name: clientName
    };
    axios.post(API_URL_CLIENT, {
        client
    }, {headers: header}).then((res) => {
        console.log(res.data);
    }).catch((error) => {
        console.error(error);
    });
};

const DeleteClient = (id) => {
    axios.delete(API_URL_CLIENT + `/${id}`, {headers: header});
};

/*
   DIVISION SERVICES
*/
const API_URL_DIVISION = "/division";

const CreateDivision = (clientId, divisionName, divShort) => {
    const division = {
        client_id: clientId,
        div_name:  divisionName,
        div_short: divShort
    };
    axios.post(API_URL_DIVISION, {
        division
    }, {headers: header}).then((res) => {
        console.log(res.data);
    });
};

const getAllDivision = async() => {
    try {
        const response = await axios.get(API_URL_DIVISION, {headers: header});
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const deleteDivision = async(id) => {
    axios
        .delete(`/division/${id}`, {headers: header})
        .then((result) => {
            return result;
        });
};

const divBelong = async(divId) => {
    try {
        const response = await axios.get(`/divbelong/${divId}`, {headers: header});
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

/*
   JOBINFO SERVICES
*/
const API_URL_JOBINFO = "/jobinfo";
const getAllJobinfo = async() => {
    try {
        const response = await axios.get(API_URL_JOBINFO, {headers: header});
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

const createJobinfo = (division_name, client_name, dateentry, natureofcomplain, address, block, gtotal, status, userid, defectinfo, partsinfo, images, photo) => {
    const jobinfo = {
        division_name: division_name,
        client_name: client_name,
        dateentry: Moment(dateentry).format("DD-MM-YYYY"),
        natureofcomplain: natureofcomplain,
        address: address,
        block: block,
        gtotal: gtotal,
        status: status,
        userid: userid,
        defect_details_attributes: defectinfo.map((defect_info) => {
            return {defects: defect_info.defects, recommendation: defect_info.recommendation};
        }),
        partsreplaces_attributes: partsinfo.map((item) => {
            return {sorcode: item.sorCode, item: item.item, quantity: item.quantity, rates: item.rates, subtotal: item.subtotal};
        })
    };

    axios.post(API_URL_JOBINFO, {
        jobinfo
    }, {headers: header}).then((response) => {
        uploadFile(images, response);
        console.log(images)
    });

    const uploadFile = (images, response) => {
        const upload = new DirectUpload(images,
        //"http://localhost:3001/rails/active_storage/direct_uploads"
        `${BASE_URL_API}/rails/active_storage/direct_uploads`
        // "http://localhost:3001/api/v1/upload"
        );
        upload.create((error, blob) => {
            console.log(blob);
            if (error) {
                console.log(error);
            } else {
                axios.post(`${BASE_URL_API}/upload_attach`, {
                    attachment: {
                        name: 'photo',
                        record_type: "Jobinfo",
                        record_id: response.data.id,
                        blob_id: blob.id
                    }
                }, {headers: header}).then((response) => {
                    console.log(images)
                });
            }
        });
    };
};



const updateJobinfo = (division_name, client_name, dateentry, natureofcomplain, address, block, gtotal, status, defectinfo, partsinfo, images, jobid) => {
    const jobinfo = {
        division_name: division_name,
        client_name: client_name,
        dateentry: Moment(dateentry).format("DD-MM-YYYY"),
        natureofcomplain: natureofcomplain,
        address: address,
        block:   block,
        gtotal:  gtotal,
        status:  status,
        defect_details_attributes: defectinfo.map((defect_info) => {
            //  defectinfo.map((defect_info)=>{    let reader = new FileReader();
            // reader.readAsDataURL(defect_info.photo[0]);   let imgfile =
            // defect_info.photo[0];    uploadImg(imgfile); })
            return {id: defect_info.id, defects: defect_info.defects, recommendation: defect_info.recommendation};
        }),
        partsreplaces_attributes: partsinfo.map((item) => {
            return {
                id: item.id,
                sorcode: item.sorcode,
                item: item.item,
                quantity: item.quantity,
                rates: item.rates,
                subtotal: item.subtotal
            };
        })
    };
    axios.put(`/jobinfo/${jobid}`, {
        jobinfo
    }, {headers: header});

    const uploadFile = (images) => {
        const upload = new DirectUpload(images, `${BASE_URL_API}/direct_uploads`
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

const jobinfo_detail = async(id) => {
    try {
        const response = await axios.get(`jobinfo/${id}`, {headers: header});
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const API_URL_TOTAL_AMOUNT = "/totalamount";
const dashboard_total_Amount = async() => {
    try {
        const response = await axios.get(API_URL_TOTAL_AMOUNT, {headers: header});
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const API_URL_JOB_COMPLETED = "/completed";
const Completed_jobwork = async() => {
    try {
        const response = await axios.get(API_URL_JOB_COMPLETED, {headers: header});
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const API_URL_JOB_COMPLETED_PERSONNEL = "/personnelcompleted";
const Completed_jobwork_personnel = async() => {
    try {
        const response = await axios.get(API_URL_JOB_COMPLETED_PERSONNEL, {headers: header});
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const API_URL_JOB_OUTSTANDING_PERSONNEL = "/personneloutstanding";
const Outstanding_jobwork_personnel = async() => {
    try {
        const response = await axios.get(API_URL_JOB_OUTSTANDING_PERSONNEL, {headers: header});
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const API_URL_COUNT_OUTSTANDING_PERSONNEL = "/personneloutstandingcount";
const dashboard_total_count_personnel = async() => {
    try {
        const response = await axios.get(API_URL_COUNT_OUTSTANDING_PERSONNEL, {headers: header});
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const API_URL_COUNT_JOBDONE_PERSONNEL = "/personneldonecount";
const dashboard_total_count_done_personnel = async() => {
    try {
        const response = await axios.get(API_URL_COUNT_JOBDONE_PERSONNEL, {headers: header});
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const removePartslist = (id) => {
    axios.delete(`partsreplace/${id}`, {headers: header});
};

const removeDefect = (id) => {
    axios.delete(`defect_details/${id}`, {headers: header});
};

const deleteJobinfo = (id) => {
    axios.delete(`jobinfo/${id}`, {headers: header});
};

// GENERATE REPORT
const API_URL_GENERATE_REPORT = "/generatereport";


const generateReport = (client_name, status, datefrom, dateto) => {

    const  params =  {
        client_name: client_name,
        status: status,
        datefrom:  Moment(datefrom).format("DD-MM-YYYY"),
        dateto:  Moment(dateto).format("DD-MM-YYYY")
    }
    axios.get(API_URL_GENERATE_REPORT, {
        params,
        headers: header
    }).then((response) => {
       return response.data
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
    updateJobinfo,
    getAllJobinfo,
    dashboard_total_Amount,
    jobinfo_detail,
    Completed_jobwork,
    removePartslist,
    deleteJobinfo,
    removeDefect,
    Completed_jobwork_personnel,
    Outstanding_jobwork_personnel,
    dashboard_total_count_personnel,
    dashboard_total_count_done_personnel,
    generateReport
};

export default DataService;