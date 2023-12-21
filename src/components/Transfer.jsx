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
export function Transfer() {
  const { id } = useParams();
  const [check, setCheck] = useState(false);
  const [listRecipient, setListRecipient] = useState([]);
  const [banking, setBanking] = useState();
  const [selectedRecipient, setSelectedRecipient] = useState();

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
      setValue("email", res.email);
    };
    handle();
  }, [id, setValue, check]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3300/banking`);
      const res = await response.json();
      setBanking(res);
      const listC = res.filter((e) => e.id != id);
      setListRecipient(listC);
    };

    fetchData();
  }, [id]);
  const [totalAmount, setTotalAmount] = useState(0);

  const updateTotalAmount = (e) => {
    const transaction = Number(e.target.value);
    const fee = transaction * 0.1;
    const totalAmount = transaction + fee;
    setTotalAmount(totalAmount);
  };

  const onSubmit = async (data) => {
    data.fees = 10;
    const transaction = parseFloat(data.transaction);
    data.totalAmount = transaction + data.fees;
    data.recipient = selectedRecipient;
    data.balance -= data.totalAmount;
    const dataUser = {
      id: data.id,
      balance: data.balance,
      email: data.email,
      address: data.address,
      balance: data.balance,
      phone: data.phone,
    };
    const response = await fetch("http://localhost:3300/banking/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataUser),
    });
    if (response.ok) {
      const findRecipient = banking.find((e) => e.id == data.recipient);
      findRecipient.balance += transaction;
      const responseRecipient = await fetch("http://localhost:3300/banking/" + data.recipient, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ balance: findRecipient.balance }),
      });
      if (responseRecipient.ok) {
        toast.success("Chuyển tiền thành công");
        const depositData = {
          idUser: data.id,
          fullName: data.fullName,
          idRecipient: data.recipient,
          transfer : data.transaction,
          fees : 10,
          totalAmount:data.totalAmount,
        };
        await fetch("http://localhost:3300/transfer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(depositData),
        });
      }
      reset()
      setCheck((prev) => !prev);
    }
  };

  return (
    <div className="border" style={{ margin: "0 100px" }}>
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ backgroundColor: "#8e91ff", height: "70px" }}
      >
        <div className="ms-2">
          <h3>Transfer Money Information</h3>
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
              <div className="form-group mb-3 col-3 ">
                <label htmlFor="id" className="form-label">
                  Sender Id
                </label>
                <input
                  id="id"
                  type="text"
                  className={`form-control ${errors?.id?.message ? "is-invalid" : ""}`}
                  {...register("id")}
                  disabled
                />
              </div>
              <div className="form-group mb-3 col-3  ">
                <label htmlFor="fullName" className="form-label">
                  Sender Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  className={`form-control ${errors?.fullName?.message ? "is-invalid" : ""}`}
                  {...register("fullName")}
                  disabled
                />
              </div>
              <div className="form-group mb-3 col-3  ">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  type="text"
                  className={`form-control ${errors?.email?.message ? "is-invalid" : ""}`}
                  {...register("email")}
                  disabled
                />
              </div>
              <div className="form-group mb-3 col-3 ">
                <label htmlFor="senderBalance" className="form-label">
                  Sender Balance($)
                </label>
                <input
                  id="senderBalance"
                  type="text"
                  className={`form-control ${errors?.balance?.message ? "is-invalid" : ""}`}
                  {...register("balance")}
                  disabled
                />
              </div>
            </div>

            <div className="d-flex row">
              <div className="form-group mb-3 col-3 ">
                <label htmlFor="listRecipient" className="form-label">
                  Recipient Name
                </label>
                <select
                  className="form-select"
                  {...register("recipient")}
                  id="listRecipient"
                  defaultValue={selectedRecipient}
                  onChange={(e) => setSelectedRecipient(e.target.value)}
                >
                  <option value="">-----Check------</option>
                  {listRecipient.map((e) => (
                    <option key={e.id} value={e.id}>
                      ({e.id}) {e.fullName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group mb-3 col-3 ">
                <label htmlFor="transaction" className="form-label">
                  Transfer Amount ($)
                </label>
                <input
                  id="transaction"
                  type="text"
                  className={`form-control ${errors?.transaction?.message ? "is-invalid" : ""}`}
                  {...register("transaction")}
                  onChange={(e) => updateTotalAmount(e)}
                />
                <label htmlFor="transaction" className="invalid-feedback">
                  {errors?.transaction?.message}
                </label>
              </div>
              <div className="form-group mb-3 col-3 ">
                <label htmlFor="fees" className="form-label">
                  Fees
                </label>
                <input
                  id="fees"
                  type="text"
                  className={`form-control `}
                  value="10"
                  disabled
                  {...register("fees")}
                />
              </div>
              <div className="form-group mb-3 col-3 ">
                <label htmlFor="totalAmount" className="form-label">
                  Total Amount Of Transaction($)
                </label>
                <input
                  id="totalAmount"
                  value={totalAmount.toFixed(2).toString()}
                  type="text"
                  className={`form-control `}
                  {...register("totalAmount")}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="text-start mt-3">
            <Button variant="primary" type="submit">
              <i className="fa-solid fa-minus"></i> Withdraw
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
