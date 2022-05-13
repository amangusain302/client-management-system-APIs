import React ,{useEffect, useState} from 'react';
import "./css/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import ToggleBar from './components/ToggleBar';
import Header from './components/Header';
// import SideBar from './components/DashboardSideBar';
import ReceiptIcon from '@material-ui/icons/Receipt';
// import SendIcon from '@material-ui/icons/Send';
// import {Link} from 'react-router-dom';
import PersonOutlineOutlined from '@material-ui/icons/PersonOutlineOutlined';
// import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
// import AddBox from '@material-ui/icons/AddBox';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import StickyNote2Icon from '@material-ui/icons/Notes';
import AddIcon from '@material-ui/icons/Add';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import {allProposalsFun} from './functions/proposals';
// import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
// import CategoryIcon from '@material-ui/icons/Category';
// import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
// import EmailIcon from '@material-ui/icons/Email';
// import AccountIcon from '@material-ui/icons/AccountBalance';
// import LocationOn from '@material-ui/icons/LocationOn';
// import BussinessIcon from '@material-ui/icons/Business';
// import WorkIcon from '@material-ui/icons/Work';
// import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
// import EditIcon from '@material-ui/icons/Edit';
// import DeleteIcon from '@material-ui/icons/Delete';
const Invoice = () => {
    const [clients, setClients] = useState([]);
    const [clientName, setClientName] = useState("");

    useEffect(  async()=>{
        let data = await allProposalsFun();
        if(data.status){
            console.log(data.data);
            data.data.map((client)=>{
                setClients(clients => clients.concat(client.name))
            })
            console.log(clients);
        }
        
    },[0]);
    return (
        <>  
            <div className="col-lg-10  m-0 p-md-3 p-2 full-height ">
                        <Header />
                        <div className="py-2 activity-container send">
                            <div className='col-12'>
                                <div className="activity-board recent-proposals  bg-light p-3">
                                    <div className='heading d-flex align-items-center'>
                                        <h5 className='ms-1 fw-bold text-capitalize'><ReceiptIcon /> Create Invoice</h5>
                                    </div>
                                    <div className='row py-3'>
                                        <div className='col-md-6 px-md-3 px-1'>
                                            <span className='fw-bold d-inline-block mb-1'>Select Client</span>
                                            <div className="input-box mb-md-3 mb-2">

                                                <div className="icon-box bg-prime d-flex align-items-center justify-content-center p-2">
                                                    <PersonOutlineOutlined className='text-light' />
                                                </div>
                                                <select className='border-none form-select p-2 text-secondary' onChange={(e)=>setClientName(e.target.value)} >
                                                <option value={""}>Select Client</option>
                                                    {
                                                        clients.map((clientName)=>{
                                                            return(
                                                                <>
                                                                <option value={clientName} className="text-capitalize">{clientName}</option>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className='col-md-6 px-md-3 px-1'>
                                            <span className='fw-bold d-inline-block mb-1'>Client Name</span>
                                            <div className="input-box mb-md-3 mb-2">
                                                <div className="icon-box bg-prime d-flex align-items-center justify-content-center p-2">
                                                    <PersonOutlineOutlined className='text-light' />
                                                </div>
                                                <input type="text" className="p-2" value={clientName} placeholder="Client Name" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row py-3'>
                                        <div className='col-md-6 px-md-3 px-1'>
                                            <span className='fw-bold d-inline-block mb-1'>Invoice Date</span>
                                            <div className="input-box mb-md-3 mb-2">
                                                <div className="icon-box bg-prime d-flex align-items-center justify-content-center p-2">

                                                    <CalendarTodayIcon className='text-light' />
                                                </div>
                                                <input type="date" className="p-2 form-control" />
                                            </div>
                                        </div>
                                        <div className='col-md-6 px-md-3 px-1'>
                                            <span className='fw-bold d-inline-block mb-1'>Invoice Number</span>
                                            <div className="input-box mb-md-3 mb-2">
                                                <div className="icon-box bg-prime d-flex align-items-center justify-content-center p-2">
                                                    <ReceiptIcon className='text-light' />
                                                </div>
                                                <input type="text" className="p-2" placeholder="Invoice Number" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row py-3'>
                                        <div className='col-md-6 px-md-3 px-1'>
                                            <span className='fw-bold d-inline-block mb-1'>Due Date</span>
                                            <div className="input-box mb-md-3 mb-2">
                                                <div className="icon-box bg-prime d-flex align-items-center justify-content-center p-2">

                                                    <CalendarTodayIcon className='text-light' />
                                                </div>
                                                <input type="date" className="p-2 form-control" />
                                                {/* <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/> */}
                                            </div>
                                        </div>
                                        <div className='col-md-6 px-md-3 px-1'>
                                            <span className='fw-bold d-inline-block mb-1'>Order No.</span>
                                            <div className="input-box mb-md-3 mb-2">
                                                <div className="icon-box bg-prime d-flex align-items-center justify-content-center p-2">
                                                    <ReceiptIcon className='text-light' />
                                                </div>
                                                <input type="text" className="p-2" placeholder="Order Number" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row py-3'>
                                        <div className='col-md-6 px-md-3 px-1'>
                                            <span className='fw-bold d-inline-block mb-1'>Item Name</span>
                                            <div className="input-box mb-md-3 mb-2">
                                                <div className="icon-box bg-prime d-flex align-items-center justify-content-center p-2">
                                                    <LocalMallIcon className='text-light' />
                                                </div>
                                                <input type="text" className="p-2" placeholder="Item Name" />
                                            </div>
                                        </div>
                                        <div className='col-md-6 px-md-3 px-1'>
                                            <span className='fw-bold d-inline-block mb-1'>Price</span>
                                            <div className="input-box mb-md-3 mb-2">
                                                <div className="icon-box bg-prime d-flex align-items-center justify-content-center p-2">
                                                    <AttachMoneyIcon className='text-light' />
                                                </div>
                                                <input type="text" className="p-2" placeholder="Price" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row py-3'>
                                        <div className='col-md-6 px-md-3 px-1'>
                                            <span className='fw-bold d-inline-block mb-1'>Descrption</span>
                                            <div className="input-box mb-md-3 mb-2">
                                                <div className="icon-box bg-prime d-flex align-items-center justify-content-center p-2">
                                                    <StickyNote2Icon className='text-light' />
                                                </div>
                                                <input type="text" className="p-2" placeholder="Description" />
                                            </div>
                                        </div>
                                        <div className='col-md-6 px-md-3 px-1'>
                                            <span className='fw-bold d-inline-block mb-1'>Quantity</span>
                                            <div className="input-box mb-md-3 mb-2">
                                                <div className="icon-box bg-prime d-flex align-items-center justify-content-center p-2">
                                                    <AddIcon className='text-light' />
                                                </div>
                                                <input type="text" className="p-2" placeholder="Price" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row py-3'>
                                        <div className='col-12 p-0 px-md-2'>
                                            <button className='  w-100 btn btn-prime  bg-prime float-end'>Download Invoice</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        </>
    )
}
export default Invoice;