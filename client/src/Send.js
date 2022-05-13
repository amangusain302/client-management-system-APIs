import React, { useEffect, useState } from 'react';
import "./css/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ToggleBar from './components/ToggleBar';
import Header from './components/Header';
import SideBar from './components/DashboardSideBar';
import SendIcon from '@material-ui/icons/Send';
import { Link } from 'react-router-dom';
import { allProposalsFun } from './functions/proposals';
import Loader from './components/Loader';
// import PersonOutlineOutlined from '@material-ui/icons/PersonOutlineOutlined';
// import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
// import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
// import CategoryIcon from '@material-ui/icons/Category';
// import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import EmailIcon from '@material-ui/icons/Email';
import SearchIcon from '@material-ui/icons/Search';
import { searchProposalFun } from './functions/proposals';
// import AccountIcon from '@material-ui/icons/AccountBalance';
// import LocationOn from '@material-ui/icons/LocationOn';
// import BussinessIcon from '@material-ui/icons/Business';
// import WorkIcon from '@material-ui/icons/Work';

const Send = () => {
    const [searchKey, setSearchKey] = useState("");
    const [proposalsArr, setProposalsArr] = useState([]);
    const [loader, setLoader] = useState(false);
    const arr = [
        {
            name: "client",
            revenue: "$12",
            createdOn: "12/06/2022"
        },
        {
            name: "client",
            revenue: "$12",
            createdOn: "12/06/2022"
        },
        {
            name: "client",
            revenue: "$12",
            createdOn: "12/06/2022"
        },
        {
            name: "client",
            revenue: "$12",
            createdOn: "12/06/2022"
        }
    ]

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

    useEffect(() => {
        setLoader(true);
        allProposalsFun().then((res) => {
            console.log(res);
            if (res.status) {
                setLoader(false)
                setProposalsArr(res.data);
            }

            // dispatch(addState(res.data));
        }).catch((error) => {
            alert(error)
        });
    }, [0])
    return (
        <>
            <Loader status={loader} />
            <div className="col-lg-10  m-0 p-md-3 p-2 full-height ">
                <Header />
                <div className="py-2 activity-container send">
                    <div className='col-12'>
                        <div className="activity-board recent-proposals  bg-light p-3">
                            <div className="heading mb-2 d-flex align-items-center justify-content-between">
                                <div><SendIcon className="me-1" /><span className="fw-bold">Send Proposals</span></div>
                                <div className="col-4 p-0">
                                    <div className="searchBox px-2 py-1">
                                        <input type="text" placeholder="Search Proposals...." value={searchKey} onChange={(e) => setSearchKey(e.target.value)} />
                                        <SearchIcon className="searchIcon" onClick={searchProposal} />
                                    </div>
                                </div>
                            </div>
                            <div className="table-container">
                                <div className="recent-proposals-table p-2">
                                    <div className="row head ">
                                        <div className="col-3 p-1 fw-bold">Name</div>
                                        <div className="col-3 p-1 fw-bold">Revenue</div>
                                        <div className="col-3 p-1 fw-bold">Created On</div>
                                        <div className="col-3 p-1 fw-bold">Action</div>
                                    </div>
                                    <div className="main-body">
                                        {
                                            proposalsArr.map((current) => {
                                                return (
                                                    <>
                                                        <div className="row body d-flex align-items-center my-1">
                                                            <div className="col-3 p-1 text-capitalize">{current.name}</div>
                                                            <div className="col-3 p-1 text-capitalize">{current.revenue}</div>
                                                            <div className="col-3 p-1 text-capitalize">{new Date(current.date).toDateString()}</div>
                                                            <div className="col-3 p-1 text-capitalize">
                                                                <Link to={`/dashboard/email/${current._id}`}><button className="btn bg-prime p-1  d-flex align-items-center  px-3 fw-bold py-1 shadow-none"><EmailIcon className='me-1' /> Send</button></Link>
                                                            </div>
                                                        </div>
                                                    </>
                                                )
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
export default Send;