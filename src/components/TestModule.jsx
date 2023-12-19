import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    fullName: yup.string().required("Cần nhập tên"),
    age: yup
      .number()
      .integer()

      .min(18, "tuổi phải hơn 18")
      .max(30, "tuổi phải dưới 30")
      .required("Bạn cần cung cấp tuổi")
      .typeError("Bạn cần nhập tuổi"),
    gender: yup.string().required(),
    city: yup
      .string()
      .notOneOf([""], "Vui lòng chọn thành phố")
      .required("Vui lòng chọn thành phố"),
    email: yup.string().required().email(),
    password: yup
      .string()
      .test(
        "password",
        "password must between 8 and 10 characters",
        (val) => val.length >= 8 && val.length <= 10
      )
      .required(),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password")], "confirm password does not match"),
  })
  .required();

export function TestModule() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [show, setShow] = useState(false);
  const cityList = [
    {
      id: 1,
      name: "Huế",
    },
    {
      id: 2,
      name: "Quảng Trị",
    },
  ];
  const onSubmit = (data) => console.log(data);

  return (
    <>
      <div className="border" style={{ margin: "0 100px" }}>
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ backgroundColor: "#8e91ff", height: "70px" }}
        >
          <div className="ms-2">
            <h3>List Product</h3>
          </div>
          <div className="me-2">
            <button className="btn btn-primary" type="button" onClick={() => setShow(true)}>
              Create
            </button>
          </div>
        </div>
        <div>
          <table className="" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>a</th>
                <th>b</th>
                <th>c</th>
                <th>d</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <Modal
          show={show}
          onHide={() => setShow(false)}
          size="lg"
          aria-labelledby=""
            centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal Update</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="row needs-validation" onSubmit={handleSubmit(onSubmit)}>
              <div className="">
                <div className="form-group mb-3 ">
                  <label htmlFor="fullName" className="form-label">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    className={`form-control ${errors?.fullName?.message ? "is-invalid" : ""}`}
                    {...register("fullName")}
                  />
                  <label htmlFor="fullName" className="invalid-feedback">
                    {errors?.fullName?.message}
                  </label>
                </div>
                <div className="form-group mb-3 ">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    id="email"
                    type="text"
                    className={`form-control ${errors?.email?.message ? "is-invalid" : ""}`}
                    {...register("email")}
                  />
                  <label htmlFor="email" className="invalid-feedback">
                    {errors?.email?.message}
                  </label>
                </div>
                <div className="form-group mb-3 has-validation">
                  <label className="form-lable">Password</label>
                  <input
                    type="password"
                    className={`form-control ${errors?.password?.message ? "is-invalid" : ""}`}
                    {...register(`password`)}
                  />
                  <span className="invalid-feedback">{errors?.password?.message}</span>
                </div>
                <div className="form-group mb-3 has-validation">
                  <label className="form-lable">Confirm Password</label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors?.confirmPassword?.message ? "is-invalid" : ""
                    }`}
                    {...register("confirmPassword")}
                  />
                  <span className="invalid-feedback">{errors?.confirmPassword?.message}</span>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="age" className="form-label">
                    Age
                  </label>
                  <input
                    id="age"
                    type="text"
                    className={`form-control ${errors?.age?.message ? "is-invalid" : ""}`}
                    {...register("age")}
                  />
                  <label htmlFor="age" className="invalid-feedback">
                    {errors?.age?.message}
                  </label>
                </div>
                <div>
                  <div>Gender</div>
                  <div className="form-check form-check-inline">
                    <input
                      className={`form-check-input ${errors?.gender?.message ? "is-invalid" : ""}`}
                      type="radio"
                      name="male"
                      id="radioCheck"
                      value="male"
                      {...register("gender")}
                    />
                    <label className="form-check-label" htmlFor="radioCheck">
                      Male
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className={`form-check-input ${errors?.gender?.message ? "is-invalid" : ""}`}
                      type="radio"
                      name="female"
                      id="radioCheck2"
                      value="female"
                      {...register("gender")}
                    />
                    <label className="form-check-label" htmlFor="radioCheck2">
                      Female
                    </label>
                  </div>
                </div>
                <div>
                  <select
                    className={`form-select ${errors?.city?.message ? "is-invalid" : ""}`}
                    {...register("city")}
                    id="selectCity"
                  >
                    <option value="">Open this select menu</option>

                    {cityList.map((city) => (
                      <option key={city.id} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="selectCity" className="invalid-feedback d-block">
                    {errors?.city?.message}
                  </label>
                </div>
              </div>

              <div className="text-end mt-3">
                <Button variant="secondary" onClick={() => setShow(false)} className="me-2">
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}