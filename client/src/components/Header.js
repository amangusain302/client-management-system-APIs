import React, { useEffect, useState } from "react";
import '../css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import {  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../functions/setToken";
import jwtDecode from "jwt-decode";
const Header = () => {
    
    const [userName, setUserName ] = useState("");
    const nav = useNavigate();
    const popUpProfile = () => {
        let profile = document.getElementById('profile');
        if (profile.classList.contains('active')) {
            profile.classList.remove('active');
        }
        else {
            profile.classList.add('active');
        }
    }
    const openToggle = ()=>{
        document.getElementsByClassName('Toggle-nav-bar')[0].style="transform: translateX(0%)";
    }
    const logout = ()=>{
        console.log("logout");
        window.localStorage.removeItem('userToken');
        nav("../");
    }
    useEffect(()=>{
        if(!(setToken())){
            nav("../");
        }else{
            let token = window.localStorage.getItem("userToken");
            let decode = jwtDecode(token);
            setUserName(decode.username);
        }
    })
    return (
        <>
            
            <div className="header mb-md-2 mb-1 p-md-3 p-2">
                <div className="col-lg-4 col-2 d-flex align-items-center">
                    <div className="d-lg-none d-inline-block me-3" onClick={openToggle}><MenuIcon className="hamburger" /></div>
                    <h3 className="d-lg-block d-none text-capitalize">Welcome, {userName} </h3>
                </div>
                <div className="col-md-4 col-8">
                    {/* <div className="searchBox px-3 py-2">
                        <input type="text" placeholder="Search Proposals...." />
                        <SearchIcon className="searchIcon" />
                    </div> */}
                </div>
                <div className="col-md-4 col-2 position-relative">
                    <PersonIcon className="float-end user-icon" onClick={popUpProfile} />
                    <div className="profile py-2 px-1 m-0" id="profile">
                        <ul>
                            {/* <li className="mb-1 pb-1 ms-2 me-3"><PersonIcon className="me-2 text-light" />Profile</li> */}
                            <li className="mb-1 pb-1 ms-2 me-3" onClick={logout}><LogoutIcon className="me-2 text-light"  />Logout</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Header;