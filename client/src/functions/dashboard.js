import axios from "axios";
import { apiBase } from "./config";
let returnData = {
    status: false,
    message: "",
    data: {}
};

export const emailViewFun = async(id)=>{
    console.log(`${apiBase}/proposal/view/${id}`);
    await axios.put(`${apiBase}/proposal/view/${id}`).then((res)=>{
        console.log(res);
        returnData.status = res.data.status;
        returnData.message = res.data.messsage;
        returnData.data = res.data.result;
        console.log(res.data.data);
    },(error)=>{
        returnData.status = error.response.status;
        returnData.message = "";
        returnData.data = error.response.error;
    }).catch((error)=>{
        console.log(error,'email view fun error')
    })
    return returnData
}


export const activityBoardFun = async()=>{
    
    await axios.get(`${apiBase}/activity`).then((res)=>{
        console.log(res);
        returnData.status = res.data.status;
        returnData.message = "";
        returnData.data = res.data.data;
        console.log(res.data.data);
    },(error)=>{
        returnData.status = error.response.status;
        returnData.message = "";
        returnData.data = error.response.error;
    }).catch((error)=>{
        console.log(error,'dashboard error')
    })
    return returnData
}