import React, { useEffect, useState } from "react";
import axiosClient from "./../../api/axiosClient";
import productApi from "./api/productApi";
import ProductDetail from "./ProductDetail";
import { Pagination } from "antd";
import "./css/Product.css";
import { useParams } from "react-router-dom";
function Product() {
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(16);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(0);
  const { id } = useParams();
  useEffect(() => {
    if (id === undefined || id === null) {
      productApi.getAll(current, limit).then((response) => {
        const data = response.data.data;
        setTotal(response.data.total);
        setProductList(data);
      });
    } else {
      productApi.getProductByTypeId(id).then((response) => {
        const data = response.data.data;
        setTotal(response.data.total);
        setProductList(data);
      });
    }
  }, [page, limit, id]);
  console.log("productList", productList);

  const onPaginationChange = (current) => {
    setPage(current);
    setCurrent(current - 1);
    console.log(current - 1);
  };

  return (
    <div>
      <div className="list-product">
        {productList.map((item) => {
          return (
            <div className="product-card-item">
              <ProductDetail item={item} />
            </div>
          );
        })}
      </div>
      <div className="pagination">
        <Pagination
          current={page}
          total={Math.ceil(total / limit) * 10}
          onChange={(current) => onPaginationChange(current)}
        />
      </div>
    </div>
  );
}

export default Product;
