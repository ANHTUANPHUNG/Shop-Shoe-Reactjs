import React, { Fragment, useState } from 'react';
import './App.css';
import ShowFunction from './components/Show';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductShop from './components/shopShoe/productClient/ProductShop';
function App() {


  return (
    <Fragment>
      <ToastContainer autoClose={3000} theme='colored' />
      <ProductShop />
    </Fragment>
  );
}

export default App;
