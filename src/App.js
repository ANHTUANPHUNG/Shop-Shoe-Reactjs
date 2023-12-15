import React, { Fragment, createContext, useState } from 'react';
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


export const ThemeContext = createContext()

function App() {
  const [data, setData] = useState(newData)
  const value = {data,setData} 
  return (
    <ThemeContext.Provider value={value}>
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
    </ThemeContext.Provider>
  );
}

export default App;
