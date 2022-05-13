import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import '../css/index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import DashboardIcon from '@material-ui/icons/Dashboard';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SendIcon from '@material-ui/icons/Send';
import DescriptionIcon from '@material-ui/icons/Description';
import ReceiptIcon from '@material-ui/icons/Receipt';
import PersonIcon from '@material-ui/icons/Person';
import jwt_decode from 'jwt-decode';
// import {findDomNode} from 'react-dom';
// import $ from 'jquery';

const SideBar = (props) => {
    const ref = useRef()
    console.log(props.role);
    const [role, setRole] = useState(" ");
    const location = useLocation();
    const activeLink = (id,event) => {

        let menuLinks = document.getElementsByClassName('menu-links');
        for (let i = 0; i < menuLinks.length; i++) {
            menuLinks[i].classList.remove('active');
        }
        console.log(id)
        console.log(document.getElementById(id))
        // ref.current=event.target;
        // console.log(ref.current)
        document.getElementById(id).classList.add('active');

    }
    useEffect(() => {
        let token = window.localStorage.getItem('userToken');
        console.log(token);
        let decode = jwt_decode(token);
        console.log(decode.role);
        let user = decode.role;
        setRole(user);
    }, [0])
    useEffect(() => {
        switch (location.pathname) {
            case "/dashboard":
                activeLink("dashboardLink")
                break;
            case "/dashboard/proposals":
                activeLink("allProposalsLinks")
                break;
            case "/dashboard/newproposals":
                activeLink("newProposals")
                break;
            case "/dashboard/send":
                activeLink("sendLink")
                break;
            case "/dashboard/email":
                activeLink("sendLink")
                break;
            case "/dashboard/invoice":
                activeLink("createInvoiceLink")
                break;
            case "/dashboard/analytics":
                activeLink("analysis")

                break;
            case "/dashboard/users":
                activeLink("user")

                break;
            default:

        }

        // console.log(location.pathname);
    }, [0]);



    return (
        <>

            <div className=" d-lg-block d-none h-100 bg-prime sideBar p-3 ">
                <div className="space"></div>
                <Link to="/dashboard" className=" text-decoration-none text-white" >
                    <div className="menu-links mb-2 " id="dashboardLink" onClick={() => { activeLink("dashboardLink") }} >
                        <DashboardIcon />
                        <span >Dashboard</span>
                    </div>
                </Link>
                {

                    <Link to="/dashboard/proposals" className="text-decoration-none text-white" >
                        <div className="menu-links mb-2" id="allProposalsLinks" onClick={() => { activeLink("allProposalsLinks") }}>
                            <DescriptionIcon />
                            <span>All Proposals</span>
                        </div>
                    </Link>


                }

                <Link to="/dashboard/newproposals" className="text-decoration-none text-white" >
                    <div className="menu-links mb-2" id="newProposals" onClick={() => activeLink("newProposals")} >
                        <AddBoxIcon />
                        <span onClick={null}>New Proposal</span>
                    </div>
                </Link>
                <Link to="/dashboard/send" className="text-decoration-none text-white" >
                    <div className="menu-links mb-2" id="sendLink" onClick={() => activeLink("sendLink")} >
                        <SendIcon />
                        <span>Send</span>
                    </div>
                </Link>
                {
                    (props.role === "admin") ?
                     <>
                        <Link to="/dashboard/invoice" className="text-decoration-none text-white" >
                            <div className="menu-links mb-2" id="createInvoiceLink" onClick={() => { activeLink("createInvoiceLink") }} >
                                <ReceiptIcon />
                                <span>Create Invoice</span>
                            </div>
                        </Link>
                        <Link to="/dashboard/analytics" className="text-decoration-none text-white" >
                            <div className="menu-links mb-2" id="analysis" onClick={() => { activeLink("analysis") }} >
                                <AssessmentIcon />
                                <span>Analytics</span>
                            </div>
                        </Link>
                        <Link to="/dashboard/users" className="text-decoration-none text-white" >
                            <div className="menu-links mb-2" id="user" onClick={(e) => { activeLink("user",e) }} >
                                <PersonIcon />
                                <span>Users</span>
                            </div>
                        </Link>
                    </> 
                    : null
                }


            </div>
        </>
    )
}
export default SideBar;