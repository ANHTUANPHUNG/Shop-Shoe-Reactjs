import React, { Fragment } from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import Recommended from './components/Recommended/Recommended';
import Navbar from './components/Navbar/Navbar';
import Products from './components/Products/Products';
import Sidebar from './components/Sidebar/Sidebar';


function App() {

  return (
    <div className='container d-flex'>
    <Sidebar/>
    <div className='d-flex flex-column flex-grow-1'>
      <Navbar />
      <Recommended />
      <Products />
    </div>
  </div>
  );
}

export default App;
