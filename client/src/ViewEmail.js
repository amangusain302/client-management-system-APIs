import React, { useEffect, useState } from 'react';
import './css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MarkEmailReadOutlinedIcon from '@material-ui/icons/EmailOutlined';
import { viewEmailFun } from './functions/email';
import { useParams, useNavigate } from 'react-router-dom';
import Parser from 'html-react-parser';
import Loader from './components/Loader';
const ViewEmail = () => {
    const nav = useNavigate();
    const [loader, setLoader] = useState(false);
    const { id } = useParams();
    const [username, setusername] = useState("");
    const [message, setMessage] = useState("<h1>dfdsfdg</h1>");
    useEffect(async () => {
        if (window.localStorage.getItem("veriftyToken") !== null) {
            setLoader(true)
            let data = await viewEmailFun(id);
            console.log(data);
            if (data.status) {
                console.log(data.data, 'email view log')
                setusername(data.data.sender_username);
                setMessage(data.data.email_body);
                window.localStorage.removeItem('veriftyToken');
                setLoader(false)
            }
            
        }else{
            nav(`../client/${id}`);
        }

    }, [0])
    return (
        <>
            <Loader status={loader} />
            <div className='full-height container-fluid bg-gray   d-flex align-items-center justify-content-center '>
                <div className='p-3 shadow   m-md-4 m-2 bg-light mail-view'>
                    <div className="d-flex align-items-center justify-content-center ">
                        <MarkEmailReadOutlinedIcon className=" emailIcon text-prime" />

                    </div>
                    <h2 className='text-center '><span className='text-capitalize'>{username}</span> Sent a Proposal</h2>
                    <div className='my-3 p-2 content-box' >

                        {Parser(message)}
                    </div>

                </div>

            </div>
        </>
    );
}
export default ViewEmail;