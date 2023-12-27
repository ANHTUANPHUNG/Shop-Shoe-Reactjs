import React, { useContext, useEffect } from "react";
import { ShoeContext } from "../../context/ShoeContext";
import { getCategory, setSearchCategory } from "../../reducer/action";
import axios from "axios";

function Category() {
  const { state, dispatch } = useContext(ShoeContext);
  const {categoryList} = state
  useEffect(()=>{
    const fetchData= () =>   axios.get("http://localhost:3300/categories")
     .then(response=>{
       dispatch(getCategory(response.data))
     })
     fetchData()
   },[])
  return (
    <div className="py-2 d-flex flex-column justify-content-center">
      <h5>Category</h5>
      <div className="form-group">
        {categoryList.map((cat) => (
          
          <div key={cat.name} className="form-check py-1">
            <input
              className="form-check-input"
              type="radio"
              name="category"
              value={cat.name}
              defaultChecked={cat.name === "All"}
              id={`category-${cat.name}`}
              onChange={(e) => dispatch(setSearchCategory(e.target.value))}
            />
            <label
              htmlFor={`category-${cat.name}`}
              role="button"
              className={`form-check-label ${
                cat.name === state?.filters?.category ? "text-decoration-underline fw-bolder" : ""
              }`}
            >
              {cat.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
