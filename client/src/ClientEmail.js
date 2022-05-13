import React, { useEffect, useState } from 'react';
import './css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import EmailIcon from '@material-ui/icons/Email';
import { useNavigate, useParams } from 'react-router-dom';
import { viewEmailFun } from './functions/email';
import { emailViewFun } from './functions/dashboard';
import Loader from './components/Loader';

const EmailPage = () => {
    const [loader,setLoader] = useState(false);
    const [clientId, setClientId] = useState("")
    const nav = useNavigate();
    const { id } = useParams();
    const [email, setEmail] = useState("");
    const [verifyEmail, setVerifyEmail] = useState("");
    const [error, setError] = useState("");
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    const submit = async () => {
        // console.log("clicked")
        // console.log(email);
        if (email.trim().length === 0) {
            setError("Please Submit your Email")
        }
        else {
            // console.log(regex.test(email),"email validation")
            if (regex.test(email)) {
                console.log(email, "valid Email");
                window.localStorage.setItem('veriftyToken', email);
                if(verifyEmail === email){
                    setLoader(true);
                    let data = await emailViewFun(clientId);
                    console.log(data);
                    if(data.status){
                        setLoader(false);
                        nav(`../mail/${id}`);
                    }
                    
                }
                else{
                    setError("Email is not Valid");    
                }
                
            }
            else {
                setError("Email is not Valid");
            }
        }

    }
    useEffect(async () => {
        
        let data = await viewEmailFun(id);
        if (data.status) {
            setClientId(data.data.client_id)
            setVerifyEmail(data.data.email_to);
        }
    },[0])
    return (
        <>
            <Loader status={loader}/>
            <div className="full-height container-fluid bg-prime d-flex align-items-center justify-content-center">
                <div className="login-box">
                    <h2 className="text-light fw-bold mb-3 text-center">Welcome to CMS</h2>
                    <div className="login-form p-4 bg-light">
                        <span className="text-center d-block  text-decoration-none text-danger mb-2   text-center">{error}</span>
                        <h4 className="text-center mt-2 mb-3 fw-bold">SignUp</h4>

                        <div className="input-box my-3">
                            <div className="icon-box bg-sec d-flex align-items-center justify-content-center p-2">
                                <EmailIcon className="text-light" />
                            </div>
                            <input type="text" className="p-2" placeholder=" Email" onFocus={() => setError("")} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <button className="btn  w-100 p-2 mb-2 login-btn shadow-none" onClick={submit} >Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default EmailPage;
