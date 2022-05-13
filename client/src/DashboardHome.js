import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import SideBar from "./components/DashboardSideBar";
import Header from "./components/Header";
import TimelineIcon from '@material-ui/icons/Timeline';
import WorkIcon from '@material-ui/icons/Work';
import SendIcon from '@material-ui/icons/Send';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AssistantPhotoIcon from '@material-ui/icons/AssistantPhoto';
import CloseIcon from '@material-ui/icons/Close';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import LineGraph from './components/LineGraph';
// import ToggleBar from "./components/ToggleBar";
import { recentProposalFun } from "./functions/proposals";
import Loader from "./components/Loader";
import { activityBoardFun } from "./functions/dashboard";
const DashboardHome = () => {
    const [recentProposal, setRecentProposal] = useState([]);
    const [loader, setLoader] = useState(false);
    const[create, setCreate] = useState(0);
    const[sent, setSent] = useState(0);
    const[view, setView] = useState(0);
    const[unsent, setUnSent] = useState(0);
    const[amountWon, setAmountWon] = useState(0);
    const[amountPending, setAmountPending] = useState(0);
    const arr = [
        {
            name: "client",
            revenue: "$12",
            createdOn: "12/12/2022"
        }
        ,
        {
            name: "client",
            revenue: "$12",
            createdOn: "12/12/2022"
        }
        , {
            name: "client",
            revenue: "$12",
            createdOn: "12/12/2022"
        }
        , {
            name: "client",
            revenue: "$12",
            createdOn: "12/12/2022"
        },
        {
            name: "client",
            revenue: "$12",
            createdOn: "12/12/2022"
        },
        {
            name: "client",
            revenue: "$12",
            createdOn: "12/12/2022"
        },
        {
            name: "client",
            revenue: "$12",
            createdOn: "12/12/2022"
        }
    ]
    useEffect(async () => {
        setLoader(true);
        let data = await recentProposalFun();

        if (data.status) {
            
            setRecentProposal(data.data);
            let fetchData = await activityBoardFun();
            if (fetchData.status) {
                setSent(fetchData.data.sent);
                setView(fetchData.data.view);
                setCreate(fetchData.data.create);
                setUnSent(fetchData.data.unsent);
                setAmountWon(fetchData.data.amount_won);
                setAmountPending(fetchData.data.pending);
                setLoader(false);
            }
        }

    }, [0])
    return (
        <>
            <Loader status={loader} />
            <div className="col-lg-10  m-0 p-md-3 p-2 full-height ">
                <Header />
                <div className="p-2 activity-container">
                    <div className="row  m-0 mt-2 p-0 ">
                        <div className="col-lg-5 ">
                            <div className="activity-board me-lg-3 bg-light p-3">
                                <div className="heading mb-2"><TimelineIcon className="me-1" /><span className="fw-bold">activity Board</span></div>
                                <div className="activities">
                                    <div className="activity mb-3 pb-1 pe-1 d-flex align-items-center">
                                        <div className="col-6 d-flex align-items-center justify-content-start">
                                            <WorkIcon className="mx-1" /><span className="">Created</span>
                                        </div>
                                        <div className="col-6 ">
                                            <span className="d-inline-block float-end fw-bold">{create}</span>
                                        </div>
                                    </div>
                                    <div className="activity mb-3 pb-1 pe-1 d-flex align-items-center">
                                        <div className="col-6 d-flex align-items-center justify-content-start">
                                            <SendIcon className="mx-1" /><span className="">Sent</span>
                                        </div>
                                        <div className="col-6 ">
                                            <span className="d-inline-block float-end fw-bold">{sent}</span>
                                        </div>
                                    </div>
                                    <div className="activity mb-3 pb-1 pe-1 d-flex align-items-center">
                                        <div className="col-6 d-flex align-items-center justify-content-start">
                                            <VisibilityIcon className="mx-1" /><span className="">View</span>
                                        </div>
                                        <div className="col-6 ">
                                            <span className="d-inline-block float-end fw-bold">{view}</span>
                                        </div>
                                    </div>
                                    {/* <div className="activity mb-3 pb-1 pe-1 d-flex align-items-center">
                                        <div className="col-6 d-flex align-items-center justify-content-start">
                                            <AssistantPhotoIcon className="mx-1" /><span className="">Won</span>
                                        </div>
                                        <div className="col-6 ">
                                            <span className="d-inline-block float-end fw-bold">12</span>
                                        </div>
                                    </div> */}
                                    <div className="activity mb-3 pb-1 pe-1 d-flex align-items-center">
                                        <div className="col-6 d-flex align-items-center justify-content-start">
                                            <CloseIcon className="mx-1" /><span className="">Unsent</span>
                                        </div>
                                        <div className="col-6 ">
                                            <span className="d-inline-block float-end fw-bold">{unsent}</span>
                                        </div>
                                    </div>
                                    <div className="activity mb-3 pb-1 pe-1 d-flex align-items-center">
                                        <div className="col-6 d-flex align-items-center justify-content-start">
                                            <MoneyIcon className="mx-1" /><span className="">Amount won</span>
                                        </div>
                                        <div className="col-6 ">
                                            <span className="d-inline-block float-end fw-bold">${amountWon.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <div className="activity mb-3 pb-1 pe-1 d-flex align-items-center">
                                        <div className="col-6 d-flex align-items-center justify-content-start">
                                            <MoneyIcon className="mx-1" /><span className="">Amount Pending</span>
                                        </div>
                                        <div className="col-6 ">
                                            <span className="d-inline-block float-end fw-bold">${amountPending.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7 mt-lg-auto mt-3">
                            <div className="activity-board recent-proposals ms-lg-3 bg-light p-3">
                                <div className="heading mb-2"><WorkIcon className="me-1" /><span className="fw-bold">Recent Proposals</span></div>
                                <div className="table-container">
                                    <div className="recent-proposals-table p-2">
                                        <div className="row head ">
                                            <div className="col-3 p-1 fw-bold">Name</div>
                                            <div className="col-3 p-1 fw-bold">Revenue</div>
                                            <div className="col-3 p-1 fw-bold">Created On</div>
                                            <div className="col-3 p-1 fw-bold text-center">Action</div>
                                        </div>
                                        <div className="main-body">
                                            {
                                                recentProposal.map((current) => {
                                                    return (
                                                        <>
                                                            <div className="row body d-flex align-items-center my-1">
                                                                <div className="col-3 p-1 text-capitalize">{current.name}</div>
                                                                <div className="col-3 p-1 text-capitalize">{current.revenue.toLocaleString()}</div>
                                                                <div className="col-3 p-1 text-capitalize">{new Date(current.date).toDateString()}</div>
                                                                <div className="col-3 p-1 text-capitalize text-center">
                                                                    <Link to={`./viewmore/${current._id}`}><button className="btn bg-prime p-1  d-inline-block  shadow-none">View More</button></Link>
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
                    <div className="row  mt-4">
                        <div className="col">
                            <div className="stats-box">
                                <div className="heading mb-2"><TimelineIcon className="me-1" /><span className="fw-bold">Statistics</span></div>
                                <div className="small d-block text-center"><span className=" fw-bold">Revenue</span></div>
                                <div className=" m-2 overflow-auto">
                                    <LineGraph />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default DashboardHome;