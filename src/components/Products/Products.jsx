import React, { useContext, useEffect } from "react";
import Product from "./Product";
import { ShoeContext } from "../../context/ShoeContext";
import axios from "axios";
import { getProductList } from "../../reducer/action";

function Products() {
  const { state,dispatch } = useContext(ShoeContext);
  const { productList, filters } = state;
  const { searchText, recommended, color, price, category } = filters;
  useEffect( ()=>{
   const fetchData= () =>   axios.get("http://localhost:3300/product")
    .then(response=>{
      dispatch(getProductList(response.data))
    })
    fetchData()
  },[])

  const queryProducts = () => {
    let filtersProducts = [...productList];
    if (searchText) {
      filtersProducts = filtersProducts.filter((e) =>
        e.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    if (recommended != "All") {
      filtersProducts = filtersProducts.filter(
        (e) => e.company.toLowerCase() === recommended.toLowerCase()
      );
    }
    if (category != "All") {
      filtersProducts = filtersProducts.filter(
        (e) => e.category.toLowerCase() === category.toLowerCase()
      );
    }
    if (color != "All") {
      filtersProducts = filtersProducts.filter(
        (e) => e.color.toLowerCase() === color.toLowerCase()
      );
    }
    if (price != "0,0") {
      const [min, max] = price.split(",");
      if (min !== max) {
        filtersProducts = filtersProducts.filter(
          (e) => e.prevPrice >= Number(min) && e.prevPrice <= Number(max)
        );
      } else {
        filtersProducts = filtersProducts.filter((e) => e.prevPrice > Number(min));
      }
    }

    return filtersProducts;
  };
  console.log(category);
  console.log(filters.category);

  const remainProducts = queryProducts();
  return (
    <div className="py-2 d-flex flex-column justify-content-center">
      <h5>Products</h5>
      <div className="row">
        {remainProducts.map((e) => (
          <Product key={e.id} product={e} />
        ))}
      </div>
    </div>
  );
}

export default Products;
