import React from "react";

export function BillInformation({billId, setBillInformation}) {
  return (
    <div className="col-lg-5 border p-2 rounded" key={billId.id} style={{ width: "388px" }}>
      <div className="d-flex align-items-center justify-content-between border-bottom">
        <h5>Order details</h5>
        <span role="button" className="btn-close" onClick={() => setBillInformation(false)}></span>
      </div>
      <div className="my-2 border-bottom">
        <h6>Order Information</h6>
        <div className="d-flex justify-content-between mb-2">
          <span>Subtotal</span>
          <span className="fw-bolder">${billId.totalDetail}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>Shipping</span>
          <span className="fw-bolder">{billId.ship}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>Total</span>
          <span className="fw-bolder">${billId.totalDetail}</span>
        </div>
      </div>
      <div className="my-2 border-bottom">
        <h6>Customer Information</h6>
        <div className="d-flex justify-content-between mb-2">
          <span>FullName</span>
          <span className="fw-bolder">{billId.fullName}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>Email</span>
          <span className="fw-bolder">{billId.email}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>Mobile</span>
          <span className="fw-bolder">{billId.mobile}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>Address</span>
          <span className="fw-bolder">{billId.address}</span>
        </div>
      </div>
      <div className="my-2 border-bottom">
        <h6>Order details</h6>
        {billId.product && billId.product.length > 0 && (
          <table className="table table-striped">
            <tbody>
              {billId.product.map((e) => (
                <tr key={e.id}>
                  <td style={{ width: "250px" }}>
                    <div className="d-flex align-items-center" style={{ fontSize: "13px" }}>
                      <img className="me-2" src={e.img} style={{ width: "50px" }} />
                      {e.title}
                    </div>
                  </td>
                  <td className="text-end align-middle">{e.quantity}</td>
                  <td className="text-end align-middle">${e.prevPrice}</td>
                  <td className="text-end align-middle fw-bolder">${e.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
