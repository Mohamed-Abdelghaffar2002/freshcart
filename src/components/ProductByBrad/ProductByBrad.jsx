import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import Loading from "../Loading/Loading";
import useProducts from "../../Hooks/useProducts";
import placeHolder from "../../assets/images/emptyOrders.svg";
import { WishlistContext } from "../../context/WishlistContext";

export default function ProductByBrad() {
  const { id } = useParams();
  let { data, isLoading } = useProducts();
    const { addProductToWishlist, wishlistIds } = useContext(WishlistContext);
  const { addProductToCart } = useContext(CartContext);
  const filteredData = data?.filter((product) => product.brand._id == id);

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
                  className="px-2 pt-0  mt-0 w-1/2 xl:w-1/6 lg:w-1/5 md:w-1/4 sm:w-1/3 bg-white"
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
                      <div className="center">
                      <button
                        onClick={() => addProductToCart(product.id)}
                        className="btn w-9/12"
                      >
                        Add to cart
                      </button>
                      <div
                        onClick={() => addProductToWishlist(product.id)}
                        className={` w-2/12  ${
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
