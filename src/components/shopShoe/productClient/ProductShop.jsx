import React, { Fragment, useState, useEffect } from "react";
import ShowFunction from "../../Show";
import InputSearch from "./InputSearch";
import ProductDetail from "../productDetail/ProductDetail";
import { toast } from "react-toastify";

import ColorFilter from "./ColorFilter";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import RecommendedFilter from "./RecommendedFilter ";
import ShowProductFilter from "./ShowProductFilter";
import DashboardOrder from "../dashboard/DashboardOrder";
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
  const [showFunction, setShowFunction] = useState(false);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showGoToTop, setShowGoToTop] = useState(false);
  const [billDetailApi, setBillDetailApi] = useState([]);
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const productLists = await fetch(`http://localhost:3300/product`);
      const result = await productLists.json();
      setProductList(result);
      setProductListSearch(result);

      const colorList = await fetch(`http://localhost:3300/colors`);
      const resultColors = await colorList.json();
      setColors(resultColors);

      const categoryList = await fetch(`http://localhost:3300/categories`);
      const resultCategory = await categoryList.json();
      setCategories(resultCategory);

      const companyList = await fetch(`http://localhost:3300/companies`);
      const resultCompany = await companyList.json();
      setCompanies(resultCompany);

      const priceList = await fetch(`http://localhost:3300/prices`);
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
      const billDetailApi = await fetch(`http://localhost:3300/cartDetail`);
      const resultBill = await billDetailApi.json();
      setBillDetailApi(resultBill);
    };
    fetchData();
  }, [triggerUpdate]);

  const addToCartDetail = async (product) => {
    const response = await fetch("http://localhost:3300/cartDetail", {
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
    const response = await fetch("http://localhost:3300/cartDetail/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    if (response.ok) {
      toast.info("Add product successfully");
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
      existingProductDetail.total =
        existingProductDetail.quantity * existingProductDetail.prevPrice;
      updateCartDetail(existingProductDetail.id, existingProductDetail);
      setBillDetailApi((prev) =>
        prev.id == existingProductDetail.id ? existingProductDetail : prev
      );
    } else {
      let newProduct = productList.find((product) => product.id === index);
      newProduct.quantity = 1;
      newProduct.total = newProduct.prevPrice;
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
      setShowProductDetail(false) && setShowFunction(true);
      toast.warning("Cart no products", {
        theme: "light",
      });
    } else {
      setShowProductDetail(true) && setShowFunction(false);
    }
  };

  return (
    <Fragment>
      {!showFunction && !showProductDetail && !showAdmin && (
        <Fragment>
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
                <div>
                  <i
                    className="fa-solid fa-cart-shopping   align-bottom"
                    onClick={() => handleCheckBillDetailClient()}
                  ></i>
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
                  <i
                    className="fa-solid fa-user me-3 align-bottom"
                    onClick={() => setShowAdmin(true)}
                  ></i>
                </div>
                <div>
                  <i
                    className="fa-solid fa-house-user align-bottom"
                    onClick={() => setShowFunction(true)}
                  ></i>
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
              />
            </div>
          </div>
        </Fragment>
      )}
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
      {showFunction && <ShowFunction />}
      {showProductDetail && <ProductDetail />}
      {showAdmin && <DashboardOrder />}
    </Fragment>
  );
}
export default ProductShop;
