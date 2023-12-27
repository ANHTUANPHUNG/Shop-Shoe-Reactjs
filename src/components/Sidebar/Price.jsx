import React, { useContext, useEffect } from "react";
import { ShoeContext } from "./../../context/ShoeContext";
import { getPrice, setSearchPrice } from "../../reducer/action";
import axios from "axios";


function Price() {
  const {state, dispatch } = useContext(ShoeContext);
  const {priceList} = state
  useEffect(()=>{
    const fetchData= () =>   axios.get("http://localhost:3300/prices")
     .then(response=>{
       dispatch(getPrice(response.data))
     })
     fetchData()
   },[])
  return (
    <div className="py-2 d-flex flex-column justify-content-center">
      <h5>Price</h5>
      <div className="form-group">
        {priceList.map((price,index) => (
          
          <div key={price.value} className="form-check py-1">
            <input
              className="form-check-input"
              type="radio"
              name="price"
              value={price.value}
              defaultChecked={price.value == state?.filters?.price}
              id={`price-${index}`}
              onChange={e =>dispatch(setSearchPrice(e.target.value))}
            />
            <label
              htmlFor={`price-${index}`}
              role="button"
              className={`form-check-label ${
                price.value === state?.filters?.price ? "text-decoration-underline fw-bolder" : ""
              }`}
            >
              {price.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Price;
