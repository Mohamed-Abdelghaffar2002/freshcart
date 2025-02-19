import React from "react";
import style from "./MainSlider.module.css";
import slider1 from "../../assets/images/slider-image-1.jpeg";
import slider2 from "../../assets/images/slider-image-2.jpeg";
import slider3 from "../../assets/images/slider-image-3.jpeg";
import banner1 from "../../assets/images/ad-banner-1.jpg";
import banner2 from "../../assets/images/ad-banner-2.jpg";
import Slider from "react-slick";

export default function MainSlider() {
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2400,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className="flex">
        <div className="w-3/4">
          <Slider {...settings}>
          <img src={slider1} alt="slider1" className="w-full h-[400px] object-fill" />
          <img src={slider2} alt="slider2" className="w-full h-[400px] object-fill" />
          <img src={slider3} alt="slider3" className="w-full h-[400px] object-fill" />

          </Slider>
        </div>
        <div className="w-1/4">
          <img className="w-full h-[200px]" src={banner1} alt="banner1 object-fill" />
          <img className="w-full h-[200px]" src={banner2} alt="banner2 object-fill" />
        </div>
      </div>
    </>
  );
}
