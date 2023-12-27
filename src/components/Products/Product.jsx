import React from "react";
import { FaCartArrowDown, FaStar } from "react-icons/fa";

function Product({ product }) {
  return (
    <div className="col-md-3 mb-4">
      <div className="card d-flex align-items-center pt-2">
        <img
          src={product.img}
          className="card-image-top"
          alt=""
          style={{ width: "70%", height: "120px" }}
        />
        <div className="card-body">
          <p className="fw-bolder" style={{fontSize:"13px"}}>{product.title}</p>
          <div className="d-flex align-items-center mb-2">
            <div className="me-1">
              {new Array(product.star).fill(1).map((item, index) => (
                <FaStar key={index} color="yellow" fontSize="13px" />
              ))}
            </div>
            <div className="fs-10">({product.reviews} reviewer)</div>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <del className="line-through me-2">${product.newPrice}</del>
              <span>${product.prevPrice}</span>
            </div>
            <FaCartArrowDown size={20} className="btn-cart" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
