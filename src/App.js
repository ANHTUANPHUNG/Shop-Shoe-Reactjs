import React, { Fragment } from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import { TestModule } from './components/TestModule';
import { AddUser } from './components/AddUser';
import { UpdateUser } from './components/UpdateUser';
import { Deposit } from './components/Deposit';
import { Withdraw } from './components/Withdraw';
import { Transfer } from './components/Transfer';
import { TransferHistory } from './components/TransferHistory';


function App() {

  return (
    <Fragment>
      <ToastContainer autoClose={1000} theme='colored' />
      <Routes>
        <Route path='/' element={<TestModule/>}></Route>
        <Route path='/addUser' element={<AddUser/>}></Route>
        <Route path='/updateUser/:id' element={<UpdateUser/>}></Route>
        <Route path='/deposit/:id' element={<Deposit/>}></Route>
        <Route path='/withdraw/:id' element={<Withdraw/>}></Route>
        <Route path='/transfer/:id' element={<Transfer/>}></Route>
        <Route path='/transferHistory' element={<TransferHistory/>}></Route>
        
      </Routes>
    </Fragment>
  );
}

export default App;
