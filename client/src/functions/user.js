import axios from "axios";
import { apiBase } from "./config";
import { addState } from '../state/actions/index';
import { useDispatch } from 'react-redux';
import jwtDecode from "jwt-decode";

export const addUserFun = async (username, password, cPassword) => {
    let returnData = {
        status: false,
        message: "",
        data: {}
    };
    console.log()
    if (!(username.trim().length === 0 || password.trim().length === 0 || cPassword.trim().length === 0)) {
        console.log("true");
        if (password === cPassword) {
            let body = {
                username: username,
                password: password
            }

            await axios.post(`${apiBase}/user/signup`, body).then((res) => {
                console.log("signup response")
                // console.log(res.data)
                // return {status : true, message:"user has created", data:res.data} ;       
                returnData.status = res.data.status;
                returnData.message = res.data.message;
                returnData.data = res.data.error;
            }).catch((error) => {

                console.log(error)

            });

        }
        else {

            returnData.status = false;
            returnData.message = "password is not same";

        }
    } else {

        returnData.status = false;
        returnData.message = "Please fill the input fields";

    }
    return returnData;
}


export const UserLoginFun = async (user, password, as) => {
    console.log(apiBase);
    let returnData = {
        status: false,
        message: "",
        data: {}
    };
    // const actions = bindActionCreators(actionCreators,dispatch);
    if (user === "" | password === "") {
        returnData.status = false;
        returnData.message = "invalid input";
        console.log("yooyo");
    }
    else {
        console.log(password);
        // axios.get(apiBase).then(res => console.log(res.data)).catch(err=> console.log(err));
        await axios.post(`${apiBase}/user/login`, {
            username: user,
            password: password,
        }).then((response) => {
            if (response.data.role === as) {
                returnData.status = true;
                returnData.data = { username: user, token: response.data.token };

            } else {
                console.log(response.data);

                returnData.status = false
                returnData.message = "credentials are not matched";
            }
        }).catch((err) => {
            console.log(`Loggin error : ${err}`);
            // return { status: false, message: "Invalid Creadentials" }
            returnData.status = false;
            returnData.message = "Invalid Creadentials"
        })
    }
    console.log(returnData);
    return returnData

}

export const deleteUserFun = async (id) => {
    let returnData = {
        status: false,
        message: "",
        data: {}
    };
    await axios.delete(`${apiBase}/user/${id}`).then(
        (res) => {
            returnData.status = res.data.delete;
            returnData.message = res.data.message;
            returnData.data = res.data.result;
        }
    ).catch(
        (error) => {

            alert(error);
        }
    )
    return returnData;
}
export const verifyUser = async () => {
    
    let token = window.localStorage.getItem('userToken');
    if (token !== null) {
        let decode = jwtDecode(token);
        let username = decode.username;
        console.log(decode);
        await axios.get(`${apiBase}/user/verify/${username}`).then((response) => {
            if (response) {
                console.log(response.data);
                if (!response.data.status) {
                    Window.localStorage.removeItem('userToken');
                }
                
            }
            
        },(error)=>{
            if(!error.response.data.status){
                 
                 window.localStorage.removeItem('userToken')
            }
            console.log(error.response.data);
        }).catch((err) => {
            console.log(err)
        })
    }
}
