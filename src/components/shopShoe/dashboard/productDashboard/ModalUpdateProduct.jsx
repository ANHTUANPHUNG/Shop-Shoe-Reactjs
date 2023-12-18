import React from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

export function ModalUpdateProduct({
  show,
  handleClose,
  setTitle,
  title,
  price,
  setPrice,
  setPrevPrice,
  prevPrice,
  category,
  setCategory,
  company,
  setCompany,
  color,
  setColor,
  url,
  setShow,
  handleImageChange,
  handleSubmitFormUpdate,
}) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      animation={false}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Modal Update</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row">
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
                <label htmlFor="title" style={{ color: "red" }} className="form-label">
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
              <label htmlFor="prevPrice" className="form-label">
                Reduced
              </label>
              <input
                onInput={(e) => setPrevPrice(e.target.value)}
                value={prevPrice}
                type="text"
                placeholder="Input"
                id="prevPrice"
                className="form-control form-control-sm"
              />
              
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group ">
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
              {category == "" ? (
                <label className="form-label" style={{ color: "red" }}>
                  Category is a required field
                </label>
              ) : (
                ""
              )}
            </div>
            <div className="form-group ">
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
              {company == "" ? (
                <label className="form-label" style={{ color: "red" }}>
                  Company is a required field
                </label>
              ) : (
                ""
              )}
            </div>
            <div className="form-group ">
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
              {color == "" ? (
                <label className="form-label" style={{ color: "red" }}>
                  Color is a required field
                </label>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-md-4 border border-info d-flex align-items-center justify-content-center">
            <div className="text-center">
              <label htmlFor="fileInput">
                <div>
                  <img
                    alt="not found"
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
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={(e) => handleSubmitFormUpdate(e)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
