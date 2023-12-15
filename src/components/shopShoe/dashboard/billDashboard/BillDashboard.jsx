import React, { Fragment, useContext, useEffect, useState } from "react";
import { BillInformation } from "./BillInformation";
import { OrderManagement } from "./OrderManagement";
import { MenuDashboard } from "../MenuDashboard";
import { LayoutDashboard } from "../LayoutDashboard";
import { ThemeContext } from "../../../../App";

export function BillDashboard() {
  const {data,setData} = useContext(ThemeContext)
  const [listBill, setListBill] = useState([]);
  const [billId, setBillId] = useState([]);
  const [billInformation, setBillInformation] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setListBill(data.billDetail);
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
      <LayoutDashboard />
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
