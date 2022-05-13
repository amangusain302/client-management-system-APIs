import axios from "axios";
import { apiBase } from "./config";
let returnData = {
    status: false,
    message: "",
    data: {}
};
export const allProposalsFun = async () => {

    await axios.get(`${apiBase}/proposal/read`).then((res) => {
        returnData.status = true;
        returnData.message = "Proposals data is fetched"
        returnData.data = res.data;
    }).catch((error) => {
        alert(error);
    })
    return returnData
}
export const createProposalFun = async(body) => {
    console.log(JSON.parse(body));
    
    await axios.post(`${apiBase}/proposal/create`,JSON.parse(body)).then((res)=>{
        returnData.message = res.data.message;
        returnData.status = res.data.status;
        returnData.data = res.data.newproposal
    }).catch((err)=>{
        alert(err);
    })
    return returnData
}
export const deleteProposalFun = async(id)=>{
    await axios.delete(`${apiBase}/proposal/delete/${id}`).then((res)=>{
            returnData.message = res.data.message;
            returnData.status = res.data.delete;
            returnData.data = res.data.result;
    }).catch((err)=>{
        console.log(err)
    })
    return returnData;
}
export const fetchProposalFun = async(id)=>{
    await axios.get(`${apiBase}/proposal/read/${id}`).then((res)=>{
        returnData.message = res.data.message;
        returnData.status = res.data.status;
        returnData.data = res.data.result;
    }).catch((err)=>{
        alert(err)
    })
    return returnData;
}
export const updateProposalFun = async(id,body)=>{
    
    await axios.put(`${apiBase}/proposal/update/${id}`,JSON.parse(body)).then(
        (res)=>{
        returnData.message = res.data.message;
        returnData.status = res.data.status;
        returnData.data = res.data.proposal_update;
    }, error => {
        console.log(error.response.data);
    }).catch((err)=>{
        alert(err.message);
    })
    return returnData
}
export const recentProposalFun = async()=>{
    await axios.get(`${apiBase}/proposal/recent`).then((res)=>{
        returnData.status = res.data.status;
        returnData.message = res.data.messsage;
        returnData.data = res.data.data;
    },(error)=>{
        returnData.status = error.response.status;
        returnData.message = error.response.messsage;
        returnData.data = error.response.error;
    }).catch((error)=>{
        console.log(error,"recent proposal error");
    })
    return returnData;
}
export const searchProposalFun = async(key)=>{
    console.log(`${apiBase}/proposal/search/${key}`);
    await axios.get(`${apiBase}/proposal/search/${key}`).then((res)=>{
        returnData.status = res.data.status;
        returnData.message = res.data.messsage;
        returnData.data = res.data.data;
        console.log(res.data.data);
    },(error)=>{
        returnData.status = error.response.status;
        returnData.message = error.response.messsage;
        returnData.data = error.response.data;
    }).catch((err)=>{
        console.log(err,'proposal search error');
    })
    return returnData;
}
