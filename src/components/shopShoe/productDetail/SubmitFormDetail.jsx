import React from "react";

function SubmitFormDetail(props) {
  const {
    totalDetail,
    setFullName,
    setAddress,
    setEmail,
    setMobile,
    handleSubmitForm,
    fullName,
    email,
    address,
    mobile,
  } = props;
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
            <label htmlFor="fullNameFormDetail" className="mb-2">
              FullName
            </label>
            <input
              onInput={(e) => setFullName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="FullName"
              id="fullNameFormDetail"
            />
            {fullName != "" ? (
              ""
            ) : (
              <label style={{ color: "red" }} htmlFor="fullNameFormDetail" className="mt-2">
                FullName is a required field
              </label>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="addressFormDetail" className="mb-2">
              Address
            </label>
            <input
              onInput={(e) => setAddress(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Address"
              id="addressFormDetail"
            />
            {address != "" ? (
              ""
            ) : (
              <label style={{ color: "red" }} htmlFor="addressFormDetail" className="mt-2">
                Address is a required field
              </label>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="emailFormDetail" className="mb-2">
              Email
            </label>
            <input
              onInput={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              placeholder="Email"
              id="emailFormDetail"
            />
            {email != "" ? (
              ""
            ) : (
              <label style={{ color: "red" }} htmlFor="emailFormDetail" className="mt-2">
                Email is a required field
              </label>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="mobileFormDetail" className="mb-2">
              Mobile
            </label>
            <input
              onInput={(e) => setMobile(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Mobile"
              id="mobileFormDetail"
            />
            {mobile != "" ? (
              ""
            ) : (
              <label style={{ color: "red" }} htmlFor="mobileFormDetail" className="mt-2">
                Mobile is a required field
              </label>
            )}
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
