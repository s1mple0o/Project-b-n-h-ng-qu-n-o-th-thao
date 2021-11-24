import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Rate } from "antd";
import { Radio } from "antd";
import productApi from "./api/productApi";
import "./css/ProductDetailOption.css";
import optionApi from "./api/optionApi";
import { CartContext } from "../../context/CartContext";
import toastifyAlert from "../../toastify-message/toastify";
import ProductSlide from "./ProductSlide";

function ProductDetailOption() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState({});
  const [option, setOption] = useState({});
  const [valueOption, setValueOption] = useState(null);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValueOption(e.target.value);
  };

  const [productListAll, setProductListAll] = useState([]);
  useEffect(() => {
    productApi
      .getAll(0, 15)
      .then((response) => {
        const data = response.data.data;
        setProductListAll(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    productApi.getById(id).then((response) => {
      const data = response.data.data;
      setProduct(data);
      console.log(data);
    });
  }, [id]);

  useEffect(() => {
    optionApi.getById(product.optionId).then((response) => {
      const data = response.data.data;
      setOption(data);
      console.log(data);
    });
  }, [product]);

  const onAddToCart = (e, product, optionName, valueOption) => {
    addToCart(e, product, optionName, valueOption);
  };

  const checkAmount = (product) => {
    let x = "";
    if (product.quantity <= 0) {
      x = "Hết hàng";
    } else if (product.quantity <= 10) {
      x = "Sắp hết hàng";
    } else {
      x = "Còn nhiều";
    }
    return x;
  };
  return (
    <>
      <div className="product-detail-option-card">
        <div className="container-product">
          <div id="product-show" className="product-sub-container">
            <div className="product-image">
              <img className="imageProduct" src={product.image} />
            </div>
          </div>
          <div id="product-info" className="product-sub-container">
            <div id="product-name" className="product-sub-info">
              <h3>{product.productName}</h3>
            </div>
            <div id="product-rate" className="product-sub-info">
              <Rate allowHalf disabled value={5} style={{ color: "orange" }} />
            </div>
            <div id="product-quantity" className="product-sub-info">
              <b>
                Tình trạng:{" "}
                <span className={product.quantity <= 0 ? "clean-out" : "exist"}>
                  {checkAmount(product)}
                </span>
              </b>
            </div>
            <div id="product-name" className="product-sub-info">
              <b>
                Đơn giá:{" "}
                <span style={{ color: "red" }}>{product.price} VNĐ</span>
              </b>
            </div>
            <div id="product-option" className="product-sub-info">
              <b>Chọn {option.optionName}:</b>
              <br />
              <Radio.Group onChange={onChange} value={valueOption}>
                {product.optionValues &&
                  product.optionValues.map((value) => {
                    return (
                      <div className="radio-option">
                        <Radio value={value.value}>{value.value}</Radio>
                      </div>
                    );
                  })}
              </Radio.Group>
            </div>
            <div id="product-action" className="product-sub-info">
              <button
                className="btnProduct"
                id="btnAddToCart"
                onClick={(e) =>
                  onAddToCart(e, product, option.optionName, valueOption)
                }
              >
                Thêm vào giỏ hàng
              </button>
              <button className="btnProduct" id="btnBuyNow">
                Mua ngay
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="product-type-name">
        <b>Hàng tương tự</b>
      </div>
      <ProductSlide productList={productListAll} />
      <div className="product-type-name">
        <b>Có thể bạn muốn xem</b>
      </div>
      <ProductSlide productList={productListAll} />
    </>
  );
}

export default ProductDetailOption;
