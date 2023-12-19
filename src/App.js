import React, { Fragment } from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import { TestModule } from './components/TestModule';


function App() {

  return (
    <Fragment>
      <ToastContainer autoClose={3000} theme='colored' />
      <Routes>
        <Route path='/' element={<TestModule/>}></Route>
        
      </Routes>
    </Fragment>
  );
}

export default App;
