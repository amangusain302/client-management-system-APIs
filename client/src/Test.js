import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SendIcon from '@material-ui/icons/Send';
const Test = () => {
    return (
        <>
            <div className="col-12 d-md-none d-block">
                <nav className="Toggle-nav-bar">
                    <ul>
                        <li className="Navlinks active "> <span><DashboardIcon /> Dashboard </span></li>
                        <li className="Navlinks"><span ><AddBoxIcon /> Add New Proposal</span></li>
                        <li className="Navlinks"> <span ><SendIcon /> Send</span></li>
                        <li className="Navlinks "> <span><AssessmentIcon /> Analytics</span></li>
                    </ul>
                </nav>
            </div>
        </>
    )
}
export default Test;