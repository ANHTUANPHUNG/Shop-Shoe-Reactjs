// ColorFilter.jsx
import React from "react";

const ColorFilter = ({ colors, setColorsSearch }) => {
  return (
    <div className="py-2  justify-content-center">
      <h5>Colors</h5>
      <div className="form-group">
        <div className="form-check py-1">
          <input
            className="form-check-input"
            type="radio"
            name="color"
            id="color0"
            value="all"
            onClick={() => setColorsSearch("all")}
            defaultChecked={true}
            style={{ backgroundImage: "linear-gradient(to right, red, green)" }}
          />
          <label role="button" htmlFor="color0" className="form-check-label ">
            All
          </label>
        </div>
        {colors.map((color) => (
          <div key={color.id} className="form-check py-1">
            <input
              className="form-check-input"
              type="radio"
              name="color"
              id={`color${color.id}`}
              value={color.value}
              style={{ backgroundColor: color.value }}
            />
            <label
              role="button"
              htmlFor={`color${color.id}`}
              className="form-check-label "
              onClick={() => setColorsSearch(color.name)}
            >
              {color.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorFilter;
