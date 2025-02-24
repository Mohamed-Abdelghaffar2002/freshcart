import React, { useEffect, useState } from "react";
import style from "./CategorySlider.module.css";
import axios from "axios";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";

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

  function getAllCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  let { data, isFetching, isLoading, isError } = useQuery({
    queryKey: ["categorySlider"],
    queryFn: getAllCategories,
  });
  // console.log(data?.data.data);

  return (
    <>
      <p className=" text-2xl mt-4 capitalize">shop popular categories</p>{" "}
      {isLoading ? (
        <Loading />
      ) : (
        <Slider {...settings}>
          {data?.data.data.map((category) => {
            return (
              <div className="my-3" key={category._id}>
                <img
                  className="w-full  h-[290px] object-fill"
                  src={category.image}
                  alt={category.name}
                />
                <h3 className="text-[8px] sm:text-base">{category.name}</h3>
              </div>
            );
          })}
        </Slider>
      )}
    </>
  );
}
