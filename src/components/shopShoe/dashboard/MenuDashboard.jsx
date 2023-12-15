import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";

export function MenuDashboard() {
  const [check, setCheck] = useState(true)
  return (
    <Fragment>
      <div style={{ width: "148px" }}>
        <div className="mb-2">
          <h5>Menu</h5>
        </div>
        <NavLink to={"/dashboard"} className="nav-link" >
          <div id="orderListHover" className="py-2">
            <i className="fa-solid fa-cart-arrow-down me-1"></i>
            <span>Order List</span>
          </div>
        </NavLink>
        <NavLink to={"/dashboard/product"} className="nav-link" >
          <div id="productHover" className="py-2">
            <i className="fa-solid fa-code-branch me-1"></i>
            <span>Products</span>
          </div>
        </NavLink>
      </div>
    </Fragment>
  );
}
