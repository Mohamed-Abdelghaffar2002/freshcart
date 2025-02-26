import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import style from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";

export default function ProductDetails() {
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

  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const { addProductToWishlist, wishlistIds } = useContext(WishlistContext);
  const { addProductToCart } = useContext(CartContext);

  async function getProduct(productId) {
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${productId}`
    );
    setProduct(data.data);
    setLoading(false);
  }
  useEffect(() => {
    getProduct(id);
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="center p-8 ">
          <div className="sm:w-1/4 w-full">
            <Slider {...settings}>
              {product.images.map((image, index) => {
                return (
                  <img
                    key={index}
                    className="w-full"
                    src={image}
                    alt={product.title}
                  />
                );
              })}
            </Slider>
          </div>
          <div className="sm:w-3/4 w-full p-6">
            <h2>{product.title}</h2>
            <p className="m-4 text-gray-500">{product.description}</p>
            <div className="py-2">
              <h3 className="text-main">{product.category.name}</h3>
              <div className="flex justify-between items-center py-2 ">
                <span>{product.price} EGP</span>
                <span>
                  <i className="fas fa-star rating-color px-2" />
                  {product.ratingsAverage}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="w-11/12 pe-4">
                <button onClick={() => addProductToCart(id)} className="w-full">
                  Add to cart
                </button>
              </div>

              <div
                onClick={() => addProductToWishlist(product.id)}
                className={` w-1/12  ${
                  wishlistIds?.includes(product.id)
                    ? "text-red-700"
                    : "text-white"
                }  cursor-pointer center btn group px-3.5 py-1.5 bg-light icon rounded-md`}
              >
                <div>
                  <i className=" text-inherit group-hover:text-red-700 duration-[400ms]   fa-solid fa-heart fa-lg"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
