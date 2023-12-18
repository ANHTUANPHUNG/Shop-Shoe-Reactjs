import React from "react";

const PriceFilter = ({ prices, setPricesSearch }) => {
  return (
    <div className="py-2  justify-content-center">
      <h5>Price</h5>
      <div className="form-group">
        <div className="form-check py-1">
          <input
            className="form-check-input"
            type="radio"
            name="price"
            id="price0"
            onClick={() => setPricesSearch("all")}
            value="all"
            defaultChecked={true}
          />
          <label role="button" htmlFor="price0" className="form-check-label ">
            All
          </label>
        </div>
        {prices.map((price) => (
          <div key={price.id} className="form-check py-1">
            <input
              onClick={() => setPricesSearch(price.value)}
              className="form-check-input"
              type="radio"
              name="price"
              id={`price${price.id}`}
              value={price.value}
            />
            <label role="button" htmlFor={`price${price.id}`} className="form-check-label ">
              {price.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceFilter;
