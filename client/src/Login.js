import React, { useEffect, useState } from "react";
import './css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { UserLoginFun } from "./functions/user";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { addState } from "./state/actions";
import jwt_decode from 'jwt-decode';
import Loader from "./components/Loader";
// import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const data = useSelector(state => state);
    const dispatch = useDispatch();
    const nav = useNavigate();
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loader, setLoader] = useState(false);
    const getUser = (event) => {
        setUser(event.target.value);
    }
    const getPassword = (event) => {
        setPassword(event.target.value);
    }
    const userLogin = async () => {

        // nav('/dashboard');
        let result;
        if (props.role !== "admin") {
            result = await UserLoginFun(user, password, "user")
        }
        else {
            result = await UserLoginFun(user, password, "admin")
        }
        setLoader(true);
        console.log(result);
        setTimeout(()=>{
            if (result.status) {
                setLoader(false);
                // console.log(decodeToken);
                window.localStorage.setItem("userToken", result.data.token);
                dispatch(addState({ user: result.data }));
                nav('/dashboard');
            } else {
                setLoader(false);
                setErrorMessage(result.message);
            }
        },500)
        
    }
    useEffect(() => {
        console.log(data);

    });
    return (
        <>
            <Loader status={loader} />

            <div className="full-height container-fluid bg-prime d-flex align-items-center justify-content-center">
                <div className="login-box">
                    <h2 className="text-light fw-bold mb-3 text-center">{(props.role !== 'admin') ? <>Welcome to CMS</> : <>Admin</>}</h2>
                    <div className="login-form p-4 bg-light">
                        <span className="error-message text-decoration-none text-danger mb-2   text-center">User does not found </span>
                        <h4 className="text-center mt-2 mb-3 fw-bold">Login</h4>

                        <div className="input-box my-3">
                            <div className="icon-box bg-sec d-flex align-items-center justify-content-center p-2">
                                <PersonOutlineOutlinedIcon className="text-light" />
                            </div>
                            <input type="text" className="p-2" placeholder="Type Username" onChange={getUser} />
                        </div>
                        <div className="input-box my-3  ">
                            <div className="icon-box bg-sec d-flex align-items-center justify-content-center p-2">
                                <LockOutlinedIcon className="text-light" />
                            </div>
                            <input type="password" className="p-2" placeholder="Type Password" onChange={getPassword} />
                        </div>

                        <button className="btn  w-100 p-2 mb-2 login-btn shadow-none" onClick={userLogin}>Login</button>
                        {
                            (props.role !== "admin") ?
                                <>
                                    <Link to='/admin' className=" text-decoration-none   d-block text-center">Login as admin</Link>
                                </> :
                                <>
                                    <Link to='../' className=" text-decoration-none   d-block text-center">Login as user</Link>
                                </>
                        }

                        <span className="d-block text-danger text-center">{errorMessage}</span>

                    </div>
                </div>
            </div>
        </>

    )
}
export default Login;