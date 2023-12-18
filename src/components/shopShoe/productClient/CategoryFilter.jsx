// CategoryFilter.jsx
import React from "react";

const CategoryFilter = ({ categories, setCategoriesSearch }) => {
  return (
    <div className="py-2  justify-content-center">
      <h5>Category</h5>
      <div className="form-group">
        <div className="form-check py-1">
          <input
            className="form-check-input"
            type="radio"
            name="category"
            id="cat0"
            onChange={() => setCategoriesSearch("all")}
            value="all"
            defaultChecked={true}
          />
          <label htmlFor="cat0" role="button" className="form-check-label ">
            All
          </label>
        </div>
        {categories.map((category) => (
          <div key={category.id} className="form-check py-1">
            <input
              className="form-check-input"
              type="radio"
              name="category"
              id={`category${category.id}`}
              value={category.name}
              onChange={() => setCategoriesSearch(category.name)}
            />
            <label htmlFor={`category${category.id}`} role="button" className="form-check-label ">
              {category.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
