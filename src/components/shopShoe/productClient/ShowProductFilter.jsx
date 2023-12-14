import React, { Fragment } from "react";

function ShowProductFilter({ productListSearch, handleListProductDetail }) {
  return (
    <div className="py-2 justify-content-center">
      <h5>Product</h5>
      <div className="row">
        {productListSearch.map((product) => (
          <div key={product.id} className="col-md-3 mb-4">
            <div className="card d-flex align-items-center pt-2">
              <img
                src={product.img}
                alt=""
                className="card-image-top"
                style={{ width: "153px", height: "104px" }}
              />
              <div className="card-body">
                <p
                  id="nameProduct"
                  style={{
                    fontWeight: "bold",
                    width: "188px",
                    height: "44px",
                    textAlign: "center",
                  }}
                >
                  {product.title}
                </p>
                <div className="d-flex align-items-center mb-2 " id="starNumber">
                  <i className="fa-solid fa-star "></i>
                  <i className="fa-solid fa-star "></i>
                  <i className="fa-solid fa-star "></i>
                  <i className="fa-solid fa-star "></i>
                  <i className="fa-solid fa-star "></i>
                  <div className="reviews">({product.reviews} reviews)</div>
                </div>
                <div className="align-item-center d-flex " id="priceProduct">
                  <div className="d-flex">
                    {product.prevPrice != 0 ? (
                      <Fragment>
                        <p className="me-2 mb-0 priceReviews text-decoration-line-through">
                          ${product.newPrice}
                        </p>
                        <p className=" mb-0 priceReviews">${product.prevPrice}</p>
                      </Fragment>
                    ) : (
                      <p className="me-2 mb-0 priceReviews ">${product.newPrice}</p>
                    )}
                  </div>
                  <div id="cardProduct" onClick={() => handleListProductDetail(product.id)}>
                    <i className="fa-solid fa-cart-arrow-down"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ShowProductFilter;
