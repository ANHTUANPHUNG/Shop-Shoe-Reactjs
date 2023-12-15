import React, { Fragment } from "react";

export function OrderManagement({ fontSize, listBill, handleShowContentBill }) {
  return (
    <Fragment>
      <div className="mb-2 mx-2">
        <h5>Order Management</h5>
      </div>

      <div className="d-flex">
        <table
          className="table table-striped table-hover "
          style={{ fontSize: `${fontSize}px` }}
          id="tableOrderList"
        >
          <thead className="table-primary">
            <tr>
              <th>Order Date</th>
              <th>Total Products</th>
              <th>Subtotal</th>
              <th>Shipping</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Customer Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listBill.map((bill) => (
              <tr key={bill.id}>
                <td>{bill.orderDate}</td>
                <td>{bill.totalProducts}</td>
                <td>${bill.totalDetail}</td>
                <td>{bill.ship}</td>
                <td>${bill.totalDetail}</td>
                <td id="statusBill">
                  <div>
                    <span>{bill.status}</span>
                  </div>
                </td>
                <td>{bill.fullName}</td>
                <td id="showContentBill" onClick={() => handleShowContentBill(bill.id)}>
                  <i className="fa-solid fa-forward"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}
