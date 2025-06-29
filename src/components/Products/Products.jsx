import React, { useContext, useState } from "react";
import style from "./Products.module.css";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import { CartContext } from "../../context/CartContext";
import useProducts from "../../Hooks/useProducts";
import { WishlistContext } from "../../context/WishlistContext";

export default function Products() {
  const { addProductToCart } = useContext(CartContext);
  const { addProductToWishlist, wishlistIds } = useContext(WishlistContext);
  const { data, isLoading } = useProducts();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data?.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="max-w-4xl mt-5 mx-auto">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-main rounded-lg bg-gray-50 focus:ring-main focus:border-main"
            placeholder="Search ..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <p className="text-2xl capitalize mt-4 pb-0 mb-0">Recent products</p>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="center py-8 gap-y-4 flex flex-wrap">
          {filteredData?.map((product) => (
            <div
              className="px-2 pt-0 mt-0 w-1/2 xl:w-1/6 lg:w-1/5 md:w-1/4 sm:w-1/3"
              key={product.id}
            >
              <div className="product p-2 pt-0 mt-0 overflow-hidden rounded-lg">
                <Link to={`/productdetails/${product.id}`}>
                  <div className="rounded-lg overflow-hidden">
                    <img
                      className="rounded-lg w-full"
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
                <div className="center">
                  <button
                    onClick={() => addProductToCart(product.id)}
                    className="btn w-9/12"
                  >
                    Add to cart
                  </button>
                  <div
                    onClick={() => addProductToWishlist(product.id)}
                    className={`w-2/12 ${
                      wishlistIds?.includes(product.id)
                        ? "text-red-700"
                        : "text-white"
                    } cursor-pointer center btn group px-3.5 py-1.5 bg-light icon rounded-md`}
                  >
                    <i className="text-inherit group-hover:text-red-700 duration-[400ms] fa-solid fa-heart fa-lg"></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
