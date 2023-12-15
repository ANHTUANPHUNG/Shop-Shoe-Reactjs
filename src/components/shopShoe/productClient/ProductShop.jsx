import React, { Fragment, useState, useEffect, useContext, createContext } from "react";
import InputSearch from "./InputSearch";
import { toast } from "react-toastify";

import ColorFilter from "./ColorFilter";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import RecommendedFilter from "./RecommendedFilter ";
import ShowProductFilter from "./ShowProductFilter";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../../App";

export const ThemeProductShop = createContext();

function ProductShop() {
  const { data, setData } = useContext(ThemeContext);
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

  useEffect(() => {
    const fetchData = async () => {
      setProductList(data.product);

      setColors(data.colors);

      setCategories(data.categories);
      setCompanies(data.companies);
      setPrices(data.prices);
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
      setBillDetailApi(data.cartDetail);
    };
    fetchData();
  }, [triggerUpdate]);

  const addToCartDetail = async (product) => {
    toast.success("Product is added to the cart");
    setData({ ...data, cartDetail: [...data.cartDetail, product] });
    setTriggerUpdate((prev) => !prev);
  };

  const updateCartDetail = async (id, updatedProduct) => {
    const updatedProductList = billDetailApi.map((product) =>
      product.id === id ? { ...product, quantity: (product.quantity || 0) + 1 } : product
    );

    toast.info("Add product successfully");
    setTriggerUpdate((prev) => !prev);
    setBillDetailApi(updatedProductList);
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
      toast.warning("Cart no products", {
        theme: "light",
      });
    }
  };
  const valueCheck = {
    categories,
    prices,
    colors,
    companies,
    setCategoriesSearch,
    setColorsSearch,
    setPricesSearch,
    setCompaniesSearch,
    handleCheckCompany,
    activeButton,
  };
  return (
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
      <ThemeProductShop.Provider value={valueCheck}>
        <div className="d-flex container">
          <div style={{ minWidth: "180px" }}>
            <div className=" border-end me-1 h-100">
              <CategoryFilter />

              <PriceFilter />

              <ColorFilter />
            </div>
          </div>
          <div className="flex-grow-1">
            <RecommendedFilter />
            {productListSearch == "" ? (
              <ShowProductFilter
                productListSearch={productList}
                handleListProductDetail={handleListProductDetail}
              />
            ) : (
              <ShowProductFilter
                productListSearch={productListSearch}
                handleListProductDetail={handleListProductDetail}
              />
            )}
          </div>
        </div>
      </ThemeProductShop.Provider>

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
