import React, { useEffect, useState, useContext } from "react";
import Header from "../../components/Header/Header";
import productApi from "../../components/Product/api/productApi";
import ProductSlide from "../../components/Product/ProductSlide";
import LeftImage from "../../components/Slider/images/anh2.jpg";
import RightImage from "../../components/Slider/images/anh3.png";
import SliderBanner from "../../components/Slider/SliderBanner";
import "./HomePage.css";
import { CartContext } from "../../context/CartContext";
import MenuBar from "../../components/MenuBar/MenuBar";
import SideBar from "../../components/SideBar/SideBar";
import SliderProduct from "../../components/Slider/SlideProduct";
import BannerHomepage from "./img/img_banner234.jpg";
import Footer from "../../components/Footer/Footer";

function HomePage() {
  const { productListCart } = useContext(CartContext);
  const [productListAll, setProductListAll] = useState([]);
  const [productListNewest, setProductListNewese] = useState([]);
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

    productApi
      .getProductNewest()
      .then((response) => {
        const data = response.data.data;
        setProductListNewese(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Header />
      <MenuBar />
      <div className="slide-and-sidebar">
        <div className="side-bar-div-home-page">
          <SideBar />
        </div>
        <div className="slider-div-home-page">
          <SliderBanner />
          <SliderProduct />
        </div>
        <div className="imageBanner">
          <img src={BannerHomepage} className="bannerLong" alt="Banner" />
        </div>
        <div className="product-type-name">
          <b>Hàng mới nhất</b>
        </div>
        <ProductSlide productList={productListNewest} />
        <div className="product-type-name">
          <b>Hàng giảm giá</b>
        </div>
        <ProductSlide productList={productListAll} />
        <div className="imageBanner">
          <img src={LeftImage} className="bannerLeft" alt="AnhTrai" />
          <img src={RightImage} className="bannerRight" alt="AnhPhai" />
        </div>
        <div className="product-type-name">
          <b>Hàng bán chạy</b>
        </div>
        <ProductSlide productList={productListAll} />
        <div className="product-type-name">
          <b>Hàng phổ thông</b>
        </div>
        <ProductSlide productList={productListAll} />
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
