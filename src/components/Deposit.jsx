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
    transaction: yup
      .number()
      .integer()

      .min(10, "phải hơn 10")
      .max(1000000, "bé hơn 1000000")
      .required("Bạn cần cung cấp số tiền chuyển")
      .typeError("Tiền phải là số"),
  })
  .required();
export function Deposit() {
  const { id } = useParams();
  const [check, setCheck] = useState(false);
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

      setValue("id", res.id);
      setValue("fullName", res.fullName);
      setValue("balance", res.balance);
    };
    handle();
  }, [id, setValue, check]);

  const onSubmit = async (data) => {
    data.balance += data.transaction;
    const response = await fetch("http://localhost:3300/banking/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      toast.info("Cộng tiền user thành công");
      const depositData = {
        transaction: data.transaction,
        idUser: id, 
      };
       await fetch("http://localhost:3300/deposit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(depositData),
    });
    }
    reset()
    setCheck(e =>!e)
  };

  return (
    <div className="border" style={{ margin: "0 100px" }}>
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ backgroundColor: "#8e91ff", height: "70px" }}
      >
        <div className="ms-2">
          <h3>Deposit Money Into Customer's account</h3>
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
                <label htmlFor="id" className="form-label">
                  Customer ID
                </label>
                <input
                  id="id"
                  type="text"
                  className={`form-control ${errors?.id?.message ? "is-invalid" : ""}`}
                  {...register("id")}
                  disabled
                />
              </div>
              <div className="form-group mb-3 col-6  ">
                <label htmlFor="fullName" className="form-label">
                  FullName
                </label>
                <input
                  id="fullName"
                  type="text"
                  className={`form-control ${errors?.fullName?.message ? "is-invalid" : ""}`}
                  {...register("fullName")}
                  disabled
                />
              </div>
            </div>

            <div className="d-flex row">
              <div className="form-group mb-3 col-6 ">
                <label htmlFor="balance" className="form-label">
                  Customer Balance($)
                </label>
                <input
                  id="balance"
                  type="text"
                  className={`form-control ${errors?.balance?.message ? "is-invalid" : ""}`}
                  {...register("balance")}
                  disabled
                />
              </div>
              <div className="form-group mb-3 col-6 ">
                <label htmlFor="transaction" className="form-label">
                  Transaction Amount($)
                </label>
                <input
                  id="transaction"
                  type="number"
                  className={`form-control ${errors?.transaction?.message ? "is-invalid" : ""}`}
                  {...register("transaction")}
                />
                <label htmlFor="transaction" className="invalid-feedback">
                  {errors?.transaction?.message}
                </label>
              </div>
            </div>
          </div>

          <div className="text-start mt-3">
            <Button variant="primary" type="submit">
              <i className="fa-solid fa-plus"></i> Deposit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
