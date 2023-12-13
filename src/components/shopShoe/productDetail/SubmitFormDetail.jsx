import React from "react";

function SubmitFormDetail(props) {
  const { totalDetail, setFullName, setAddress, setEmail, setMobile, handleSubmitForm } = props;
  return (
    <form onSubmit={(e) => handleSubmitForm(e)}>
      <div className="p-3 rounded" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
        <div id="totalFormDetail" className="border-bottom">
          <h3>Order Summary</h3>
        </div>
        <div className=" border-bottom">
          <div className="d-flex justify-content-between py-2">
            <span>Subtotal</span>
            <span>{totalDetail}</span>
          </div>
          <div className="d-flex justify-content-between py-2">
            <span>Shipping</span>
            <span>Free</span>
          </div>
        </div>
        <div>
          <div className="d-flex justify-content-between py-2">
            <span>Total</span>
            <span>{totalDetail}</span>
          </div>
        </div>
      </div>
      <div className="mt-1 p-3 rounded" style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}>
        <div className="py-2 mb-2">
          <h3>Customer Info</h3>
        </div>
        <div>
          <div className="mb-3">
            <span className="mb-2">FullName</span>
            <input
              onInput={(e) => setFullName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="FullName"
              required
            />
          </div>
          <div className="mb-3">
            <span className="mb-2">Address</span>
            <input
              onInput={(e) => setAddress(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Address"
              required
            />
          </div>
          <div className="mb-3">
            <span className="mb-2">Email</span>
            <input
              onInput={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-3">
            <span className="mb-2">Mobile</span>
            <input
              onInput={(e) => setMobile(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Mobile"
              required
            />
          </div>
        </div>
      </div>
      <div className="mt-2">
        <button className="btn btn-success" style={{ width: "100%" }}>
          CHECKOUT
        </button>
      </div>
    </form>
  );
}
export default SubmitFormDetail;
