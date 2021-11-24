import React, { useState, useContext, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import "./css/ProductDetail.css";
import { CartContext } from "../../context/CartContext";
import toastifyAlert from "./../../toastify-message/toastify";

function ProductDetail({ item }) {
  const { productListCart, addToCart, loadCart } = useContext(CartContext);
  const onAddToCart = (e, product) => {
    addToCart(e, product);
    toastifyAlert.success(
      `Đã thêm sản phẩm ${product.productName} vào giỏ hàng`
    );
  };

  // useEffect(() => {
  //   loadCart();
  // }, []);

  // productListCart

  return (
    <Card className="product-card">
      {/* <CardMedia
        component="img"
        alt="Ảnh sản phẩm"
        height="200"
        image={item.image}
      /> */}
      <div className="img-product-detail-div">
        <img className="img-product-detail" src={item.image} />
      </div>
      <CardContent>
        <Typography
          gutterBottom
          variant="h7"
          component="div"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          <Link
            className="product-card-name"
            to={`/user/products/productDetail/${item.productId}`}
          >
            {" "}
            {item.productName}
          </Link>
        </Typography>

        <Typography
          variant="body2"
          color="red"
          component="div"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          Giá: {item.price} VNĐ
        </Typography>
      </CardContent>
      {/* <CardActions>
      </CardActions> */}
    </Card>
  );
}

export default ProductDetail;
