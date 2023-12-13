import React from "react";

export function MenuDashboard({ setCheckCRUDProduct }) {
  return (
    <div style={{ width: "148px" }}>
      <div className="mb-2 ">
        <h5>Menu</h5>
      </div>
      <div id="orderListHover" className="py-2" onClick={() => setCheckCRUDProduct(false)}>
        <i className="fa-solid fa-cart-arrow-down me-1" style={{ color: "#0a5dff" }}></i>
        <span style={{ color: "#0a5dff" }}>Order List</span>
      </div>
      <div id="productHover" className="py-2" onClick={() => setCheckCRUDProduct(true)}>
        <i className="fa-solid fa-code-branch me-1" style={{ color: "#0a5dff" }}></i>
        <span style={{ color: "#0a5dff" }}>Products</span>
      </div>
    </div>
  );
}
