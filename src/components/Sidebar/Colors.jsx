import React, { useContext, useEffect } from "react";
import { ShoeContext } from "../../context/ShoeContext";
import { getColor, setSearchColor } from "../../reducer/action";
import axios from "axios";

const colors = ["All", "Black", "Blue", "Red", "Green", "White"];
function Colors() {
  const { state, dispatch } = useContext(ShoeContext);
  const { colorList } = state;
  useEffect(() => {
    const fetchData = () =>
      axios.get("http://localhost:3300/color").then((e) => dispatch(getColor(e.data)));
    fetchData();
  }, []);
  console.log(colorList);
  return (
    <div className="py-2 d-flex flex-column justify-content-center">
      <h5>Colors</h5>
      <div className="form-group">
        {colorList.map((color) => (
          <div key={color.id} className="form-check py-1">
            <input
              className="form-check-input"
              type="radio"
              name="color"
              value={color.name}
              defaultChecked={color.name === "All"}
              id={`color-${color.id}`}
              onChange={(e) => dispatch(setSearchColor(e.target.value))}
              style={
                color.name === "Alliouj"
                  ? { backgroundImage: "linear-gradient(to right, red, green)" }
                  : color.name !== "White"
                  ? { backgroundColor: color.name }
                  : {}
              }
            />
            <label
              htmlFor={`color-${color.id}`}
              role="button"
              className={`form-check-label ${
                color.name === state?.filters?.color ? "text-decoration-underline fw-bolder" : ""
              }`}
            >
              {color.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Colors;
