import React, { useContext } from "react";
import style from "./Cart.module.css";
import { CartContext } from "../../context/CartContext";
import Loading from "../Loading/Loading";
import index from "./../../../node_modules/resize-observer-polyfill/dist/ResizeObserver.es";
import img from "../../assets/images/emptyCart.svg";
import { Link } from "react-router-dom";
export default function Cart() {
  const { cart, updateProductAtCart, removeProductFromCart } =
    useContext(CartContext);

  return (
    <>
      {cart ? (
        cart.numOfCartItems == 0 ? (
          <div className="center pt-8 ">
            {<img className="w-full sm:w-1/2" src={img} alt="empty cart" />}
          </div>
        ) : (
          <div className="relative pb-8  bg-white pt-2 overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full  text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs  text-gray-700 uppercase bg-gray-50  ">
                <tr>
                  <td className=" py-3 ">Product</td>
                  <td className=" py-1 sm:px-6 sm:py-3  ">title</td>
                  <td className=" py-1 sm:px-6 sm:py-3  ">Qty</td>
                  <td className=" py-1 sm:px-6 sm:py-3  ">Price</td>
                  <td className=" py-1 sm:px-6 sm:py-3  ">Action</td>
                </tr>
              </thead>
              <tbody>
                {cart.data.products.map((item, index) => {
                  return (
                    <tr
                      className="bg-white border-b   border-gray-200 hover:bg-gray-50 "
                      key={index}
                    >
                      <td className=" p-2 sm:p-4 ">
                        <img
                          src={item.product.imageCover}
                          className="w-16 md:w-32 max-w-full max-h-full"
                          alt={item.product.title}
                        />
                      </td>
                      <td className=" text-wrap sm:px-6 py-1 sm:py-4 sm:font-semibold text-gray-900 ">
                        {item.product.title}
                      </td>
                      <td className="  sm:px-6 py-1 sm:py-4">
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              updateProductAtCart(
                                item.product.id,
                                item.count - 1
                              )
                            }
                            disabled={item.count == 1}
                            className={` ${
                              item.count == 1 && "cursor-not-allowed"
                            } inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-4 w-4 sm:w-6 sm:h-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200   `}
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-2 h-2"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 1h16"
                              />
                            </svg>
                          </button>
                          <div>
                            <span>{item.count}</span>
                          </div>
                          <button
                            onClick={() =>
                              updateProductAtCart(
                                item.product.id,
                                item.count + 1
                              )
                            }
                            className="inline-flex items-center justify-center sm:h-6  sm:w-6 h-4 w-4 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200  "
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-2 h-2"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="  sm:px-6 py-1 sm:py-4 md:font-semibold text-gray-900 ">
                        <span className="sm:text-lg">
                          {item.price * item.count}
                        </span>
                        <span className="sm:px-2 ps-1">EGP</span>
                      </td>
                      <td className="  sm:px-6 py-1 sm:py-4">
                        <button
                          onClick={() => removeProductFromCart(item.product.id)}
                          className=" bg-transparent focus:ring-transparent hover:underline hover:bg-transparent sm:font-medium text-red-600"
                        >
                          <i class="fa-solid fa-trash text-red-600 sm:text-2xl"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex justify-between bg-white p-8 pb-0 items-center">
              <p className="sm:text-2xl">
                Total cost :
                <span className=" mx-2 font-bold">
                  {cart.data.totalCartPrice}
                </span>
                EGP
              </p>
              <div>
                <Link to={"/checkout"}>
                  <button> Check out</button>
                </Link>
              </div>
            </div>
          </div>
        )
      ) : (
        <Loading />
      )}
    </>
  );
}
