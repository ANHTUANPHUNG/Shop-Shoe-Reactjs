import React from "react";

export function ProductListDashboard({ product, handleShow, handleDeleteProduct }) {
  return (
    <table className="table table-striped table-hover" id="tbRenderProduct">
      <thead className="table-info">
        <tr>
          <th>Title</th>
          <th>Color</th>
          <th>Category</th>
          <th>Company</th>
          <th>Price</th>
          <th>Rate</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {product.map((e) => (
          <tr key={e.id}>
            <td className="d-flex">
              <div className="align-items-center">
                <img style={{ width: "50px", height: "50px" }} src={e.img} />
                <span className="ms-2">{e.title}</span>
              </div>
            </td>
            <td className="align-middle">
              <div
                style={{
                  backgroundColor: e.color,
                  color: e.color == "White" ? "black" : "white",
                  borderRadius: "11px",
                }}
              >
                {e.color}
              </div>
            </td>
            <td className="align-middle">{e.category}</td>
            <td className="align-middle">{e.company}</td>
            <td>
              <div>${e.prevPrice}</div>
              <div>${e.newPrice}</div>
            </td>
            <td>
              <div>
                {e.star}
                <i className="fa-solid fa-star " style={{ color: "yellow" }}></i>
              </div>
              <div>
                {e.reviews}
                <i className="fa-solid fa-eye" style={{ color: "green" }}></i>
              </div>
            </td>
            <td className="align-middle">
              <i
                className="fa-solid fa-pen-to-square me-2"
                style={{ color: "green" }}
                onClick={() => handleShow(e.id)}
              ></i>
              <i
                className="fa-solid fa-trash-can"
                onClick={() => handleDeleteProduct(e.id)}
                style={{ color: "red" }}
              ></i>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
