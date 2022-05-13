import jwtDecode from "jwt-decode";

const setToken = () => {
    let token = window.localStorage.getItem('userToken');
    if (token !== null) {
        return true
    }
    else {
        return false
    }

}

const getToken = () => {
    let token = window.localStorage.getItem('userToken');
    if (token !== null) {
        let decode = jwtDecode(token);
        return decode;
    }
    else {
        return false
    }

}
export {setToken, getToken};