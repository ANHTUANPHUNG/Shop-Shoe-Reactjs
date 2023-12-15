import React, { Fragment, useState } from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductShop from './components/shopShoe/productClient/ProductShop';
import { Route, Routes } from 'react-router-dom';
import ProductDetail from './components/shopShoe/productDetail/ProductDetail';

import Page404 from './components/shopShoe/Page404';
import { BillDashboard } from './components/shopShoe/dashboard/billDashboard/BillDashboard';
import { ProductDashboard } from './components/shopShoe/dashboard/productDashboard/ProductDashboard';

function App() {

  return (
    <Fragment>
      <ToastContainer autoClose={3000} theme='colored' />
      <Routes>
        <Route path='/' element={<ProductShop/>}></Route>
        <Route path='/cartUser' element={<ProductDetail/>}></Route>
        <Route path='/dashboard' element={<BillDashboard/>}/>
        <Route path='/dashboard/product' element={<ProductDashboard/>}/>
        
        <Route path='*' element={<Page404 />} ></Route>
      </Routes>
    </Fragment>
  );
}

export default App;
