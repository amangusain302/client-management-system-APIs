import React, { useEffect, useState } from 'react';
import "./css/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from 'react-bootstrap';
import ToggleBar from './components/ToggleBar';
import Header from './components/Header';
import SideBar from './components/DashboardSideBar';
// import SendIcon from '@material-ui/icons/Send';
// import {Link} from 'react-router-dom';
// import PersonOutlineOutlined from '@material-ui/icons/PersonOutlineOutlined';
// import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
// import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
// import CategoryIcon from '@material-ui/icons/Category';
// import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
// import EmailIcon from '@material-ui/icons/Email';
// import AccountIcon from '@material-ui/icons/AccountBalance';
// import LocationOn from '@material-ui/icons/LocationOn';
// import BussinessIcon from '@material-ui/icons/Business';
import WorkIcon from '@material-ui/icons/Work';
import SearchIcon from '@material-ui/icons/Search';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import { getToken } from './functions/setToken';
import { apiBase } from './functions/config';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './components/Loader';
import { allProposalsFun, deleteProposalFun, searchProposalFun } from './functions/proposals';
import { addProposalState, addState, updateState } from './state/actions';

const AllProposals = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [role, setRole] = useState("user");
    const [error, setError] = useState("")
    const [searchKey, setSearchKey] = useState("");
    const [upState, setUpState] = useState(0);
    const [showDelete, setShowDelete] = useState(false);
    const deleteHandleClose = () => setShowDelete(false);
    const [deleteId, setDeleteId] = useState("");
    const deleteHandleShow = (id) => {
        setDeleteId(id);
        setShowDelete(true)
    };
    const [proposalsArr, setProposalsArr] = useState([]);
    let a = [
        {
            id: 1,
            name: "client",
            status: "active",
            catagory: "employee",
            revenue: "$1100",
            createdOn: "12/02/2022"
        },
        {
            id: 1,
            name: "client",
            status: "active",
            catagory: "employee",
            revenue: "$1100",
            createdOn: "12/02/2022"
        },
        {
            id: 1,
            name: "client",
            status: "active",
            catagory: "employee",
            revenue: "$1100",
            createdOn: "12/02/2022"
        },
        {
            id: 1,
            name: "client",
            status: "active",
            catagory: "employee",
            revenue: "$1100",
            createdOn: "12/02/2022"
        },
        {
            id: 1,
            name: "client",
            status: "active",
            catagory: "employee",
            revenue: "$1100",
            createdOn: "12/02/2022"
        }
    ];
    const Delete = async () => {
        console.log(deleteId);
        let data = await deleteProposalFun(deleteId);
        if (data.status) {
            console.log(data.status)
            setUpState(upState + 1);

            deleteHandleClose()

        }
        console.log("deleted !")

    }
    const searchProposal = async () => {
        if (searchKey.trim().length !== 0) {
            console.log(searchKey);
            setLoader(true);
            let data = await searchProposalFun(searchKey);
            if (data.status) {
                setLoader(false);
                setProposalsArr(data.data);
            }
            else {
                setLoader(false);
                setProposalsArr(data.data);
            }
        }
        else {
            let data = await allProposalsFun();
            if (data.status) {
                setProposalsArr(data.data);
            }
        }

        console.log(proposalsArr);
    }

    useEffect(async () => {
        console.log(upState);
        console.log("render");
        console.log("all proposals");
        let result = getToken();
        setRole(result.role)
        allProposalsFun().then((res) => {
            console.log(res);
            setLoader(true);

            if (res.status) {
                setLoader(false);
                setProposalsArr(res.data);
                dispatch(addState({ proposals: res.data }));
            }
            else {
                setLoader(false);
            }


        }).catch((error) => {
            alert(error)
        });


    }, [upState]);

    return (
        <>
            {/* delete Modal */}
            <Loader status={loader} />
            <Modal className='modals' show={showDelete} onHide={deleteHandleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className='p-2'>
                        Do you want to delete it?
                    </p>
                </Modal.Body>
                <Modal.Footer className="py-2">
                    <button className=" btn btn-danger" onClick={Delete} >Delete</button>
                    <button className="btn border border-danger border-2 text-danger fw-bold " onClick={deleteHandleClose} >Cancel</button>

                </Modal.Footer>
            </Modal>
            <div className="col-lg-10  m-0 p-md-3 p-2 full-height ">
                <Header />

                <div className="py-2 activity-container send">
                    <div className='col-12'>
                        <div className="activity-board recent-proposals  bg-light p-3">
                            <div className="heading mb-2 postion-sticky">
                                <div className='row'>
                                    <div className='col d-flex align-items-center '>
                                        <WorkIcon className="me-1" /><span className="fw-bold">All Proposals</span>
                                    </div>
                                    <div className="col-4 p-0">
                                        <div className="searchBox px-2 py-1">
                                            <input type="text" placeholder="Search Proposals...." value={searchKey} onChange={(e) => setSearchKey(e.target.value)} />
                                            <SearchIcon className="searchIcon" onClick={searchProposal} />
                                        </div>
                                    </div>
                                </div>


                            </div>
                            <div className="table-container">
                                <div className="recent-proposals-table all-proposals-table p-2">
                                    <div className="row head ">
                                        <div className="col   p-1 fw-bold">Client Id</div>
                                        <div className="col p-1 fw-bold">Client Name</div>
                                        <div className="col p-1 fw-bold">Status</div>
                                        <div className="col  p-1 fw-bold">Category</div>
                                        <div className="col  p-1 fw-bold">Revenue</div>
                                        <div className="col-md-2 col-2 p-1 fw-bold">Created On</div>
                                        <div className="col-2 col-2 p-1 fw-bold text-center">Actions</div>
                                    </div>
                                    <div className="main-body">
                                        {
                                            (proposalsArr.length >= 1) ?
                                                proposalsArr.map((current) => {
                                                    return (<>
                                                        <div className="row body d-flex align-items-center my-1">
                                                            <div className="col  p-1 text-capitalize">{current.client_id}</div>
                                                            <div className="col  p-1 text-capitalize">{current.name}</div>
                                                            <div className="col  p-1 text-capitalize">{current.status}</div>
                                                            <div className="col  p-1 text-capitalize">{current.catagory}</div>
                                                            <div className="col  p-1 text-capitalize">{current.revenue.toLocaleString()}</div>
                                                            <div className="col-md-2 col-2 p-1 text-capitalize">{new Date(current.date).toDateString()}</div>
                                                            <div className="col-md-2 col-2 p-1 text-capitalize d-flex align-items-center justify-content-center">

                                                                {(role == "admin") ? <>
                                                                    <Link to={`/dashboard/viewmore/${current._id}`} ><button className='btn  text-prime p-1  mx-md-2  ms-1 text-capitalize'><RemoveRedEyeIcon /></button></Link>
                                                                    <Link to={`/dashboard/edit/${current._id}`} ><button className='btn text-prime p-1 mx-md-2 ms-1 text-capitalize'><EditIcon /> </button></Link>
                                                                    <button className='btn text-prime p-1 mx-md-2 ms-1 text-capitalize shadow-none' onClick={() => { deleteHandleShow(current.client_id) }}><DeleteIcon /></button>
                                                                </> : <>
                                                                    <Link to={`/dashboard/viewmore/${current._id}`}><button className='btn  text-prime p-1  mx-md-2  ms-1 text-capitalize'><RemoveRedEyeIcon /></button></Link>
                                                                    <Link to={`/dashboard/edit/${current._id}`} ><button className='btn text-prime p-1 mx-md-2 ms-1 text-capitalize'><EditIcon /> </button></Link>
                                                                </>}


                                                            </div>
                                                        </div>
                                                    </>)
                                                }) : null



                                        }

                                        {/* <div className="row body d-flex align-items-center my-1">
                                            <div className="col  p-1 text-capitalize">1</div>
                                            <div className="col  p-1 text-capitalize">Client</div>
                                            <div className="col  p-1 text-capitalize">Active</div>
                                            <div className="col  p-1 text-capitalize">Employee</div>
                                            <div className="col  p-1 text-capitalize">$120</div>
                                            <div className="col-md-auto col-2 p-1 text-capitalize">12/03/2022</div>
                                            <div className="col-md-2 col-2 p-1 text-capitalize">

                                                <button className='btn  text-prime p-1  mx-md-2  ms-1 text-capitalize'><RemoveRedEyeIcon /></button>
                                                <button className='btn text-prime p-1 mx-md-2 ms-1 text-capitalize'><EditIcon /> </button>
                                                <button className='btn text-prime p-1 mx-md-2 ms-1 text-capitalize'><DeleteIcon /></button>

                                            </div>
                                        </div>
                                        <div className="row body d-flex align-items-center my-1">
                                            <div className="col  p-1 text-capitalize">1</div>
                                            <div className="col  p-1 text-capitalize">Client</div>
                                            <div className="col  p-1 text-capitalize">Active</div>
                                            <div className="col  p-1 text-capitalize">Employee</div>
                                            <div className="col  p-1 text-capitalize">$120</div>
                                            <div className="col-md-auto col-2 p-1 text-capitalize">12/03/2022</div>
                                            <div className="col-md-2 col-2 p-1 text-capitalize">

                                                <button className='btn  text-prime p-1  mx-md-2  ms-1 text-capitalize'><RemoveRedEyeIcon /></button>
                                                <button className='btn text-prime p-1 mx-md-2 ms-1 text-capitalize'><EditIcon /> </button>
                                                <button className='btn text-prime p-1 mx-md-2 ms-1 text-capitalize'><DeleteIcon /></button>

                                            </div>
                                        </div> */}


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
export default AllProposals;