import React from "react";
import { Fragment } from "react";

function ShowProductDetail({
  productDetailCustomer,
  handleClickMinus,
  handleClickAdd,
  deleteProductDetail,
}) {
  return (
    <>
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
          {productDetailCustomer.map((product) => (
            <tr key={product.id + "Vinh" + +Math.random()}>
              <td className="border-end">
                <div className="d-flex ">
                  <img
                    id="avatarProductDetail"
                    style={{ width: "100px", height: "50px" }}
                    src={product.img}
                    alt=""
                  />
                  <div id="divTitleColor" className="d-inline">
                    <div id="titleDetail" className="d-block fw-bolder mb-2 ">
                      {product.title}
                    </div>
                    <div id="colorDetail">{product.color}</div>
                  </div>
                </div>
              </td>
              <td className="border-end ">{product.newPrice}</td>
              <td className="border-end ">
                <div className="" id="quantityProductDetail">
                  <span className="span" onClick={() => handleClickMinus(product.id)}>
                    -
                  </span>
                  <span style={{ padding: "0 10px 0 8px" }}> {product.quantity}</span>
                  <span className="span" onClick={() => handleClickAdd(product.id)}>
                    +
                  </span>
                </div>
              </td>
              <td className="border-end ">${product.total}</td>
              <td className="border-end ">
                <div className="action-wrap" onClick={() => deleteProductDetail(product.id)}>
                  <span id="aaa" className="btn-remove">
                    ×
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
export default ShowProductDetail;
