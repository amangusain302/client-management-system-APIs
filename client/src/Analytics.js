import React from 'react';
import "./css/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ToggleBar from './components/ToggleBar';
import Header from './components/Header';
import SideBar from './components/DashboardSideBar';
import LineGraph from './components/LineGraph';
import TimelineIcon from '@material-ui/icons/Timeline';
// import SendIcon from '@material-ui/icons/Send';
// import PersonOutlineOutlined from '@material-ui/icons/PersonOutlineOutlined';
// import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
// import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
// import CategoryIcon from '@material-ui/icons/Category';
// import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
// import EmailIcon from '@material-ui/icons/Email';
// import AccountIcon from '@material-ui/icons/AccountBalance';
// import LocationOn from '@material-ui/icons/LocationOn';
// import BussinessIcon from '@material-ui/icons/Business';
// import WorkIcon from '@material-ui/icons/Work';
const Analytics = () => {
    return (
        <>  <div className="col-lg-10  m-0 p-md-3 p-2 full-height ">
            <Header />
            <div className="py-2 activity-container send">
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
                <div className="row  mt-4">
                    <div className="col">
                        <div className="stats-box">
                            <div className="heading mb-2"><TimelineIcon className="me-1" /><span className="fw-bold">Statistics</span></div>
                            <div className="small d-block text-center"><span className=" fw-bold">Proposals Sends</span></div>
                            <div className=" m-2 overflow-auto">
                                <LineGraph />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row  mt-4">
                    <div className="col">
                        <div className="stats-box">
                            <div className="heading mb-2"><TimelineIcon className="me-1" /><span className="fw-bold">Statistics</span></div>
                            <div className="small d-block text-center"><span className=" fw-bold">Created</span></div>
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
export default Analytics;