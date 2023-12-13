import React, { useState } from "react";
import SuccessAlert from "../alert/SuccessAlert";
import FailAlert from "../alert/FailAlert";

function TwoWayBinding() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const handleSubmitLogin = (e) => {
    e.preventDefault();
    if (email == "Anhtuan@gmail.com" && password == "123456") {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
    setShowAlert(true);
  };
  const handleGetAccount = () => {
    setEmail("Anhtuan@gmail.com");
    setPassword("123456");
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
            onInput={(e) => {
              setEmail(e.target.value);
            }}
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
            onInput={(e) => {
              setPassword(e.target.value);
            }}
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
export default TwoWayBinding;
