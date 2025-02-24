import React, { useContext } from "react";
import style from "./ProductByCategory.module.css";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import Loading from "../Loading/Loading";
import useProducts from "../../Hooks/useProducts";
import placeHolder from "../../assets/images/emptyOrders.svg";

export default function ProductByCategory() {
  const { id } = useParams();
  let { data, isLoading } = useProducts();
  const { addProductToCart } = useContext(CartContext);
  const filteredData = data?.filter((product) => product.category._id == id);


  return (
    <>
      {isLoading ? (
        <Loading />
      ) : filteredData.length ? (
        <>
          <p className=" text-2xl capitalize mt-4 pb-0 mb-0">resent products</p>
          <div className="center py-8 gap-y-4">
            {filteredData.map((product) => {
              return (
                <div
                  className="px-2 pt-0 mt-0 xl:w-1/6 lg:w-1/4 md:w-1/3 sm:w-1/2"
                  key={product.id}
                >
                  <div>
                    <div className="product p-2 pt-0 mt-0 rounded-lg ">
                      <Link to={`/productdetails/${product.id}`}>
                        <div className=" overflow-hidden">
                          <img
                            className="w-full"
                            src={product.imageCover}
                            alt={product.title}
                          />
                        </div>

                        <h3 className="text-main">{product.category.name}</h3>
                        <h3 className="text-xl line-clamp-1">
                          {product.title}
                        </h3>
                        <div className="flex justify-between items-center p-2">
                          <span>{product.price} EGP</span>
                          <span>
                            <i className="fas fa-star rating-color" />
                            {product.ratingsAverage}
                          </span>
                        </div>
                      </Link>
                      <button
                        onClick={() => addProductToCart(product.id)}
                        className="btn w-full"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="  pt-8 text-center">
          <p className="  text-3xl capitalize  mb-4 text-gray-500">
            No products found at the moment
          </p>
          <img
            className="w-full m-auto sm:w-1/2"
            src={placeHolder}
            alt="no orders"
          />
        </div>
      )}
    </>
  );
}
