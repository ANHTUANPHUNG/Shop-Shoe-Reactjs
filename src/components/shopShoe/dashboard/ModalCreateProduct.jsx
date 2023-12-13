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
        <div className="mb-2">
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
        </div>
        <div className="mb-2">
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
        </div>
        <div className="mb-2">
          <div className="d-flex ">
            <button style={{ width: "145px" }} className="btn btn-success btn-sm mt-3 ">
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
        <div className="form-group mb-2">
          <label className="form-label">Category</label>
          <select
            className="form-select form-select-sm form-control-sm "
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Please select category</option>
            <option value="Sneakers">Sneakers</option>
            <option value="Flats">Flats</option>
            <option value="Sandals">Sandals</option>
            <option value="Heels">Heels</option>
          </select>
        </div>
        <div className="form-group mb-2">
          <label className="form-label">Company</label>
          <select
            className="form-select form-select-sm form-control-sm "
            name="company"
            onChange={(e) => setCompany(e.target.value)}
            value={company}
          >
            <option value="">Please select company</option>
            <option value="Nike">Nike</option>
            <option value="Adidas">Adidas</option>
            <option value="Puma">Puma</option>
            <option value="Vans">Vans</option>
          </select>
        </div>
        <div className="form-group mb-2">
          <label className="form-label">Color</label>
          <select
            className="form-select form-select-sm form-control-sm "
            name="color"
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
        </div>
      </div>
      <div className="col-md-4 border border-info d-flex align-items-center justify-content-center">
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
