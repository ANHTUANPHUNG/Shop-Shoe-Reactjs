import React, { Fragment, useEffect, useState } from "react";
import InputSearch from "../productClient/InputSearch";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import moment from "moment";
import ShowProductDetail from "./ShowProductDetail";
import SubmitFormDetail from "./SubmitFormDetail";
import { NavLink } from "react-router-dom";
function ProductDetail() {
  const [productDetailCustomer, setProductDetailCustomer] = useState([]);
  const [checkCartDetail, setCheckCartDetail] = useState(false);
  const [totalDetail, setTotalDetail] = useState(0);
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://json-server-shoe-shop.vercel.app/cartDetail");
      const result = await res.json();
      const newTotal = result.reduce(
        (prevValue, curProduct) => prevValue + Number(curProduct.total),
        0
      );
      setTotalDetail(newTotal);
      setProductDetailCustomer(result);
    };
    fetchData();
  }, [checkCartDetail]);
  const handleClickAdd = (id) => {
    const clickAdd = productDetailCustomer.find((product) => product.id == id);
    if (clickAdd) {
      clickAdd.quantity += 1;
      clickAdd.total = clickAdd.quantity * clickAdd.prevPrice;
      updateCartDetail(clickAdd.id, clickAdd);
    }
  };

  const handleClickMinus = (id) => {
    const clickAdd = productDetailCustomer.find((product) => product.id == id);
    if (clickAdd.quantity > 1) {
      clickAdd.quantity -= 1;
      clickAdd.total = clickAdd.quantity * clickAdd.prevPrice;
      updateCartDetail(clickAdd.id, clickAdd);
    } else {
      toast.error("The number must be greater than 1");
    }
  };

  const deleteProductDetail = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    });

    if (result.isConfirmed) {
      const response = await fetch("https://json-server-shoe-shop.vercel.app/cartDetail/" + id, {
        method: "DELETE",
      });
      if (response.ok) {
        setProductDetailCustomer(() => productDetailCustomer.map((e) => e.id != id));
        setCheckCartDetail((prev) => !prev);
        toast.error("Deleted successfully");
      }
    }
  };
  const deleteAllProductDetail = async (submitForm) => {
    const reduceDelete = submitForm.product.reduce((index, valueSubmit) => {
      return index.concat(valueSubmit.id);
    }, []);
    reduceDelete.forEach(async (id) => {
      const response = await fetch("https://json-server-shoe-shop.vercel.app/cartDetail/" + id, {
        method: "DELETE",
      });
      if (response.ok) {
        setCheckCartDetail((prev) => !prev);
      } else console.log("lỗi");
    });
  };

  const updateCartDetail = async (id, updatedProduct) => {
    const response = await fetch("https://json-server-shoe-shop.vercel.app/cartDetail/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    if (response.ok) {
      const newProduct = [...productDetailCustomer]
      newProduct[id] = updatedProduct
      setProductDetailCustomer(newProduct)
      // setProductDetailCustomer((prevProducts) =>
      //   prevProducts.map((product) => (product.id === id ? updatedProduct : product))
      // );
      setCheckCartDetail((prev) => !prev);
      toast.info("Successful change");
    } else {
      toast.error("Unsuccessful change");
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (fullName == "" || address == "" || email == "" || mobile == "") {
      toast.error("Fill in all required fields");
      return;
    }
    const submitForm = {
      product: [...productDetailCustomer],
      totalDetail: totalDetail,
      fullName: fullName,
      address: address,
      email: email,
      mobile: mobile,
      orderDate: moment().format("MMMM DD YYYY"),
      totalProducts: productDetailCustomer.length,
      status: "draft",
      ship: "FREE",
    };
    const pushBillDetail = async () => {
      const response = await fetch("https://json-server-shoe-shop.vercel.app/billDetail/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitForm),
      });
      if (response.ok) {
        toast.success("Order successfully");
        deleteAllProductDetail(submitForm);
        e.target.reset();
      }
    };
    pushBillDetail();
  };

  const productHandle = () => {};
  return (
    <Fragment>
      
        <Fragment>
          <div className="d-flex mt-2 py-2 border-bottom align-items-center container">
            <div className="ms-0 ps-2" style={{ width: "180px" }}>
              <NavLink to={"/"} className="nav-link" style={{ color: "black" }}>
                <i className="fa-solid fa-cart-plus me-2"></i>
                Shoe Ecommerce
              </NavLink>
            </div>
            <div className="d-flex justify-content-between">
              <InputSearch inputSearchProduct={productHandle} />
              <div className="d-flex" style={{ marginLeft: "75%", alignItems: "center" }}>
                <div>
                  <i className="fa-solid fa-cart-shopping "></i>
                </div>
                <div className="pe-2" style={{ alignSelf: "baseline" }}>
                  {productDetailCustomer != "" ? (
                    <span
                      style={{
                        border: "1px solid red",
                        borderRadius: "5px",
                        backgroundColor: "red",
                        fontSize: "15px",
                        color: "white",
                      }}
                    >
                      {productDetailCustomer.length}
                    </span>
                  ) : (
                    <span className="me-2"></span>
                  )}
                </div>
                <div>
                  <NavLink to={"/dashboard"}>
                    <i className="fa-solid fa-user me-3"></i>
                  </NavLink>
                </div>
                <div>
                  <i className="fa-solid fa-house-user"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-12 py-2">
                <h3>Cart Detail</h3>
              </div>
              <div className="row ">
                <div className="col-8">
                  <table className="table cart-table" id="tableDetail">
                    <thead>
                      <tr>
                        <th style={{ width: "55%" }}>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <ShowProductDetail
                        productDetailCustomer={productDetailCustomer}
                        handleClickAdd={handleClickAdd}
                        handleClickMinus={handleClickMinus}
                        deleteProductDetail={deleteProductDetail}
                      />
                    </tbody>
                  </table>
                  <NavLink to={"/"} >
                    <i className="fa-solid fa-left-long me-1"></i>Continue Shopping
                  </NavLink>
                </div>
                <div className="col-4 ">
                  <SubmitFormDetail
                    totalDetail={totalDetail}
                    setFullName={setFullName}
                    setAddress={setAddress}
                    setEmail={setEmail}
                    setMobile={setMobile}
                    handleSubmitForm={handleSubmitForm}
                    fullName={fullName}
                    email={email}
                    address={address}
                    mobile={mobile}
                  />
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      
      
    </Fragment>
  );
}
export default ProductDetail;
