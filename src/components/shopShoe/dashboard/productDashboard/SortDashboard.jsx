import React from "react";

export function SortDashboard({ setSort, sort, setSortCheck, sortCheck }) {
  return (
    <div className="d-flex my-2">
      <span className="me-2">Field</span>
      <select className="me-2" onChange={(e) => setSort(e.target.value)} value={sort}>
        <option value="id">Id</option>
        <option value="title">Title</option>
        <option value="category">Category</option>
        <option value="color">Color</option>
        <option value="company">Company</option>
        <option value="price">Price</option>
      </select>
      <span className="me-2">Order</span>
      <select onChange={(e) => setSortCheck(e.target.value)} value={sortCheck}>
        <option value="ascendent">Ascendent</option>
        <option value="descendent">Descendent</option>
      </select>
    </div>
  );
}
