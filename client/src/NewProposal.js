import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./css/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ToggleBar from './components/ToggleBar';
import Header from './components/Header';
import SideBar from './components/DashboardSideBar';
import AddBox from '@material-ui/icons/AddBox';
import PersonOutlineOutlined from '@material-ui/icons/PersonOutlineOutlined';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CategoryIcon from '@material-ui/icons/Category';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import EmailIcon from '@material-ui/icons/Email';
import AccountIcon from '@material-ui/icons/AccountBalance';
import LocationOn from '@material-ui/icons/LocationOn';
import BussinessIcon from '@material-ui/icons/Business';
import WorkIcon from '@material-ui/icons/Work';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import EditIcon from '@material-ui/icons/Edit';
import { createProposalFun, fetchProposalFun, updateProposalFun } from './functions/proposals';
import { Modal } from 'react-bootstrap';
import Loader from './components/Loader';
const NewProposals = (props) => {
    const { id } = useParams();
    const [loader, setLoader] = useState(false);
    const [buttonDisable, setButtonDisable] = useState(false);
    const [name, setName] = useState("");
    const [revenue, setRevenue] = useState("");
    const [status, setStatus] = useState("");
    const [catagory, setCatagory] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [account, setAccount] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [address, setAddress] = useState("");
    const [comment, setComment] = useState("false");
    const [download, setDownload] = useState("false");
    const [modalTitle, setModalTitle] = useState("Alert");
    const [modalDecs, setModalDecs] = useState("Please submit Valid Data in the fields");
    const [validStatus, setValidStatus] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const save = async (use) => {
        const data = { name, revenue, status, catagory, first_name: firstName, last_name: lastName, mobile, email, account, country, state, zip_code: zipCode, address, comment: (comment === "true") ? true : false, download: (download === "true") ? true : false };
        if (use === "insertion") {
            console.log(validStatus,'final valid status');
            if (!validStatus) {
                handleShow();
            }
            else {
                let result;
                console.log(data);
                console.log(validStatus)
                if (validStatus) {
                    result = await createProposalFun(JSON.stringify(data));
                    setLoader(true);
                    if (result.status) {
                        setLoader(false);
                        console.log(result.message);
                        setModalTitle("Created");
                        setModalDecs(result.message);
                        handleShow();
                        setName("");
                        setRevenue("");
                        setStatus("");
                        setCatagory("");
                        setFirstName("");
                        setLastName("");
                        setMobile("");
                        setEmail("");
                        setAccount("");
                        setCountry("");
                        setState("");
                        setZipCode('');
                        setAddress("");
                        setComment("false");
                        setDownload("false");
                    }
                    else{
                        setLoader(false);
                    }
                }
                else {
                    handleShow();
                }
            }
        }
        else if (use === "updation") {
            setLoader(true);
            let result = await updateProposalFun(id, JSON.stringify(data));
            if (result.status) {
                setLoader(false);
                setModalTitle("Upadated");
                setModalDecs(result.message);
                handleShow();
            }
            else{
                setLoader(false);
            }
        }


    }
    const lengthValid = (e) => {
        let value = e.target.value;
        console.log(e);
        if (value.trim().length === 0) {
            setValidStatus(false);
            e.target.parentElement.style = "box-shadow: 0px 5px 5px #ff000050";
            console.log(e.target.parentElement.style.boxShadow);
            setTimeout(() => {
                e.target.parentElement.style = "box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1)";
                // e.target.parentElement.style.boxShadow = ";";
            }, 8000)

        } else {
            setValidStatus(true);
        }
        console.log(validStatus,' valid status');
    }
    const mobValid = (e) => {
        let value = e.target.value;
        if (value.trim().length < 10) {
            setValidStatus(false);
            e.target.parentElement.style = "box-shadow: 0px 5px 5px #ff000050";
            console.log(e.target.parentElement.style.boxShadow);
            setTimeout(() => {
                e.target.parentElement.style = "box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1)";
                // e.target.parentElement.style.boxShadow = ";";
            }, 8000)
        }
        else {
            setValidStatus(true);
        }
        console.log(validStatus,' valid status');
    }
    const emailValid = (e) => {
        let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        let value = e.target.value;
        if (regex.test(value)) {
            setValidStatus(true)

        }
        else {
            setValidStatus(false);
            e.target.parentElement.style = "box-shadow: 0px 5px 5px #ff000050";
            console.log(e.target.parentElement.style.boxShadow);
            setTimeout(() => {
                e.target.parentElement.style = "box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1)";
                // e.target.parentElement.style.boxShadow = ";";
            }, 8000)
        }
        console.log(validStatus,' valid status');
    }
    const accountValid = (e) => {
        let value = e.target.value;
        if (value.trim().length > 8 && value.trim().length <= 12) {
            setValidStatus(true);
        }
        else {
            setValidStatus(false);
            e.target.parentElement.style = "box-shadow: 0px 5px 5px #ff000050";
            console.log(e.target.parentElement.style.boxShadow);
            setTimeout(() => {
                e.target.parentElement.style = "box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1)";
                // e.target.parentElement.style.boxShadow = ";";
            }, 8000)
        }
        console.log(validStatus,' valid status');
    }
    useEffect(() => {
        // if (download === "true") {
        //     document.getElementById('download').checked = true;
        // }
        // else {
        //     document.getElementById('download').checked = false;
        // }
        // if (comment === "true") {
        //     document.getElementById('comment').checked = true;
        // } else {
        //     document.getElementById('comment').checked = false;
        // }
    })
    useEffect(async () => {
        console.log(props.use);

        if (props.use === "view" || props.use === "updation") {
            if (props.use === "view") {
                setButtonDisable(true);
                
            }
            let data = await fetchProposalFun(id);
                setLoader(true);
                if (data.status) {
                    
                    let fetchData = data.data;
                    setName(fetchData.name);
                    setRevenue(fetchData.revenue);
                    setStatus(fetchData.status);
                    setCatagory(fetchData.catagory);
                    setFirstName(fetchData.first_name);
                    setLastName(fetchData.last_name);
                    setMobile(fetchData.mobile);
                    setEmail(fetchData.email);
                    setAccount(fetchData.account);
                    setCountry(fetchData.country);
                    setState(fetchData.state);
                    setZipCode(fetchData.zip_code);
                    setAddress(fetchData.address);
                    setComment(fetchData.comment.toString());
                    setDownload(fetchData.download.toString());
                    setLoader(false);
                }
                
            console.log(id);




        }
        else if (props.use === "insertion") {
            setName("");
            setRevenue("");
            setStatus("");
            setCatagory("");
            setFirstName("");
            setLastName("");
            setMobile("");
            setEmail("");
            setAccount("");
            setCountry("");
            setState("");
            setZipCode('');
            setAddress("");
            setComment("false");
            setDownload("false");
            setButtonDisable(false)
        }
    }, [props.use])
    useEffect(() => {
        // if (props.use === "updation") {
        //     setName("garv");
        //     setRevenue("123");
        //     setStatus("pending");
        //     setCatagory("pending");
        //     setFirstName("garv");
        //     setLastName("Mehta");
        //     setMobile("7065950332");
        //     setEmail("garvmehta7701@gmail.com");
        //     setAccount("12346346784");
        //     setCountry("india");
        //     setState("delhi");
        //     setZipCode('1102224');
        //     setAddress("krishna nagar");
        //     setComment("true");
        //     setDownload("true");
        // }
    }, []);
    return (

        <>
            {/* <Modal className='modals' show={show} onHide={handleClose}>
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>Alert</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p className='p-2'>
                            Please submit Valid Data in the fields
                        </p>
                    </Modal.Body>

                    <Modal.Footer>
                        <button className="btn border border-danger border-2 text-danger fw-bold " onClick={handleClose} >Ok</button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal> */}
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
                    <button className="btn  bg-prime border-2 text-white fw-bold w-100" onClick={handleClose} >OK</button>

                </Modal.Footer>
            </Modal>
            <div className="col-lg-10  m-0 p-md-3 p-2 full-height ">
                <Header />
                <div className="p-2 activity-container">
                    <div className='row '>
                        <div className='col-lg-12 '>
                            <div className='addproposal p-2'>
                                <div className='heading d-flex align-items-center'>{
                                    (props.use === "insertion")
                                        ?
                                        <><AddBox /> <h4 className='ms-1 fw-bold text-capitalize'>add new proposal</h4></>
                                        : (props.use === "updation") ?
                                            <><EditIcon /> <h4 className='ms-1 fw-bold text-capitalize'>Update Proposal</h4></> :
                                            <> <h4 className='ms-1 fw-bold text-capitalize'>{`${firstName} ${lastName}`}</h4></>
                                }

                                </div>
                                {/* Add Proposal Form */}
                                <div className='row py-2'>
                                    <div className='col-md-6 px-md-3 px-1'>
                                        <div className="input-box my-md-3 my-2">
                                            <div className="icon-box bg-prime d-flex align-items-center justify-content-center p-2">
                                                <PersonOutlineOutlined className='text-light' />
                                            </div>
                                            <input type="text" disabled={buttonDisable} className="p-2" placeholder="Client Name" onBlur={(e) => lengthValid(e)} value={name} onChange={(e) => { setName(e.target.value) }} />
                                        </div>
                                    </div>
                                    <div className='col-md-6 px-md-3 px-1'>
                                        <div className="input-box my-md-3 my-2">
                                            <div className="icon-box bg-prime d-flex align-items-center justify-content-center p-2">
                                                <AttachMoneyIcon className='text-light' />
                                            </div>
                                            <input type="text" disabled={buttonDisable} className="p-2" placeholder="Renvue" value={revenue} onBlur={(e) => lengthValid(e)} onChange={(e) => { setRevenue(e.target.value) }} />
                                        </div>
                                    </div>

                                    <div className='col-md-6 px-md-3 px-1'>
                                        <div className="input-box my-md-3 my-2">
                                            <div className="icon-box bg-prime d-flex align-items-center justify-content-center p-2">
                                                <RadioButtonCheckedIcon className='text-light' />
                                            </div>
                                            <select className='form-select p-2 text-secondary' onBlur={(e) => lengthValid(e)} disabled={buttonDisable} value={status} onChange={(e) => { setStatus(e.target.value) }} >
                                                <option value={" "} >Status</option>
                                                <option value={"pending"} >Pending</option>
                                                <option value={"active"}>active</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-md-6 px-md-3 px-1'>
                                        <div className="input-box my-md-3 my-2">
                                            <div className="icon-box bg-prime d-flex align-items-center justify-content-center p-2">
                                                <CategoryIcon className='text-light' />
                                            </div>
                                            <select className='form-select p-2 text-secondary' onBlur={(e) => lengthValid(e)} disabled={buttonDisable} value={catagory} onChange={(e) => { setCatagory(e.target.value) }} >
                                                <option value={" "}>Catagory</option>
                                                <option value={"pending"}>Pending</option>
                                                <option value={"active"}>active</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-md-6 px-md-3 px-1'>
                                        <div className="input-box my-md-3 my-2">
                                            <div className="icon-box bg-prime d-flex align-items-center justify-content-center p-2">
                                                <PersonOutlineOutlined className='text-light' />
                                            </div>
                                            <input disabled={buttonDisable} onBlur={(e) => lengthValid(e)} type="text" className="p-2" placeholder="FirstName" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} />
                                        </div>
                                    </div>
                                    <div className='col-md-6 px-md-3 px-1'>
                                        <div className="input-box my-md-3 my-2">
                                            <div className="icon-box bg-prime d-flex align-items-center justify-content-center p-2">
                                                <PersonOutlineOutlined className='text-light' />
                                            </div>
                                            <input disabled={buttonDisable} onBlur={(e) => lengthValid(e)} type="text" className="p-2" placeholder="LastName" value={lastName} onChange={(e) => { setLastName(e.target.value) }} />
                                        </div>
                                    </div>
                                    <div className='col-md-6 px-md-3 px-1'>
                                        <div className="input-box my-md-3 my-2">
                                            <div className="icon-box bg-prime d-flex align-items-center justify-content-center p-2">
                                                <PhoneAndroidIcon className='text-light' />
                                            </div>
                                            <input disabled={buttonDisable} type="text" onBlur={(e) => mobValid(e)} className="p-2" placeholder="Mobile" value={mobile} onChange={(e) => { setMobile(e.target.value) }} />
                                        </div>
                                    </div>
                                    <div className='col-md-6 px-md-3 px-1'>
                                        <div className="input-box my-md-3 my-2">
                                            <div className="icon-box bg-prime d-flex align-items-center justify-content-center p-2">
                                                <EmailIcon className='text-light' />
                                            </div>
                                            <input disabled={buttonDisable} onBlur={(e) => emailValid(e)} type="text" className="p-2" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                        </div>
                                    </div>
                                    <div className='col-md-6 px-md-3 px-1'>
                                        <div className="input-box my-md-3 my-2">
                                            <div className="icon-box bg-prime d-flex align-items-center justify-content-center p-2">
                                                <AccountIcon className='text-light' />
                                            </div>
                                            <input disabled={buttonDisable} type="text" onBlur={(e) => accountValid(e)} className="p-2" placeholder="Account" value={account} onChange={(e) => { setAccount(e.target.value) }} />
                                        </div>
                                    </div>
                                    <div className='col-md-6 px-md-3 px-1'>
                                        <div className="input-box my-md-3 my-2">
                                            <div className="icon-box bg-prime d-flex align-items-center justify-content-center p-2">
                                                <LocationOn className='text-light' />
                                            </div>
                                            <input disabled={buttonDisable} type="text" onBlur={(e) => lengthValid(e)} className="p-2" placeholder="Country" value={country} onChange={(e) => { setCountry(e.target.value) }} />
                                        </div>
                                    </div>
                                    <div className='col-md-6 px-md-3 px-1'>
                                        <div className="input-box my-md-3 my-2">
                                            <div className="icon-box bg-prime d-flex align-items-center justify-content-center p-2">
                                                <LocationOn className='text-light' />
                                            </div>
                                            <input disabled={buttonDisable} type="text" onBlur={(e) => lengthValid(e)} className="p-2" placeholder="State" value={state} onChange={(e) => { setState(e.target.value) }} />
                                        </div>
                                    </div>
                                    <div className='col-md-6 px-md-3 px-1'>
                                        <div className="input-box my-md-3 my-2">
                                            <div className="icon-box bg-prime d-flex align-items-center justify-content-center p-2">
                                                <LocationOn className='text-light' />
                                            </div>
                                            <input disabled={buttonDisable} type="text" onBlur={(e) => lengthValid(e)} className="p-2" placeholder="ZipCode" value={zipCode} onChange={(e) => { setZipCode(e.target.value) }} />
                                        </div>
                                    </div>
                                    <div className='col-12 px-md-3 px-1'>
                                        <div className="input-box my-md-3 my-2">
                                            <div className="icon-box bg-prime d-flex align-items-center justify-content-center p-2">
                                                <BussinessIcon className='text-light' />
                                            </div>
                                            <input disabled={buttonDisable} type="text" onBlur={(e) => lengthValid(e)} className="p-2" placeholder="Address" value={address} onChange={(e) => { setAddress(e.target.value) }} />
                                        </div>
                                    </div>
                                    <div className='col-12 px-md-3 my-md-auto my-1 px-1'>
                                        {(props.use !== "view") ? <>
                                            <button type='button' className='bg-prime my-1 btn-prime' onClick={() => save(props.use)}>{(props.use == "updation") ? <>update</> : (props.use == "insertion") ? <>save</> : null}</button>
                                            <button type='button' className='btn-prime my-1 cancel mx-3'>Cancel</button>
                                        </> : null}

                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className='col-lg-3 py-lg-0 py-4 px-0'> */}
                            
                            {/* <div className='reciptient-option  p-2  mx-lg-2 mx-0'> */}
                                {/* <div className=' d-flex align-items-center  '>
                                    <WorkIcon /> <span className='ms-1 fs-4 fw-bold'>Recipient Options</span>
                                </div> */}
                                {/* <div className='row p-1 m-0 '>
                                    <div className='d-flex flex-lg-column my-lg-auto my-1'>
                                        <label className="box ms-2">
                                            <input disabled={buttonDisable} id={"comment"} type="checkbox" aria-label="Checkbox for following text input" value={comment} onChange={(e) => setComment(Boolean(e.target.value))} />
                                            <span className='d-inline-block ms-1   fw-bold'>Comment</span>
                                        </label>
                                        <label className="box ms-2">
                                            <input disabled={buttonDisable} id={"download"} type="checkbox" aria-label="Checkbox for following text input" value={download} onChange={(e) => { setDownload(Boolean(e.target.value)) }} />
                                            <span className='d-inline-block ms-1    fw-bold'>Download</span>
                                        </label>
                                    </div>
                                </div> */}
                            {/* </div> */}
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}
export default NewProposals;