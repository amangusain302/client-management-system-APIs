import React, { useEffect } from "react";
import '../css/index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SendIcon from '@material-ui/icons/Send';
import CloseIcon from "@material-ui/icons/Close";
import DescriptionIcon from '@material-ui/icons/Description';
import ReceiptIcon from '@material-ui/icons/Receipt';
import PersonIcon from '@material-ui/icons/Person';
import { Link, useLocation } from "react-router-dom";
const ToggleBar = (props) => {
    const location = useLocation();
    const closeToggle = (e) => {
        document.getElementsByClassName('Toggle-nav-bar')[0].style = "transform: translateX(-100%) ";
    }
    // useEffect(() => {
    //     let navLinks = document.getElementsByClassName('Navlinks');

    //     for (let i = 0; i < navLinks.length; i++) {
    //         if (i !== props.active) {
    //             navLinks[i].classList.remove("active");
    //         }
    //         else {
    //             navLinks[i].classList.add("active");
    //         }
    //     }
    // })
    const mobactiveLink = (id) => {
        console.log(id);
        let menuLinks = document.getElementsByClassName('Navlinks');
        for (let i = 0; i < menuLinks.length; i++) {
            
            menuLinks[i].classList.remove('active');
            console.log(menuLinks[i]);
        }
        console.log(id);
        // document.getElementById(id).classList.add('active');

    }
    useEffect(() => {
        switch (location.pathname) {
            case "/dashboard":
                mobactiveLink("mobdashboardLink")
                break;
            case "/dashboard/proposals":
                mobactiveLink("moballProposalsLinks")
                break;
            case "/dashboard/newproposals":
                mobactiveLink("mobnewProposals")
                break;
            case "/dashboard/send":
                mobactiveLink("mobsendLink")
                break;
            case "/dashboard/email":
                mobactiveLink("mobsendLink")
                break;
            case "/dashboard/invoice":
                mobactiveLink("mobinvoiceLink")
                break;
            case "/dashboard/analytics":
                mobactiveLink("mobanalyticsLink")
                break;
            case "/dashboard/users":
                mobactiveLink("mobusersLink")
                break;

            default:
                mobactiveLink("mobusersLink")

        }
    },[0]);

    return (
        <>
            <div className="col-12 d-md-none d-block">
                <nav className="Toggle-nav-bar">
                    <div className="d-flex mt-2 align-items-center ">
                        <div className="rounded-circle  d-inline-block m-2 " onClick={closeToggle}>
                            <CloseIcon className="m-2 text-light fs-3" />
                        </div>
                    </div>
                    <ul>
                        <Link to="/dashboard" ><li className="Navlinks" id="mobdashboardLink"> <span><DashboardIcon /> Dashboard </span></li></Link>
                        <Link to="/dashboard/proposals" ><li className="Navlinks  " id="moballProposalsLinks"> <span>< DescriptionIcon /> AllProposals </span></li></Link>
                        <Link to="/dashboard/newproposals" ><li className="Navlinks" id="mobnewProposals"><span ><AddBoxIcon /> Add New Proposal</span></li></Link>
                        <Link to="/dashboard/send" ><li className="Navlinks" id="mobsendLink"> <span ><SendIcon /> Send</span></li></Link>
                        {
                            (props.role === "admin") ? <>
                                <Link to="/dashboard/invoice" ><li className="Navlinks  " id="mobinvoiceLink"> <span><ReceiptIcon /> Create Invoice </span></li></Link>
                                <Link to="/dashboard/analytics" ><li className="Navlinks " id="mobanalyticsLink" > <span><AssessmentIcon /> Analytics</span></li></Link>
                                <Link to="/dashboard/users" ><li className="Navlinks " id="mobusersLink" > <span><PersonIcon /> Users </span></li></Link>
                            </> : null
                        }


                    </ul>
                </nav>
            </div>
        </>
    )
}
export default ToggleBar;