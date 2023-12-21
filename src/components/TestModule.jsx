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
    setValue,

    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [show, setShow] = useState(false);
  const [banking, setBanking] = useState([]);

  const [check, setCheck] = useState(false);
  const [mode, setMode] = useState("create");
  const [idProduct, setIdProduct] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3300/banking`);
      const res = await response.json();
      setBanking(res);
    };

    fetchData();
  }, [check]);
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    });

    if (result.isConfirmed) {
      const response = await fetch(`http://localhost:3300/banking/` + id, {
        method: "DELETE",
      });
      if (response.ok) {
        setCheck((prev) => !prev);
        toast.error("Xóa thành công");
      }
    }
  };

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
            <NavLink to="/transferHistory">
              <button className="btn btn-primary me-3" type="button">
                <i className="fa-solid fa-clock-rotate-left me-1"></i>
                Transfer history
              </button>
            </NavLink>

            <NavLink to="/addUser">
              <button className="btn btn-primary" type="button">
                <i className="fa-regular fa-square-plus me-1"></i>
                Add new Customer
              </button>
            </NavLink>
          </div>
        </div>
        <div>
          <table className="" style={{ width: "100%" }}>
            <thead>
              <tr style={{ backgroundColor: "#02eb02" }}>
                <th>#</th>
                <th>FullName</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Balance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {banking.map((e) => (
                <tr key={e.id}>
                  <th>{e.id}</th>
                  <th>{e.fullName}</th>
                  <th>{e.email}</th>
                  <th>{e.phone}</th>
                  <th>{e.address}</th>
                  <th>{e.balance}</th>
                  <th>
                    <NavLink to={`/updateUser/${e.id}`}>
                      <button type="button" className="btn btn-primary me-3">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                    </NavLink>
                    <NavLink to={`/deposit/${e.id}`}>
                      <button type="button" className="btn btn-success me-3">
                        <i className="fa-solid fa-plus "></i>
                      </button>
                    </NavLink>
                    <NavLink to={`/withdraw/${e.id}`}>
                      <button type="button" className="btn btn-info me-3">
                        <i className="fa-solid fa-minus"></i>
                      </button>
                    </NavLink>
                    <NavLink to={`/transfer/${e.id}`}>
                      <button type="button" className="btn btn-secondary me-3">
                        <i className="fa-solid fa-arrow-right-arrow-left"></i>
                      </button>
                    </NavLink>
                    <button
                      type="button"
                      className="btn btn-danger "
                      onClick={() => handleDelete(e.id)}
                    >
                      <i className="fa-solid fa-ban "></i>
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
