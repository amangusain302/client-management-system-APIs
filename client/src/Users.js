import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/index.css";
import Header from './components/Header';
import PersonIcon from '@material-ui/icons/Person';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import ModalComponents from './components/Modal';
import { Modal, Button } from "react-bootstrap";
import { apiBase } from './functions/config';
import axios from 'axios';
import { addUserFun, deleteUserFun } from './functions/user';
import Loader from './components/Loader';
const Users = () => {
    const [show, setShow] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState("")
    const [showDelete, setShowDelete] = useState(false);
    const [name, setName] = useState("");
    const [addUserRes, setAddUserRes] = useState({});
    const [deleteUserRes, setDeleteUserRes] = useState({});
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [userArr, setUserArr] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => { setAddUserRes({}); setShow(true) };
    const deleteHandleClose = () => setShowDelete(false);
    const deleteHandleShow = (id) => { setDeleteUserId(id); setShowDelete(true); }
    const [loader, setLoader] = useState(false);
    const saveUser = async () => {


        let data = await addUserFun(name, password, cPassword);
        console.log(data);
        setAddUserRes(data);
        if (data.status) {
            handleClose();
        }

    }
    const deleteUser = async () => {
        let data = await deleteUserFun(deleteUserId);
        console.log(data);

        if (data.status) {
            setDeleteUserRes(data);
            deleteHandleClose();
        }

    }

    useEffect(async () => {

        console.log("all proposals API");
        setLoader(true);
        let data = await axios.get(`${apiBase}/user/users`);
        console.log(data.data.status)
        if (data.data.status) {
            setLoader(false);
            setUserArr(data.data.data);
        }
        

    }, [addUserRes, deleteUserRes])
    return (
        <>
            <Loader status={loader} />
            {/* Delete Modal */}
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
                    <button className=" btn btn-danger" onClick={deleteUser} >Delete</button>
                    <button className="btn border border-danger border-2 text-danger fw-bold " onClick={deleteHandleClose} >Cancel</button>

                </Modal.Footer>
            </Modal>
            {/* New user Modal */}
            <Modal className='modals' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        (addUserRes.status) ?
                            <>
                                <span className=" py-2 font-span text-center text-success text-capitalize d-block w-100">{addUserRes.message}</span>
                            </> :
                            <>
                                <span className="py-2  font-span text-center  text-danger text-capitalize d-block w-100">{addUserRes.message}</span>
                            </>
                    }


                    <div className="input-box my-md-1 my-2">
                        <div className="icon-box bg-prime d-flex align-items-center justify-content-center p-2">
                            <PersonOutlineOutlinedIcon className='text-light' />
                        </div>
                        <input type="text" className="p-2" placeholder="Client Name" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="input-box my-3  ">
                        <div className="icon-box bg-prime d-flex align-items-center justify-content-center p-2">
                            <LockOutlinedIcon className="text-light" />
                        </div>
                        <input type="password" className="p-2" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="input-box my-3  ">
                        <div className="icon-box bg-prime d-flex align-items-center justify-content-center p-2">
                            <LockOutlinedIcon className="text-light" />
                        </div>
                        <input type="password" className="p-2" placeholder="confirm Password" onChange={(e) => setCPassword(e.target.value)} />
                    </div>

                </Modal.Body>
                <Modal.Footer className="py-2">
                    <button className=" btn-prime bg-prime" onClick={saveUser} >Save</button>
                    <button className="btn-prime text-prime" onClick={handleClose} >Cancel</button>

                </Modal.Footer>
            </Modal>


            <div className="col-lg-10  m-0 p-md-3 p-2 full-height ">
                <Header />
                <div className="py-2 activity-container send">
                    <div className='col-12'>
                        <div className="activity-board recent-proposals  bg-light p-3">
                            <div className="heading mb-2 postion-sticky d-flex align-items-center justify-content-between">
                                <div>
                                    <PersonIcon className="me-1" /><span className="fw-bold">Users</span>
                                </div>
                                {/* <div className='col-4'>
                                    <div className="searchBox px-2 py-1">
                                        <input type="text" placeholder="Search User...." />
                                        <SearchIcon className="searchIcon" />
                                    </div>
                                </div> */}

                                <button className=' bg-prime  btn-prime me-3' onClick={handleShow}> Add new user</button>

                            </div>
                            <div className="table-container">
                                <div className="recent-proposals-table all-proposals-table p-2">
                                    <div className="row head ">
                                        <div className="col   p-1 fw-bold">Username</div>
                                        <div className="col p-1 fw-bold">Role</div>
                                        <div className="col p-1 fw-bold">CreatedOn</div>
                                        <div className="col  p-1 fw-bold text-center">Actions</div>
                                    </div>
                                    <div className="main-body">
                                        {
                                            userArr.map((user) => {
                                                return (<>

                                                    <div className="row body d-flex align-items-center my-1">
                                                        <div className="col  p-1 text-capitalize">{user.username}</div>
                                                        <div className="col  p-1 text-capitalize">{user.role}</div>
                                                        <div className="col  p-1 text-capitalize">{new Date(user.date).toDateString()}</div>
                                                        <div className="col p-1 text-capitalize d-flex align-items-center justify-content-center">
                                                            <button className='btn btn-prime bg-prime p-1 mx-md-2 ms-1 text-capitalize' onClick={() => deleteHandleShow(user._id)}>Delete</button>

                                                        </div>
                                                    </div>
                                                </>)
                                            })

                                        }




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
export default Users;