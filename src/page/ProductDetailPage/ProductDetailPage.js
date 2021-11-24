import React from "react";
import ProductDetailOption from "../../components/Product/ProductDetailOption";
import Header from "./../../components/Header/Header";
import Footer from "./../../components/Footer/Footer";
import MenuBar from "./../../components/MenuBar/MenuBar";

function ProductDetailPage(props) {
  return (
    <div>
      <Header />
      <MenuBar />
      <ProductDetailOption />
      <Footer />
    </div>
  );
}

export default ProductDetailPage;
