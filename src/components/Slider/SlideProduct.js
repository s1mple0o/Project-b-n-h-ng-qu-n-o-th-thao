import React from "react";
import Slider from "react-slick";
import "./css/SlideProduct.css";
import ball1 from "../../page/HomePage/img/ball1.jpg";
import clother1 from "../../page/HomePage/img/clother1.jpg";
import shoes from "../../page/HomePage/img/footballShoe1.jpg";
import clother2 from "../../page/HomePage/img/anhClother2.png";

function SlideProduct() {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <Slider {...settings}>
      <img className="slider-img-home-page" src={ball1} />
      <img className="slider-img-home-page" src={shoes} />
      <img className="slider-img-home-page" src={clother2} />
      <img className="slider-img-home-page" src={ball1} />
      <img className="slider-img-home-page" src={shoes} />
      <img className="slider-img-home-page" src={clother2} />
      {/* <img className="slider-img-home-page" src={clother1} /> */}
    </Slider>
  );
}

export default SlideProduct;
