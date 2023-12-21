import { Modal, Nav } from "react-bootstrap";
import { Button } from "react-bootstrap";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export function TransferHistory() {
  const [transfer, setTransfer] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3300/transfer`);
      const res = await response.json();
      setTransfer(res);
      const total = res.reduce((prev, cur) => prev + cur.totalAmount, 0);
      setTotal(total);
    };

    fetchData();
  }, []);

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
            <NavLink to="/">
              <button className="btn btn-primary" type="button">
                <i className="fa-regular fa-square-plus me-1"></i>
                Customer List
              </button>
            </NavLink>
          </div>
        </div>
        <div>
          <table className="" style={{ width: "100%" }}>
            <thead >
              <tr style={{ backgroundColor: "#02eb02" }}>
                <th>#</th>
                <th>Sender ID</th>
                <th>Sender Name</th>
                <th>Recipient ID</th>
                <th>TransferAmount($)</th>
                <th>Fees($)</th>
                <th>Fees Amount($)</th>
              </tr>
            </thead>
            <tbody>
              {transfer.map((e) => (
                <tr key={e.id}>
                  <th>{e.id}</th>
                  <th>{e.idUser}</th>
                  <th>{e.fullName}</th>
                  <th>{e.idRecipient}</th>
                  <th>{e.transfer}</th>
                  <th>{e.fees}</th>
                  <th>{e.totalAmount}</th>
                </tr>
              ))}
              <tr>
                <th rowSpan="7">Total : {total} </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
