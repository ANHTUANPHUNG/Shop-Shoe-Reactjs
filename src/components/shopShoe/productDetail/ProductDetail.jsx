import React, { Fragment, useEffect, useState } from "react";
import ShowFunction from "../../Show";
import InputSearch from "../productClient/InputSearch";
import ProductShop from "../productClient/ProductShop";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import moment from "moment";
import DashboardOrder from "../dashboard/DashboardOrder";
import ShowProductDetail from "./ShowProductDetail";
import SubmitFormDetail from "./SubmitFormDetail";
function ProductDetail() {
  const [showFunction, setShowFunction] = useState(false);
  const [showProductShop, setShowProductShop] = useState(false);
  const [productDetailCustomer, setProductDetailCustomer] = useState([]);
  const [checkCartDetail, setCheckCartDetail] = useState(false);
  const [totalDetail, setTotalDetail] = useState(0);
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3300/cartDetail");
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
      const response = await fetch("http://localhost:3300/cartDetail/" + id, {
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
      const response = await fetch("http://localhost:3300/cartDetail/" + id, {
        method: "DELETE",
      });
      if (response.ok) {
        setCheckCartDetail((prev) => !prev);
      } else console.log("lỗi");
    });
  };

  const updateCartDetail = async (id, updatedProduct) => {
    const response = await fetch("http://localhost:3300/cartDetail/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    if (response.ok) {
      setProductDetailCustomer((prevProducts) =>
        prevProducts.map((product) => (product.id === id ? updatedProduct : product))
      );
      setCheckCartDetail((prev) => !prev);
      toast.info("Successful change");
    } else {
      toast.error("Unsuccessful change");
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
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
      const response = await fetch("http://localhost:3300/billDetail/", {
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
      {!showFunction && !showProductShop && !showAdmin && (
        <Fragment>
          <div className="d-flex mt-2 py-2 border-bottom align-items-center container">
            <div className="ms-0 ps-2" style={{ width: "180px" }}>
              <a
                href="#"
                onClick={() => setShowProductShop(true)}
                className="text-decoration-none "
                style={{ color: "black" }}
              >
                <i className="fa-solid fa-cart-plus me-2"></i>
                Shoe Ecommerce
              </a>
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
                  <i className="fa-solid fa-user me-3" onClick={() => setShowAdmin(true)}></i>
                </div>
                <div>
                  <i className="fa-solid fa-house-user" onClick={() => setShowFunction(true)}></i>
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
                  <a href="#" onClick={() => setShowProductShop(true)}>
                    {" "}
                    <i className="fa-solid fa-left-long me-1"></i>Continue Shopping
                  </a>
                </div>
                <div className="col-4 ">
                  <SubmitFormDetail
                    totalDetail={totalDetail}
                    setFullName={setFullName}
                    setAddress={setAddress}
                    setEmail={setEmail}
                    setMobile={setMobile}
                    handleSubmitForm={handleSubmitForm}
                  />{" "}
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
      {showProductShop && <ProductShop />}
      {showFunction && <ShowFunction />}
      {showAdmin && <DashboardOrder />}
    </Fragment>
  );
}
export default ProductDetail;
