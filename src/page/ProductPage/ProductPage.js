import React from "react";
import Product from "./../../components/Product/Product";
import Header from "./../../components/Header/Header";
import MenuBar from "./../../components/MenuBar/MenuBar";
import Footer from "./../../components/Footer/Footer";
import SideBar from "./../../components/SideBar/SideBar";
import "./css/ProductPage.css";

function ProductPage(props) {
  return (
    <div>
      <Header />
      <MenuBar />
      <div className="slide-and-sidebar">
        <div className="side-bar-div-home-page">
          <SideBar />
        </div>
        <div className="product-div-home-page">
          <Product />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ProductPage;
