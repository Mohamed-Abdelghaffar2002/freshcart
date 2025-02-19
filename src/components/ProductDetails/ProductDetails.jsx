import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import style from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";
import { CartContext } from "../../context/CartContext";

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
          <div className="w-1/4">
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
          <div className="w-3/4 p-6">
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
            <button onClick={()=>addProductToCart(id)} className="btn w-full">Add to cart</button>
          </div>
        </div>
      )}
    </>
  );
}
