import React from "react";
import "./css/MenuBar.css";
import { Link } from "react-router-dom";

function MenuBar(props) {
  return (
    <div className="menu-bar">
      <div className="menu-bar-contacts-container">
        <p className="menu-bar-contact-text-info">
          Liên hệ với chúng tôi: 0914.087.839
        </p>
      </div>
      <div className="menu-bar-items">
        <ul className="menu-bar-items-ul">
          <Link className="menu-bar-item" to={"/"}>
            TRANG CHỦ
          </Link>

          <Link className="menu-bar-item" to={"/user/products"}>
            SẢN PHẨM
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default MenuBar;
