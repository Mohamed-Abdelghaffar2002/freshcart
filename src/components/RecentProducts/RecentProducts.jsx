import React, { useContext, useEffect, useState } from "react";
import style from "./RecentProducts.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import { CartContext } from "../../context/CartContext";

export default function RecentProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const {addProductToCart}=useContext(CartContext)

  async function getProducts() {
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products`
    );
    setProducts(data.data);
    setLoading(false);
  }
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
    <p className=" text-2xl capitalize mt-4 pb-0 mb-0">resent products</p>
      {loading ? (
     <Loading/>
      ) : (
        <div className="center py-8 gap-y-4">
          {products.map((product) => {
            return (
              <div
                className="px-2 pt-0 mt-0 xl:w-1/6 lg:w-1/4 md:w-1/3 sm:w-1/2"
                key={product.id}
              >
                <div>
                  <div className="product p-2 pt-0 mt-0 rounded-lg ">
                    <Link to={`productdetails/${product.id}`}>
                      <div className=" overflow-hidden">
                        <img
                          className="w-full"
                          src={product.imageCover}
                          alt={product.title}
                        />
                      </div>

                      <h3 className="text-main">{product.category.name}</h3>
                      <h3 className="text-xl line-clamp-1">{product.title}</h3>
                      <div className="flex justify-between items-center p-2">
                        <span>{product.price} EGP</span>
                        <span>
                          <i className="fas fa-star rating-color" />
                          {product.ratingsAverage}
                        </span>
                      </div>
                    </Link>
                    <button onClick={()=>addProductToCart(product.id)} className="btn w-full">Add to cart</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
