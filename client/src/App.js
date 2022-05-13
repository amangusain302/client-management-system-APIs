import React from 'react';
// import ReactDom from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Dashboard from './Dashboard';
import { Route, Routes } from 'react-router-dom';
import EmailPage from './ClientEmail'
import ViewEmail from './ViewEmail';

function App() {
  return (
    <>
      
      <Routes>
        <Route  path='/' element={<Login role={"user"} />}></Route>
        <Route path='/admin' element={<Login role={"admin"} />}></Route>
        <Route path='/dashboard/*'  element={<Dashboard  />}></Route>
        <Route path='/client/:id' element={<EmailPage/>}></Route>
        <Route path ='/mail/:id' element={<ViewEmail/>} ></Route>
        {/* <Route path = '/loader' element={<Loader/>} /> */}
      </Routes>


    </>
  );
}

export default App;
