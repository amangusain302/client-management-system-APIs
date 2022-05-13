import React, { useEffect, useState } from 'react';
import '../css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import loader from '../css/loader.svg';
const Loader = (props)=>{
    const [ display, setDisplay] = useState('d-none');
    useEffect(()=>{
        if(props.status){
            setDisplay('d-flex')
        }
        else{
            setDisplay('d-none')
        }
    });
    return(
        <>
            <div className={`loaderContainer ${display}  align-items-center justify-content-center`}>
                    <img src={loader} />
            </div>
        </>
    )
}

export default Loader;