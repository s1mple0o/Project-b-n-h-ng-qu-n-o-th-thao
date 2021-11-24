import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { BiSearch } from "react-icons/bi";
import { BsFillCartFill } from "react-icons/bs";
import logo from "./img/logo.jpg";
import { CartContext } from "./../../context/CartContext";

function Header(props) {
  const { productListCart, setProductListCart, status } =
    useContext(CartContext);
  const [itemAmount, setItemAmount] = useState(0);
  useEffect(() => {
    setItemAmount(productListCart.length);
  }, [status]);
  return (
    <>
      <div className="top-header">
        <div className="top-info">Welcome to BoySport!</div>
        <div className="top-nav">
          <Link className="top-nav-menu" to={`/user/account`}>
            Tài khoản
          </Link>
          |
          <Link className="top-nav-menu" to={`/user/carts`}>
            Giỏ hàng
          </Link>
          |
          <Link className="top-nav-menu" to={`/user/login`}>
            Đăng nhập
          </Link>
        </div>
      </div>

      <div className="header">
        <div className="left-header">
          <img className="logo-header" src={logo} />
          <Link to="/">
            <b className="shop-name">BoySport</b>
          </Link>
        </div>
        <div className="search-header">
          <input
            type="text"
            className="input-search-header"
            placeholder="search..."
          />
          <button className="btn-search-header">
            <BiSearch />
          </button>
        </div>
        <Link to={`/user/carts`} className="cart-header">
          <span className="cart-icon-header">
            <BsFillCartFill />
          </span>
          <span className="cart-info-header">{itemAmount} item</span>
        </Link>
      </div>
    </>
  );
}

export default Header;
