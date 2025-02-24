import React, { useEffect, useState } from "react";
import style from "./CategorySlider.module.css";
import axios from "axios";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import useCategories from "../../Hooks/useCategories";
import { Link } from "react-router-dom";

export default function CategorySlider() {
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2400,
    speed: 800,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  // const [categories, setCategories] = useState([]);
  // async function getAllCategories() {
  //   const { data } = await axios.get(
  //     `https://ecommerce.routemisr.com/api/v1/categories`
  //   );
  //   setCategories(data.data);
  // }
  // useEffect(() => {
  //   getAllCategories();
  // }, []);

  let { data, isLoading } = useCategories();

  // console.log(data?.data.data);

  return (
    <>
      <p className=" text-2xl mt-4 capitalize">shop popular categories</p>{" "}
      {isLoading ? (
        <Loading />
      ) : (
        <Slider {...settings}>
          {data.map((category) => {
            return (
              <div   className="my-3" key={category._id}>
                <img
                  className="w-full  h-[290px] object-fill"
                  src={category.image}
                  alt={category.name}
                />
                <Link to={`/category/${category._id}`} className="text-[8px] sm:text-base">{category.name}</Link>
              </div>
            );
          })}
        </Slider>
      )}
    </>
  );
}
