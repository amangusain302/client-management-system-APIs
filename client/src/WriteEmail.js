import React, { useEffect, useState } from 'react';
import "./css/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ToggleBar from './components/ToggleBar';
import Header from './components/Header';
import SideBar from './components/DashboardSideBar';
import TextEditor from './components/Editor';
import SendIcon from '@material-ui/icons/Send';
import CreateIcon from '@material-ui/icons/Create';
import AttachmentIcon from '@material-ui/icons/Attachment';
import { useParams } from 'react-router-dom';
import { fetchProposalFun } from './functions/proposals';
import { useSelector, useDispatch } from 'react-redux';
import { addState, updateState } from './state/actions/index'
import { sendEmailFun } from './functions/email';
import { getToken } from './functions/setToken';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Loader from './components/Loader';
import parse from 'html-react-parser'
// import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
// import CategoryIcon from '@material-ui/icons/Category';
// import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
// import EmailIcon from '@material-ui/icons/Email';
// import AccountIcon from '@material-ui/icons/AccountBalance';
// import LocationOn from '@material-ui/icons/LocationOn';
// import BussinessIcon from '@material-ui/icons/Business';
// import WorkIcon from '@material-ui/icons/Work';
const WriteEmail = () => {
    const nav = useNavigate();
    const [loader, setLoader] = useState(false);
    const emailState = useSelector(state => state.UserReducer.email);
    const reduxState = useSelector(state => state.UserReducer);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [client_objId, setClient_objId] = useState("")
    const [client_id, setClient_id] = useState("")
    const [subject, setSubject] = useState("");
    const [modalTitle, setModalTitle] = useState("Success");
    const [modalDecs, setModalDecs] = useState("Email Sent Successfully");
    const [backtoEmailStatus, setbacktoEmailStatus] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const sendEmail = async () => {
        let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        let userData = getToken();
        if (reduxState.email.to.trim().length === 0 || !(regex.test(reduxState.email.to))) {
            console.log("invalid Email");
            setModalTitle("Email");
            setModalDecs("Please Provide Valid Email");
            handleShow();

        }
        else {
            if (reduxState.email.subject.trim().length === 0) {
                setModalTitle("Email");
                setModalDecs("Subject is empty");
                handleShow();
            } else {
                // console.log(parse(reduxState.email.mailText), "text content")
                if (reduxState.email.mailText.trim().length !== 0) {
                    console.log(parse(reduxState.email.mailText)[0].props.children, 'dfklfsd')
                    if (parse(reduxState.email.mailText)[0].props.children === null) {
                        setModalTitle("Email");
                        setModalDecs("Email body is empty");
                        handleShow();
                    }
                    else {
                        setLoader(true);
                        let data = await sendEmailFun(client_id, client_objId, userData.username, reduxState.email.to, reduxState.email.subject, reduxState.email.mailText);
                        if (data.status) {
                            setLoader(false);
                            setbacktoEmailStatus(true);
                            console.log(data.data, 'email sent');
                            setModalTitle("Email");
                            setModalDecs("Email Successfully sent");
                            handleShow();

                        }
                    }
                }
                else {
                    setModalTitle("Email");
                    setModalDecs("Email body is empty");
                    handleShow();
                }

            }
        }

    }
    const backtoEmail = () => {
        handleClose();
        nav('../send');
    }
    const updateEmailState = () => {
        console.log(emailState, "blur log");
        dispatch(updateState(
            {
                filter: "email",
                data: { to: emailState.to, subject: subject, mailText: emailState.mailText }
            }
        )
        );
    }
    const updateEmailTo = (e) => {
        setEmail(e.target.value);
        dispatch(updateState(
            {
                filter: "email",
                data: { to: e.target.value, subject: reduxState.email.subject, mailText: reduxState.email.mailText }
            }
        )
        );
    }

    useEffect(async () => {

        console.log(id);
        setLoader(true);
        let data = await fetchProposalFun(id);
        console.log(data);
        if (data.status) {
            setEmail(data.data.email)
            setClient_objId(data.data._id)
            setClient_id(data.data.client_id);
            setName(data.data.name)
            dispatch(addState({ email: { to: data.data.email, subject: subject, mailText: "" } }))
            console.log(emailState, "whole state");
            setLoader(false)
        }

    }, [0])
    return (
        <>
            <Loader status={loader} />
            <Modal className='modals' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className='p-2'>
                        {modalDecs}
                    </p>
                </Modal.Body>
                <Modal.Footer className="py-2">
                    <button className="btn  bg-prime border-2 text-white fw-bold w-100" onClick={(backtoEmailStatus)?backtoEmail:handleClose} >OK</button>

                </Modal.Footer>
            </Modal>
            <div className="col-lg-10  m-0 p-md-3 p-2 full-height ">
                <Header />
                <div className="py-2 activity-container send">
                    <div className='col-12'>
                        <div className='Email activity-board bg-light p-2'>
                            <div className="heading mb-2 d-flex align-items-center"><span className="fw-bold">Send Email To {name}</span></div>
                            <div className='col-12'>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className="input-box my-md-3 my-2 ">
                                            <div className="icon-box  d-flex align-items-center justify-content-center p-2">
                                                <span className="  fw-bold">To:</span>
                                            </div>
                                            <input type="text" className="p-2" placeholder="Client Email" value={email} onChange={(e) => updateEmailTo(e)} />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className="input-box my-md-3 my-2 ">
                                            <div className="icon-box  d-flex align-items-center justify-content-center p-2">
                                                <span className="  fw-bold">Subject:</span>
                                            </div>
                                            <input type="text" className="p-2" placeholder="Type Subject" value={subject} onBlur={updateEmailState} onChange={(e) => { setSubject(e.target.value) }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div id='container'>
                                            <TextEditor />
                                            <div className='row p-2'>
                                                <div className='col d-flex align-itmes-center justify-content-end'>

                                                    <button className='  btn-prime bg-prime  d-flex align-items-center' onClick={sendEmail} ><SendIcon className='me-2' />Send</button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default WriteEmail;