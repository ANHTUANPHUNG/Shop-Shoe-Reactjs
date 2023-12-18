import React, { useEffect } from "react";

export function Pagination(props) {
  const { setPageNumber, totalPage, element, setElement, pageNumber } = props;
  useEffect(() => {
    setPageNumber(1);
  }, [element, setPageNumber]);
  return (
    <div className="mt-3 d-flex justify-content-between" style={{ height: "42px" }}>
      <div className="d-flex">
        <button
          type="button"
          className="btn btn-secondary"
          style={{ borderTopRightRadius: "0px", borderBottomRightRadius: "0px" }}
          onClick={() => setPageNumber((pageNumber) => (pageNumber != 1 ? pageNumber - 1 : 1))}
        >
          Previous
        </button>
        <button
          type="button"
          className="btn btn-info"
          style={{ borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px" }}
          onClick={() =>
            setPageNumber((pageNumber) => (pageNumber != totalPage ? pageNumber + 1 : totalPage))
          }
        >
          Next
        </button>
      </div>
      <div className="d-flex ">
        <div className="align-self-center">
          <label htmlFor="checkPage">Items per page</label>
        </div>
        <div>
          <select
            id="checkPage"
            className="form-select"
            aria-label="Default select example"
            value={element}
            onChange={(e) => setElement(e.target.value)}
          >
            <option value="10">10</option>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="15">15</option>
          </select>
        </div>
      </div>
    </div>
  );
}
