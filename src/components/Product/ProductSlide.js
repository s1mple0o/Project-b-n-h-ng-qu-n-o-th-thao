import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import "./css/ProductSlide.css";

function ProductSlide({ productList }) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
  };
  return (
    <Slider {...settings}>
      {productList.map((item) => {
        return <ProductDetail item={item} />;
      })}
    </Slider>
  );
}

export default ProductSlide;
