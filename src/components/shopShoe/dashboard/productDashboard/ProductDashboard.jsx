import React, { Fragment, useEffect, useState } from "react";
import { MenuDashboard } from "../MenuDashboard";
import { ModalCreateProduct } from "./ModalCreateProduct";
import { SortDashboard } from "./SortDashboard";
import { ProductListDashboard } from "./ProductListDashboard";
import { Pagination } from "./Pagination";
import { ModalUpdateProduct } from "./ModalUpdateProduct";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { LayoutDashboard } from "../LayoutDashboard";

export function ProductDashboard({ data, setData }) {
  const [showFormAddProduct, setShowFormAddProduct] = useState(false);
  const [product, setProduct] = useState([]);
  const [checkListProduct, setCheckListProduct] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [prevPrice, setPrevPrice] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [company, setCompany] = useState("");
  const [show, setShow] = useState(false);
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
      // Xóa sản phẩm từ data.product
      setData((prevData) => {
        const updatedProduct = prevData.product.filter((product) => product.id !== id);
        return { ...prevData, product: updatedProduct };
      });

      setCheckListProduct((prev) => !prev);
      toast.error("Deleted successfully");
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
    if (title === "" || price === "" || category === "" || color === "" || company === "" || url === "") {
      toast.error("Fill in all required fields");
      return;
    }
  
    // Tìm sản phẩm cần cập nhật trong data.product
    const updatedProduct = data.product.find((product) => product.id === idProduct);
  
    // Cập nhật thông tin sản phẩm
    updatedProduct.title = title;
    updatedProduct.star = 4;
    updatedProduct.reviews = 123;
    updatedProduct.img = url;
    updatedProduct.newPrice = price;
    updatedProduct.company = company;
    updatedProduct.color = color;
    updatedProduct.category = category;
    updatedProduct.prevPrice = prevPrice;
  
    // Cập nhật data.product trong state
    setData((prevData) => {
      const updatedProductList = prevData.product.map((product) => (product.id === idProduct ? updatedProduct : product));
      return { ...prevData, product: updatedProductList };
    });
  
    toast.info("Update successful products");
    setCheckListProduct((prev) => !prev);
    setShow(false);
  };
  
  const handleShowFormCreateProduct = () => (
    setPrice(""),
    setTitle(""),
    setCompany(""),
    setCategory(""),
    setColor(""),
    setUrl(""),
    setShowFormAddProduct(true)
  );
  const handleClose = () => setShow(false);

  useEffect(() => {
    const start = (pageNumber - 1) * element;
    const end = start + Number(element);
  
    const sortedItems = [...data.product].sort((a, b) => {
      return b.id - a.id;
    });
    const displayedProducts = sortedItems.slice(start, end);
  
    setProduct(displayedProducts);
    const number = Math.ceil(data.product.length / element);
    setTotalPage(number);
  }, [pageNumber, checkListProduct, element, data.product]);
  
  const handleSubmitFormAdd = async (e) => {
    e.preventDefault();
    if (title === "" || price === "" || category === "" || color === "" || company === "" || url === "") {
      toast.error("Fill in all required fields");
      return;
    }
    
    const newProduct = {
      id: Math.floor(Math.random() * 1000), // Tạo một id ngẫu nhiên, bạn có thể thay đổi cách tạo id này tùy theo cách bạn lưu dữ liệu.
      title: title,
      star: 4,
      reviews: 123,
      img: url,
      newPrice: price,
      company: company,
      color: color,
      category: category,
      prevPrice: 0,
    };
  
    // Thêm sản phẩm mới vào data.product
    setData((prevData) => ({
      ...prevData,
      product: [...prevData.product, newProduct],
    }));
  
    toast.success("Create successful products");
    setCheckListProduct((prev) => !prev);
    setPrice("");
    setTitle("");
    setCompany("");
    setCategory("");
    setColor("");
    setUrl("");
  };
  
  return (
    <Fragment>
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
        <LayoutDashboard />
        <div className="container my-2 d-flex">
          <div className="d-flex" style={{ width: "100%" }}>
            <MenuDashboard />

            <div style={{ width: "86%" }}>
              <div className="d-flex justify-content-between">
                <h5>Product List Management</h5>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => handleShowFormCreateProduct()}
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
          </div>
        </div>
      </Fragment>
    </Fragment>
  );
}
