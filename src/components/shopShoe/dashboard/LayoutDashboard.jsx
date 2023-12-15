import React from "react";
import { NavLink } from 'react-router-dom';

export function LayoutDashboard() {
  return (
    <div className="container">
      <div className="py-3 d-flex justify-content-between border-bottom">
        <div>
          <i className="fa-solid fa-cart-plus me-1"></i>Dashboard
        </div>
        <NavLink to={"/"} className="nav-link">
          Anh Tuấn <i className="fa-solid fa-right-to-bracket ms-1"></i>
        </NavLink>
      </div>
    </div>
  );
}
