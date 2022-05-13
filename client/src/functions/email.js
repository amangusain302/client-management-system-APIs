import axios from "axios";
import { apiBase } from "./config";
let returnData = {
    status: false,
    message: "",
    data: {}
};

export const sendEmailFun = async (client_id, client_objId, username, to, subject, body) => {
    const request = {
        client_objId: client_objId,
        client_id: client_id,
        sender_username: username,
        email_to: to,
        email_subject: subject,
        email_body: body
    };
    console.log(request, "request body")
    await axios.post(`${apiBase}/emailsend/send`, request).then((res) => {

        returnData.status = res.data.status;
        returnData.message = res.data.message;
        returnData.data = res.data.newemail;

    }, (error) => {
        console.log(error.response);
        returnData.status = error.response.data.status;
        returnData.message = error.response.data.message;
        returnData.data = error.response.data.newemail;

    }).catch(error => alert(`email send error: ${error} `))
    return returnData;
}

export const viewEmailFun = async (id) => {
     await axios.get(`${apiBase}/emailsend/search/${id}`).then((res) => {
        returnData.status = res.data.status;
        returnData.message = res.data.message;
        returnData.data = res.data.result;
    }, (error) => {
        console.log(error.response);
        returnData.status = error.response.data.status;
        returnData.message = "";
        returnData.data = error.response.data.err;
    }).catch(error => alert(`view mail error ${error}`));
    return returnData;
}