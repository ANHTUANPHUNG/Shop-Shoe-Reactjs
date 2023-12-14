import React, { Fragment } from "react";

export function ModalCreateProduct({
  handleSubmitFormAdd,
  setTitle,
  title,
  setPrice,
  price,
  setShowFormAddProduct,
  setCategory,
  category,
  company,
  color,
  setColor,
  setCompany,
  url,
  handleImageChange,
}) {
  return (
    <form className="row" onSubmit={(e) => handleSubmitFormAdd(e)}>
      <div className="col-4">
        <div>
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            onInput={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Input"
            id="title"
            className="form-control form-control-sm"
          />
          {title == "" ? (
            <label htmlFor="title"  style={{ color: "red" }} className="form-label">
              Title is a required field
            </label>
          ) : (
            ""
          )}
        </div>
        <div>
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            onInput={(e) => setPrice(e.target.value)}
            value={price}
            type="text"
            placeholder="Input"
            id="price"
            className="form-control form-control-sm"
          />
          {price == "" ? (
            <label htmlFor="price" style={{ color: "red" }} className="form-label">
              Price is a required field
            </label>
          ) : (
            ""
          )}
        </div>
        <div>
          <div className="d-flex ">
            <button style={{ width: "145px" }} className="btn btn-success btn-sm mt-3  ">
              Add
            </button>
            <button
              style={{ width: "145px" }}
              className="btn btn-dark btn-sm mt-3 ms-3"
              type="button"
              onClick={() => {
                setShowFormAddProduct(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="form-group">
          <label className="form-label">Category</label>
          <select
            className="form-select form-select-sm form-control-sm "
            name="category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Please select category</option>
            <option value="Sneakers">Sneakers</option>
            <option value="Flats">Flats</option>
            <option value="Sandals">Sandals</option>
            <option value="Heels">Heels</option>
          </select>
          {category == "" ? (
            <label className="form-label" htmlFor="category" style={{ color: "red" }}>
              Category is a required field
            </label>
          ) : (
            ""
          )}
        </div>
        <div className="form-group">
          <label className="form-label">Company</label>
          <select
            className="form-select form-select-sm form-control-sm "
            name="company"
            id="company"
            onChange={(e) => setCompany(e.target.value)}
            value={company}
          >
            <option value="">Please select company</option>
            <option value="Nike">Nike</option>
            <option value="Adidas">Adidas</option>
            <option value="Puma">Puma</option>
            <option value="Vans">Vans</option>
          </select>
          {company == "" ? (
            <label className="form-label" id="company" style={{ color: "red" }}>
              Company is a required field
            </label>
          ) : (
            ""
          )}
        </div>
        <div className="form-group">
          <label className="form-label">Color</label>
          <select
            className="form-select form-select-sm form-control-sm "
            name="color"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          >
            <option value="">Please select color</option>
            <option value="Black">Black</option>
            <option value="Blue">Blue</option>
            <option value="Red">Red</option>
            <option value="Green">Green</option>
            <option value="White">White</option>
          </select>
          {color == "" ? (
            <label className="form-label " htmlFor="color" style={{ color: "red" }}>
              Color is a required field
            </label>
          ) : (
            ""
          )}
        </div>
      </div>
      <div
        className="col-md-4 border border-info d-flex align-items-center justify-content-center"
        style={{ height: "235px" }}
      >
        <div className="text-center">
          {url == "" && (
            <Fragment>
              <label htmlFor="fileInput" className="mb-3">
                <i className="fa-solid fa-cloud-arrow-up display-1"></i>
                <div>Browse a photo</div>
              </label>
              <input
                type="file"
                id="fileInput"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <div>
                <label className="form-label" htmlFor="fileInput" style={{ color: "red" }}>
                  Image is a required field
                </label>
              </div>
            </Fragment>
          )}
          {url != "" && (
            <Fragment>
              <label htmlFor="fileInput">
                <div>
                  <img
                    style={{
                      height: "200px",
                      width: "200px",
                    }}
                    src={url}
                  />
                </div>
              </label>
              <input
                type="file"
                id="fileInput"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </Fragment>
          )}
        </div>
      </div>
    </form>
  );
}
