import React, { useEffect, useState } from "react";
import { ImMenu } from "react-icons/im";
import "./css/SideBar.css";
import productTypeApi from "./api/productTypeApi";
import { Link } from "react-router-dom";

function SideBar() {
  const [productTypes, setProductTypes] = useState([]);
  useEffect(() => {
    productTypeApi.getAll().then((response) => {
      setProductTypes(response.data.data);
    });
  }, []);
  console.log(productTypes.sort());
  return (
    <div className="sidebar">
      <div className="sidebar-top-header">
        <span className="category-icon">
          <ImMenu />
        </span>
        <b class="category-header">DANH MỤC SẢN PHẨM</b>
      </div>
      <div className="sidebar-product-type">
        <Link to={`/user/products`} className="product-type-category">
          TẤT CẢ
        </Link>
        {productTypes &&
          productTypes.sort().map((item) => {
            return (
              // <div className="product-type-category-div">
              <Link
                to={`/user/products/${item.id}`}
                className="product-type-category"
              >
                {item.typeName.toUpperCase()}
              </Link>
              // </div>
            );
          })}
      </div>
    </div>
  );
}

export default SideBar;
