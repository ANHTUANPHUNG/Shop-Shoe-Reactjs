import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import ProductShop from "../productClient/ProductShop";
import { MenuDashboard } from "./MenuDashboard";
import { OrderManagement } from "./OrderManagement";
import { BillInformation } from "./BillInformation";
import { Pagination } from "./Pagination";
import { ProductListDashboard } from "./ProductListDashboard";
import { SortDashboard } from "./SortDashboard";
import { ModalUpdateProduct } from "./ModalUpdateProduct";
import { ModalCreateProduct } from "./ModalCreateProduct";

function DashboardOrder() {
  const [listBill, setListBill] = useState([]);
  const [billId, setBillId] = useState([]);
  const [billInformation, setBillInformation] = useState(false);
  const [checkCRUDProduct, setCheckCRUDProduct] = useState(false);
  const [showFormAddProduct, setShowFormAddProduct] = useState(false);
  const [showDashboard, setShowDashboard] = useState(true);
  const [product, setProduct] = useState([]);
  const [checkListProduct, setCheckListProduct] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [prevPrice, setPrevPrice] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [company, setCompany] = useState("");
  const [show, setShow] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [idProduct, setIdProduct] = useState("");
  const [sort, setSort] = useState("id");
  const [sortCheck, setSortCheck] = useState("ascendent");
  const [element, setElement] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState();

  const CLOUD_NAME = "dw4xpd646";
  const UPLOAD_PRESET = "oohlfcxa";
  const [url, setUrl] = useState("");

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    const image = file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", UPLOAD_PRESET);
    data.append("cloud_name", CLOUD_NAME);
    data.append("folder", "Cloudinary-React");

    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: data,
    });
    if (response.ok) {
      const res = await response.json();
      setUrl(res.secure_url);
    }
  };

  useEffect(() => {
    const handleSort = () => {
      if (sort === "id") {
        const sortedItems = [...product].sort((a, b) => {
          return sortCheck === "ascendent" ? a.id - b.id : b.id - a.id;
        });
        setProduct(sortedItems);
      } else if (sort === "category") {
        const sortedItems = [...product].sort((a, b) => {
          return sortCheck === "ascendent"
            ? a.category.localeCompare(b.category)
            : b.category.localeCompare(a.category);
        });
        setProduct(sortedItems);
      } else if (sort === "title") {
        const sortedItems = [...product].sort((a, b) => {
          return sortCheck === "ascendent"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
        });
        setProduct(sortedItems);
      } else if (sort === "company") {
        const sortedItems = [...product].sort((a, b) => {
          return sortCheck === "ascendent"
            ? a.company.localeCompare(b.company)
            : b.company.localeCompare(a.company);
        });
        setProduct(sortedItems);
      } else if (sort === "color") {
        const sortedItems = [...product].sort((a, b) => {
          return sortCheck === "ascendent"
            ? a.color.localeCompare(b.color)
            : b.color.localeCompare(a.color);
        });
        setProduct(sortedItems);
      } else {
        const sortedItems = [...product].sort((a, b) => {
          return sortCheck === "ascendent" ? a.newPrice - b.newPrice : b.newPrice - a.newPrice;
        });
        setProduct(sortedItems);
      }
    };
    handleSort();
  }, [sort, sortCheck]);

  const handleDeleteProduct = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    });

    if (result.isConfirmed) {
      const response = await fetch("http://localhost:3300/product/" + id, {
        method: "DELETE",
      });
      if (response.ok) {
        setCheckListProduct((prev) => !prev);
        toast.error("Deleted successfully");
      }
    }
  };
  const handleShow = (id) => {
    setShow(true);
    const productEdit = product.find((e) => e.id == id);
    setTitle(productEdit.title);
    setPrice(productEdit.newPrice);
    setPrevPrice(productEdit.prevPrice);
    setCategory(productEdit.category);
    setColor(productEdit.color);
    setCompany(productEdit.company);
    setUrl(productEdit.img);
    setIdProduct(id);
    setShowFormAddProduct(false);
  };
  const handleSubmitFormUpdate = async (e) => {
    let productUpdate = product.find((e) => e.id == idProduct);

    productUpdate = {
      title: title,
      star: 4,
      reviews: 123,
      img: url,
      newPrice: price,
      company: company,
      color: color,
      category: category,
    };

    const response = await fetch("http://localhost:3300/product/" + idProduct, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productUpdate),
    });

    if (response.ok) {
      toast.info("Update successful products");
      setCheckListProduct((prev) => !prev);

      setShow(false);
    } else {
      toast.error("Update failed product", {
        theme: "light",
      });
    }
  };
  const handleClose = () => setShow(false);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3300/billDetail`);

      const res = await response.json();

      setListBill(res);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3300/product`);
      const res = await response.json();
      const start = (pageNumber - 1) * element;
      const end = start + Number(element);
      const sortedItems = [...res].sort((a, b) => {
        return b.id - a.id;
      });
      const displayedProducts = sortedItems.slice(start, end);

      setProduct(displayedProducts);
      const number = Math.ceil(res.length / element);
      setTotalPage(number);
    };
    fetchData();
  }, [pageNumber, checkListProduct, element]);

  const handleShowContentBill = (id) => {
    const bill = listBill.find((e) => e.id == id);

    setBillId(bill);

    setBillInformation(true);
  };
  const handleSubmitFormAdd = async (e) => {
    e.preventDefault();

    const product = {
      title: title,
      star: 4,
      reviews: 123,
      img: url,
      newPrice: price,
      company: company,
      color: color,
      category: category,
    };

    const response = await fetch("http://localhost:3300/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (response.ok) {
      toast.success("Create successful products");
      setCheckListProduct((prev) => !prev);
      setPrice("");
      setTitle("");
      setCompany("");
      setCategory("");
      setColor("");
      setUrl("");
    } else {
      toast.error("Create failed product", {
        theme: "light",
      });
    }
  };

  return (
    <Fragment>
      {showDashboard && (
        <Fragment>
          <ModalUpdateProduct
            show={show}
            handleClose={handleClose}
            setTitle={setTitle}
            title={title}
            price={price}
            setPrice={setPrice}
            setPrevPrice={setPrevPrice}
            prevPrice={prevPrice}
            category={category}
            setCategory={setCategory}
            company={company}
            setCompany={setCompany}
            color={color}
            setColor={setColor}
            url={url}
            setShow={setShow}
            handleImageChange={handleImageChange}
            handleSubmitFormUpdate={handleSubmitFormUpdate}
          />

          <div className="container">
            <div className="py-3 d-flex justify-content-between border-bottom">
              <div>
                <i className="fa-solid fa-cart-plus me-1"></i>Dashboard
              </div>
              <a
                id="goProduct"
                onClick={() => {
                  setShowProduct(true);
                  setShowDashboard(false);
                }}
              >
                Anh Tuấn <i className="fa-solid fa-right-to-bracket ms-1"></i>
              </a>
            </div>
          </div>
          <div className="container my-2 d-flex">
            <div className="d-flex" style={{ width: "100%" }}>
              <MenuDashboard setCheckCRUDProduct={setCheckCRUDProduct} />

              {!checkCRUDProduct &&
                (!billInformation ? (
                  <div className="" style={{ width: "86%" }}>
                    <OrderManagement
                      fontSize={16}
                      listBill={listBill}
                      handleShowContentBill={handleShowContentBill}
                    />
                  </div>
                ) : (
                  <div className="" style={{ width: "51%" }}>
                    <OrderManagement
                      fontSize={13}
                      listBill={listBill}
                      handleShowContentBill={handleShowContentBill}
                    />
                  </div>
                ))}
              {checkCRUDProduct && (
                <div style={{ width: "86%" }}>
                  <div className="d-flex justify-content-between">
                    <h5>Product List Management</h5>
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() => setShowFormAddProduct(true)}
                    >
                      <i className="fa-solid fa-plus "></i>
                      Add new Product
                    </button>
                  </div>
                  {showFormAddProduct && (
                    <div className="my-3 ">
                      <ModalCreateProduct
                        handleSubmitFormAdd={handleSubmitFormAdd}
                        setTitle={setTitle}
                        title={title}
                        setPrice={setPrice}
                        price={price}
                        setShowFormAddProduct={setShowFormAddProduct}
                        setCategory={setCategory}
                        category={category}
                        company={company}
                        color={color}
                        setColor={setColor}
                        setCompany={setCompany}
                        url={url}
                        handleImageChange={handleImageChange}
                      />
                    </div>
                  )}
                  <div>
                    <div className="d-flex">
                      <SortDashboard
                        sort={sort}
                        setSort={setSort}
                        setSortCheck={setSortCheck}
                        sortCheck={sortCheck}
                      />
                    </div>
                    <div>
                      <ProductListDashboard
                        product={product}
                        handleShow={handleShow}
                        handleDeleteProduct={handleDeleteProduct}
                      />
                    </div>
                    <Pagination
                      setPageNumber={setPageNumber}
                      pageNumber={pageNumber}
                      totalPage={totalPage}
                      element={element}
                      setElement={setElement}
                    />
                  </div>
                </div>
              )}
            </div>
            {!checkCRUDProduct && billInformation && (
              <div>
                {<BillInformation billId={billId} setBillInformation={setBillInformation} />}
              </div>
            )}
          </div>
        </Fragment>
      )}

      {showProduct && <ProductShop />}
    </Fragment>
  );
}
export default DashboardOrder;
