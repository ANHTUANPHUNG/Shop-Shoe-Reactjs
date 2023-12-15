import React, { Fragment, useState } from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductShop from './components/shopShoe/productClient/ProductShop';
import { Route, Routes } from 'react-router-dom';
import ProductDetail from './components/shopShoe/productDetail/ProductDetail';
import newData from "../src/components/data.json"
import Page404 from './components/shopShoe/Page404';
import { BillDashboard } from './components/shopShoe/dashboard/billDashboard/BillDashboard';
import { ProductDashboard } from './components/shopShoe/dashboard/productDashboard/ProductDashboard';

function App() {
  const [data, setData] = useState(newData)
  // const {product,cartDetail,billDetail, categories, colors, companies, prices} = data
  return (
    
    <Fragment>
      <ToastContainer autoClose={3000} theme='colored' />
      <Routes>
        <Route path='/' element={<ProductShop data= {data} setData={setData}  />}></Route>
        <Route path='/cartUser' element={<ProductDetail data= {data} setData={setData} />}></Route>
        <Route path='/dashboard' element={<BillDashboard data= {data}  setData={setData} />}/>
        <Route path='/dashboard/product' element={<ProductDashboard data= {data}  setData={setData} />}/>
        <Route path='*' element={<Page404 />} ></Route>
      </Routes>
    </Fragment>
  );
}

export default App;
