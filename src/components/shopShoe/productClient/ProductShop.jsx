import React, { Fragment, useState, useEffect } from "react";
import InputSearch from "./InputSearch";

import { toast } from "react-toastify";
import ColorFilter from "./ColorFilter";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import RecommendedFilter from "./RecommendedFilter ";
import ShowProductFilter from "./ShowProductFilter";
import { NavLink } from "react-router-dom";
import { Modal } from "react-bootstrap";
import api from "../../../service/api";

function ProductShop() {
  const [productList, setProductList] = useState([]);
  const [productListSearch, setProductListSearch] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [prices, setPrices] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [categoriesSearch, setCategoriesSearch] = useState("all");
  const [colorsSearch, setColorsSearch] = useState("all");
  const [pricesSearch, setPricesSearch] = useState("all");
  const [companiesSearch, setCompaniesSearch] = useState("all");
  const [activeButton, setActiveButton] = useState("all");
  const [showGoToTop, setShowGoToTop] = useState(false);
  const [billDetailApi, setBillDetailApi] = useState([]);
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const [show, setShow] = useState(false);
  const [productById, setProductById] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const productLists = await fetch(api.API_PRODUCT);
      const result = await productLists.json();
      setProductList(result);
      const sortedItems = [...result].sort((a, b) => {
        return b.id - a.id;
      });
      setProductListSearch(sortedItems);

      const colorList = await fetch(api.API_COLOR);
      const resultColors = await colorList.json();
      setColors(resultColors);

      const categoryList = await fetch(api.API_CATEGORY);
      const resultCategory = await categoryList.json();
      setCategories(resultCategory);

      const companyList = await fetch(api.API_COMPANY);
      const resultCompany = await companyList.json();
      setCompanies(resultCompany);

      const priceList = await fetch(api.API_PRICE);
      const resultPrice = await priceList.json();
      setPrices(resultPrice);
    };
    fetchData();
  }, []);
  const handleSearch = () => {
    setProductListSearch(() => {
      let newProductList = productList.filter(
        (product) =>
          (categoriesSearch === "all" || product.category === categoriesSearch) &&
          (companiesSearch === "all" || product.company === companiesSearch) &&
          (pricesSearch === "all" ||
            (product.prevPrice >= parseInt(pricesSearch.split(",")[0]) &&
              product.prevPrice <= parseInt(pricesSearch.split(",")[1]))) &&
          (colorsSearch === "all" || product.color === colorsSearch) &&
          product.title.toLowerCase().includes(inputSearch.toLowerCase())
      );
      return newProductList;
    });
  };

  const handleCheckCompany = (value) => {
    setCompaniesSearch(value);
    setActiveButton(value);
  };

  useEffect(() => {
    handleSearch();
  }, [categoriesSearch, companiesSearch, pricesSearch, colorsSearch, inputSearch]);

  useEffect(() => {
    const fetchData = async () => {
      const billDetailApi = await fetch(api.API_CARTDETAIL);
      const resultBill = await billDetailApi.json();
      setBillDetailApi(resultBill);
    };
    fetchData();
  }, [triggerUpdate]);
  const addToCartDetail = async (product) => {
    const response = await fetch(api.API_CARTDETAIL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    if (response.ok) {
      toast.success("Product is added to the cart");
      setBillDetailApi(product);
      setTriggerUpdate((prev) => !prev);
    } else {
      toast.error("Add failed product", {
        theme: "light",
      });
    }
  };

  const updateCartDetail = async (id, updatedProduct) => {
    console.log(updatedProduct);
    const response = await fetch(api.API_CARTDETAIL + "/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    if (response.ok) {
      toast.info("Update quantity product successfully");
      setTriggerUpdate((prev) => !prev);
    } else {
      toast.error("Add failed product", {
        theme: "light",
      });
    }
  };

  const handleListProductDetail = (index) => {
    let existingProductDetail = billDetailApi.find((product) => product.id == index);
    if (existingProductDetail) {
      existingProductDetail.quantity += 1;
      existingProductDetail.total = existingProductDetail.quantity * existingProductDetail.newPrice;
      updateCartDetail(existingProductDetail.id, existingProductDetail);
      setBillDetailApi((prev) =>
        prev.id == existingProductDetail.id ? existingProductDetail : prev
      );
    } else {
      let newProduct = productList.find((product) => product.id === index);
      newProduct.quantity = 1;
      newProduct.total = newProduct.newPrice;
      addToCartDetail(newProduct);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 200) {
        setShowGoToTop(true);
      } else {
        setShowGoToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleCheckBillDetailClient = () => {
    if (billDetailApi.length == 0) {
      toast.warning("Cart no products", {
        theme: "light",
      });
    }
  };
  const [quantityProductDetail, setQuantityProductDetail] = useState(0);
  const handleCheckProductDetail = (id) => {
    setShow(true);
    const productById = productListSearch.find((e) => e.id === id);
    if (productById) {
      setProductById(productById);
    }
    const productDetailId = billDetailApi.find((e) => e.id == productById.id);
    if (productDetailId) {
      setQuantityProductDetail(productDetailId.quantity);
    } else {
      setQuantityProductDetail(0);
    }
  };

  const handleAdd = () => {
    setQuantityProductDetail((prev) => prev + 1);
  };
  const handleMinus = () => {
    if (quantityProductDetail > 0) {
      setQuantityProductDetail((prev) => prev - 1);
    } else {
      toast.warning("Sản phẩm phải lớn hơn hoặc bằng 0");
    }
  };

  const handleCheck = (id) => {
    if (quantityProductDetail != 0) {
      const productDetailId = billDetailApi.find((e) => e.id == id);
      if (productDetailId) {
        if (productDetailId.quantity == quantityProductDetail) {
          return;
        }
        productDetailId.quantity = quantityProductDetail;
        productDetailId.total = productDetailId.quantity * productDetailId.newPrice;
        updateCartDetail(productDetailId.id, productDetailId);
      } else {
        let newProduct = productList.find((product) => product.id === id);
        newProduct.quantity = quantityProductDetail;
        newProduct.total = newProduct.newPrice * newProduct.quantity;
        addToCartDetail(newProduct);
      }
    }
  };
  useEffect(() => {
    handleCheck(productById?.id);
  }, [quantityProductDetail, productById?.id]);

  return (
    <Fragment>
      <Modal size="xl" show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="row ">
            <div className="col-7 border">
              <img src={productById?.img} className="w-100 " style={{ height: "429px" }} />
            </div>
            <div className="ms-2 col-4 ">
              <div className="mb-3">
                <span style={{ color: "red" }}>New</span>
              </div>
              <div className="ms-3">
                <h2>{productById?.title}</h2>
              </div>
              <div className="d-flex align-items-center mb-2 ms-3">
                <i className="fa-solid fa-star "></i>
                <i className="fa-solid fa-star "></i>
                <i className="fa-solid fa-star "></i>
                <i className="fa-solid fa-star "></i>
                <i className="fa-solid fa-star me-2"></i>
                <div className="reviews">({productById?.reviews} reviews)</div>
              </div>
              <div>
                <div>
                  <h4>Price</h4>
                </div>
                <div className="d-flex">
                  <div className="ms-3 me-2 mb-0">
                    <h6 style={{ color: "#817f7f" }}>${productById?.newPrice}</h6>
                  </div>

                  <div className="text-decoration-line-through mb-0">
                    <h6 style={{ color: "#817f7f" }}>${productById?.prevPrice}</h6>
                  </div>
                </div>
              </div>
              <div>
                <h4>Company</h4>
                <div className="ms-3">
                  <h6 style={{ color: "#817f7f" }}>{productById?.company}</h6>
                </div>
              </div>
              <div>
                <h4>Category</h4>
                <div className="ms-3">
                  <h6 style={{ color: "#817f7f" }}>{productById?.category}</h6>
                </div>
              </div>
              <div className="d-flex border-bottom">
                <h4 className="me-3">Color:</h4>
                <div
                  className="mt-1 rounded-circle"
                  style={{
                    backgroundColor: productById?.color,
                    border: `1px solid ${
                      productById?.color === "White" ? "black" : productById?.color
                    }`,
                    width: "25px",
                    height: "25px",
                  }}
                ></div>
              </div>
              <div className="d-flex mt-3 ms-3">
                <div style={{ backgroundColor: "#a3a3a3" }} className="d-flex w-25 me-3">
                  <div
                    className="text-center handleQuantity"
                    style={{ width: "35px", alignSelf: "center" }}
                    onClick={() => handleMinus(productById?.id)}
                  >
                    -
                  </div>
                  <input
                    className="w-75"
                    type="number"
                    value={quantityProductDetail}
                    onChange={(e) => setQuantityProductDetail(e.target.value)}
                  />
                  <div
                    className="text-center handleQuantity"
                    style={{ width: "35px", alignSelf: "center" }}
                    onClick={() => handleAdd(productById?.id)}
                  >
                    +
                  </div>
                </div>
                <div onClick={handleCheckBillDetailClient}>
                  {billDetailApi != 0 ? (
                    <>
                      <NavLink className="mx-3 " to={"/cartUser"}>
                        <button className="btn btn-primary">Buy Now</button>
                      </NavLink>
                      <NavLink className="mx-3 " to={"/cartUser"}>
                        <i className="fa-solid fa-cart-shopping "></i>
                      </NavLink>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-primary mx-3">Buy Now</button>
                      <i className="fa-solid fa-cart-shopping mx-3  "></i>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {Object.keys(productListSearch).length == 0 && <span className="loader"></span>}
      <div className="d-flex mt-2 py-2 border-bottom align-items-center container">
        <div className="ms-0 ps-2" style={{ width: "180px" }}>
          <a href="#" className="text-decoration-none " style={{ color: "black" }}>
            <i className="fa-solid fa-cart-plus me-2"></i>
            Shoe Ecommerce
          </a>
        </div>
        <div className="d-flex flex-grow-1 justify-content-between ">
          <InputSearch inputSearchProduct={(prev) => setInputSearch(prev)} />
          <div className="d-flex">
            <div onClick={handleCheckBillDetailClient}>
              {billDetailApi.length !== 0 ? (
                <NavLink to={"/cartUser"}>
                  <i className="fa-solid fa-cart-shopping align-bottom"></i>
                </NavLink>
              ) : (
                <i className="fa-solid fa-cart-shopping align-bottom"></i>
              )}
            </div>

            <div className="pe-2">
              {billDetailApi != "" ? (
                <span
                  style={{
                    border: "1px solid red",
                    borderRadius: "5px",
                    backgroundColor: "red",
                    fontSize: "15px",
                    color: "white",
                  }}
                >
                  {billDetailApi.length}
                </span>
              ) : (
                ""
              )}
            </div>
            <div>
              <NavLink to={"/dashboard"}>
                <i className="fa-solid fa-user me-3 align-bottom"></i>
              </NavLink>
            </div>
            <div>
              <i className="fa-solid fa-house-user align-bottom"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex container">
        <div style={{ minWidth: "180px" }}>
          <div className=" border-end me-1 h-100">
            <CategoryFilter categories={categories} setCategoriesSearch={setCategoriesSearch} />

            <PriceFilter prices={prices} setPricesSearch={setPricesSearch} />

            <ColorFilter colors={colors} setColorsSearch={setColorsSearch} />
          </div>
        </div>
        <div className="flex-grow-1">
          <RecommendedFilter
            companies={companies}
            activeButton={activeButton}
            handleCheckCompany={handleCheckCompany}
          />
          <ShowProductFilter
            productListSearch={productListSearch}
            handleListProductDetail={handleListProductDetail}
            handleCheckProductDetail={handleCheckProductDetail}
          />
        </div>
      </div>

      {showGoToTop && (
        <button
          onClick={() => window.scrollTo(0, 0)}
          style={{
            position: "fixed",
            right: "20px",
            bottom: "20px",
          }}
        >
          Go to Top
        </button>
      )}
    </Fragment>
  );
}
export default ProductShop;
