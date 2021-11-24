import React from "react";
import "./css/SliderBanner.css";
import anh1 from "./images/anh1.png";

import anh2 from "./images/anh2.jpg";
import anh3 from "./images/anh3.png";
import anh4 from "./images/anh4.jpg";
function SliderBanner(props) {
  return (
    <div
      id="carouselExampleIndicators"
      class="carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="3"
          aria-label="Slide 4"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            src={anh1}
            class="d-block w-100"
            alt="anh1"
            className="imgSliderBanner"
          />
        </div>
        <div class="carousel-item">
          <img
            src={anh2}
            class="d-block w-100"
            alt="anh2"
            className="imgSliderBanner"
          />
        </div>
        <div class="carousel-item">
          <img
            src={anh3}
            class="d-block w-100"
            alt="anh3"
            className="imgSliderBanner"
          />
        </div>
        <div class="carousel-item">
          <img
            src={anh4}
            class="d-block w-100"
            alt="anh4"
            className="imgSliderBanner"
          />
        </div>
      </div>
    </div>
  );
}

export default SliderBanner;
