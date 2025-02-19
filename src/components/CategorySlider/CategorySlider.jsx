import React, { useEffect, useState } from "react";
import style from "./CategorySlider.module.css";
import axios from "axios";
import Slider from "react-slick";

export default function CategorySlider() {
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2400,
    speed: 800,
    slidesToShow: 7,
    slidesToScroll: 1,
  };
  const [categories, setCategories] = useState([]);
  async function getAllCategories() {
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
    setCategories(data.data);
  }
  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <p className=" text-2xl mt-4 capitalize">shop popular categories</p>{" "}
      <Slider {...settings}>
        {categories.map((category) => {
          return (
            <div className="my-3" key={category._id}>
              <img
                className="w-full h-[290px] object-fill"
                src={category.image}
                alt={category.name}
              />
              <h3>{category.name}</h3>
            </div>
          );
        })}
      </Slider>
    </>
  );
}
