import React, { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import './css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from "./components/DashboardSideBar";
import ToggleBar from "./components/ToggleBar";
import DashboardHome from "./DashboardHome";
import Send from "./Send";
import NewProposals from "./NewProposal";
import AllProposals from "./AllProposals";
import WriteEmail from "./WriteEmail";
import Invoice from "./Invoice";
import Analytics from "./Analytics";
import Users from "./Users";
import jwt_decode from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addState } from "./state/actions";
import { verifyUser } from "./functions/user";
// import jwt_decode from 'jwt_decode';

const Dashboard = () => {
    // console.log(props.role);
    const nav = useNavigate();
    const dispatch = useDispatch();
    const [role, setRole] = useState("admin");
    useEffect(() => {
        verifyUser();
        let token = window.localStorage.getItem('userToken');
        console.log(token)
        if (token !== null) {
            let decode = jwt_decode(token)
            console.log(decode);
            setRole(decode.role);
            if (decode.username === null) {
                dispatch(addState({ user: decode }))
                console.log("not logined")

            }
            else {
                console.log("logined")
            }
        }
        else {

            nav("../");
        }

    })
    return (
        <>
            <ToggleBar role={role} />
            <div className="container-fluid full-height bg-dashboard-base-color">
                <div className="row m-0 p-0">
                    <div className="col-lg-2 d-lg-block d-none  m-0  p-2 full-height ">

                        <SideBar role={role} />
                    </div>
                    <Routes>
                        <Route exact path='/' element={<DashboardHome />}></Route>
                        <Route exact path='/newproposals' element={<NewProposals use={"insertion"} />}></Route>
                        <Route exact path='/send' element={<Send />}></Route>
                        <Route path='/proposals' element={<AllProposals />}></Route>
                        <Route path='/email/:id' element={<WriteEmail />}></Route>
                        <Route path='/viewmore/:id' element={<NewProposals use={"view"} />}></Route>
                        <Route path='/edit/:id' element={<NewProposals use={"updation"} />}></Route>
                        <Route path='/invoice' element={<Invoice />}></Route>
                        <Route path='/analytics' element={<Analytics />}></Route>
                        <Route path='/users' element={<Users />}></Route>
                    </Routes>

                </div>
            </div>
        </>
    )
}
export default Dashboard;