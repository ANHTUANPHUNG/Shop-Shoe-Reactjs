import React, { useState } from "react";
import SuccessAlert from "../alert/SuccessAlert";
import FailAlert from "../alert/FailAlert";

function TwoWayBindingObject() {
  const [state, setState] = useState({
    email: "",
    password: "",
    phone: "",
    address: "",
    isSuccess: false,
  });

  const [showAlert, setShowAlert] = useState(false);
  const { email, password, isSuccess, phone, address } = state;

  const handleSubmitLogin = (e) => {
    e.preventDefault();

    if (
      email == "Anhtuan@gmail.com" &&
      password == "123456" &&
      phone == "012345678" &&
      address == "Huế"
    ) {
      setState({
        ...state,
        isSuccess: true,
      });
    } else {
      setState({
        ...state,
        isSuccess: false,
      });
    }
    setShowAlert(true);
  };
  const handleGetAccount = () => {
    setState({
      ...state,
      email: "Anhtuan@gmail.com",
      password: "123456",
      phone: "012345678",
      address: "Huế",
    });
  };
  const handleInputValue = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1>Login Form</h1>
      {(isSuccess && (
        <SuccessAlert
          showAlert={showAlert}
          setShowAlert={setShowAlert}
          content={"Đăng kí thành công"}
        />
      )) ||
        (!isSuccess && (
          <FailAlert
            showAlert={showAlert}
            setShowAlert={setShowAlert}
            content={"Đăng kí thất bại"}
          />
        ))}
      <form onSubmit={handleSubmitLogin}>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            className="form-control"
            type="email"
            id="email"
            value={email}
            name="email"
            onInput={handleInputValue}
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            className="form-control"
            type="password"
            id="password"
            value={password}
            name="password"
            onInput={handleInputValue}
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="phone">
            Phone
          </label>
          <input
            className="form-control"
            type="text"
            id="phone"
            value={phone}
            name="phone"
            onInput={handleInputValue}
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="address">
            Địa chỉ
          </label>
          <input
            className="form-control"
            type="text"
            id="address"
            value={address}
            name="address"
            onInput={handleInputValue}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-dark ms-2 me-2" type="submit">
            Login
          </button>
          <button className="btn btn-warning" type="button" onClick={handleGetAccount}>
            Get Account
          </button>
        </div>
      </form>
    </div>
  );
}
export default TwoWayBindingObject;
