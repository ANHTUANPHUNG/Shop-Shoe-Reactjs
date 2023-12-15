import React, { useContext } from "react";
import { ThemeProductShop } from "./ProductShop";

function RecommendedFilter() {
  const { companies, handleCheckCompany, activeButton } = useContext(ThemeProductShop)
  return (
    <div className="py-2 d-flex flex-column justify-content-center">
      <h5>Recommended</h5>
      <div className="form-group" id="checkButtonCompanies">
        <button
          onClick={() => handleCheckCompany("all")}
          className={`btn btn-sm btn-outline-secondary me-1 ${
            activeButton == "all" ? "active" : ""
          }`}
          type="button"
          value="all"
        >
          All Products
        </button>
        {companies.map((company) => (
          <button
            onClick={() => handleCheckCompany(company.name)}
            key={company.id}
            className={`btn btn-sm btn-outline-secondary me-1 ${
              activeButton === company.name ? "active" : ""
            }`}
            value={company.name}
          >
            {company.name}
          </button>
        ))}
      </div>
    </div>
  );
}
export default RecommendedFilter;
