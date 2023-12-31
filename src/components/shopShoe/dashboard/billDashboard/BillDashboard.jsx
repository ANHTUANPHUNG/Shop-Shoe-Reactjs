import React, { Fragment, useEffect, useState } from "react";
import { BillInformation } from "./BillInformation";
import { OrderManagement } from "./OrderManagement";
import { MenuDashboard } from "../MenuDashboard";
import { NavLink } from "react-router-dom";
import { LayoutDashboard } from "../LayoutDashboard";
import api from "../../../../service/api"
export function BillDashboard() {
  const [listBill, setListBill] = useState([]);
  const [billId, setBillId] = useState([]);
  const [billInformation, setBillInformation] = useState(false);
  const [checkLoad, setCheckLoad] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(api.API_Bill);

      const res = await response.json();

      setListBill(res);
    };

    fetchData();
  }, []);
  const handleShowContentBill = (id) => {
    const bill = listBill.find((e) => e.id == id);

    setBillId(bill);

    setBillInformation(true);
  };
  return (
    <Fragment>
            {Object.keys(listBill).length == 0 && <span className="loader"></span>}

      <LayoutDashboard/>
      <div className="container my-2 d-flex">
        <div className="d-flex" style={{ width: "100%" }}>
          <MenuDashboard />
          {!billInformation ? (
            <div className="" style={{ width: "86%" }}>
              <OrderManagement
                fontSize={16}
                listBill={listBill}
                handleShowContentBill={handleShowContentBill}
              />
            </div>
          ) : (
            <Fragment>
              <div className="" style={{ width: "51%" }}>
                <OrderManagement
                  fontSize={13}
                  listBill={listBill}
                  handleShowContentBill={handleShowContentBill}
                />
              </div>
              <div>
                {<BillInformation billId={billId} setBillInformation={setBillInformation} />}
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
}
