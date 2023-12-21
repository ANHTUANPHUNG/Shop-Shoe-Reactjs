import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { NavLink, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const schema = yup
  .object({
    fullName: yup.string().required("Cần nhập tên"),

    email: yup.string().required("Nhập email").email("Email cần đủ có @"),
    address: yup.string().required("Nhập địa chỉ"),
    phone: yup.string().required("Bạn cần cung cấp phone"),
  })
  .required();
export function UpdateUser() {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  useEffect(() => {
    const handle = async () => {
      const response = await fetch(`http://localhost:3300/banking/${id}`, {
        method: "GET",
      });
      const res = await response.json();

      setValue("fullName", res.fullName);
      setValue("email", res.email);
      setValue("phone", res.phone);
      setValue("address", res.address);
    };
    handle();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    const response = await fetch("http://localhost:3300/banking/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      toast.info("Cập nhật user thành công");
    }
  };

  return (
    <div className="border" style={{ margin: "0 100px" }}>
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ backgroundColor: "#8e91ff", height: "70px" }}
      >
        <div className="ms-2">
          <h3>Update Customer Information</h3>
        </div>
        <div className="me-2">
          <NavLink to="/">
            <button className="btn btn-primary me-3" type="button">
              <i className="fa-solid fa-list"></i> Customer List
            </button>
          </NavLink>
        </div>
      </div>
      <div>
        <form className="row needs-validation" onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <div className="d-flex row">
              <div className="form-group mb-3 col-6 ">
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
              <div className="form-group mb-3 col-6  ">
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
            </div>

            <div className="d-flex row">
              <div className="form-group mb-3 col-6 ">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  id="phone"
                  type="text"
                  className={`form-control ${errors?.phone?.message ? "is-invalid" : ""}`}
                  {...register("phone")}
                />
                <label htmlFor="phone" className="invalid-feedback">
                  {errors?.phone?.message}
                </label>
              </div>
              <div className="form-group mb-3 col-6 ">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  className={`form-control ${errors?.address?.message ? "is-invalid" : ""}`}
                  {...register("address")}
                />
                <label htmlFor="address" className="invalid-feedback">
                  {errors?.address?.message}
                </label>
              </div>
            </div>
          </div>

          <div className="text-start mt-3">
            <Button variant="primary" type="submit">
              <i className="fa-solid fa-download me-1"></i>
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
