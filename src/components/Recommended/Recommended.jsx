import React, { useContext, useEffect, useReducer } from "react";
import { ShoeContext } from "../../context/ShoeContext";
import { getCompany, setSearchCompany } from "../../reducer/action";
import axios from "axios";

const recommended = [
  {
    value: "All",
    name: "All Products",
  },
  {
    value: "Nike",
    name: "Nike",
  },
  {
    value: "Adidas",
    name: "Adidas",
  },
  {
    value: "Puma",
    name: "Puma",
  },
  {
    value: "Vans",
    name: "Vans",
  },
];
function Recommended() {
  const { state, dispatch } = useContext(ShoeContext);
  const {companyList} = state
  useEffect(() => {
    const fetchData =() => axios.get("http://localhost:3300/companies")
    .then(response =>{
      dispatch(getCompany(response.data))
    })
    fetchData()
  },[])
  return (
    <div className="py-2 d-flex flex-column justify-content-center">
      <h5>Recommended</h5>
      <div className="form-group">
        {companyList.map((recmd) => (
          <button
            key={recmd.value}
            className={`btn btn-sm btn-outline-secondary me-1
                                    ${recmd.value === state?.filters?.recommended ? "active" : ""}
                                `}
            type="button"
            onClick={() => dispatch(setSearchCompany(recmd.value))}
          >
            {recmd.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Recommended;
