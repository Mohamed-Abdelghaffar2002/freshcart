import React from "react";
import style from "./AllOrders.module.css";
import placeHolder from "../../assets/images/emptyOrders.svg";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../Loading/Loading";
import { jwtDecode } from "jwt-decode";

export default function AllOrders() {
  const token = localStorage.getItem("userToken");
  const { id } = jwtDecode(token);
  function getAllOrders(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}

`);
  }
  let { data, isFetching, isLoading, isError } = useQuery({
    queryKey: ["AllOrdersData"],
    queryFn: () => getAllOrders(id),
    select: (data) => data?.data,
  });
  // console.log(data);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : data?.length ? (
        <div className=" container rounded-md bg-light ">
          <div className="pb-4 ">
            <h2 className="text-center capitalize text-3xl p-4 text-black">
              all orders
            </h2>
            <p className="text-lg p-2 text-gray-600 ">
              number of orders: <span className="text-main">{data.length}</span>
            </p>
            {data.map((order) => {
              return (
                <div
                  key={order.id}
                  className="relative sm:p-4 center flex-start bg-slate-50 border-2 shadow-sm border-main/50 rounded-md m-4  overflow-x-auto"
                >
                  <div className=" ps-6 py-2 flex sm:flex-none flex-wrap  sm:w-3/12">
                    <p className="text-base py-1 capitalize w-full  font-semibold">
                      order id:
                      <span className="text-gray-700  ps-2 font-normal">
                        {order.id}
                      </span>
                    </p>
                    <p className="text-base py-1 capitalize w-full  font-semibold">
                      phone:
                      <span className="text-gray-700  ps-2 font-normal">
                        {order.shippingAddress.phone}
                      </span>
                    </p>
                    <p className="text-base py-1 capitalize w-full  font-semibold">
                      city:
                      <span className="text-gray-700  ps-2 font-normal">
                        {order.shippingAddress.city}
                      </span>
                    </p>
                    <p className="text-base py-1 capitalize w-full  font-semibold">
                      details:
                      <span className="text-gray-700  ps-2 font-normal">
                        {order.shippingAddress.details}
                      </span>
                    </p>
                    <p className="text-base py-1 capitalize w-full  font-semibold">
                      date:
                      <span className="text-gray-700  ps-2 font-normal">
                        {new Date(order.createdAt).toLocaleString()}
                      </span>
                    </p>
                    <p className="text-base py-1 capitalize w-full  font-semibold">
                      payment method:
                      <span className="text-gray-700  ps-2 font-normal">
                        {order.paymentMethodType}
                      </span>
                    </p>
                    <p className="text-base py-1 capitalize w-full  font-semibold">
                      delivered:
                      <span className="text-gray-700  ps-2 font-normal">
                        {order.isDelivered ? "yes" : "no"}
                      </span>
                    </p>
                    <p className="text-base py-1 capitalize w-full  font-semibold">
                      payed:
                      <span className="text-gray-700  ps-2 font-normal">
                        {order.isPaid ? "yes" : "no"}
                      </span>
                    </p>
                  </div>

                  <table className=" sm:w-9/12   text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-4 py-3 rounded-s-lg">
                          Product
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Qty
                        </th>
                        <th scope="col" className="px-4 py-3 rounded-e-lg">
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.cartItems.map((item) => {
                        return (
                          <tr className="bg-white dark:bg-gray-800 ">
                            <th
                              scope="row"
                              className="px-4 flex items-center justify-start gap-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              <img
                                className=" h-12"
                                src={item.product.imageCover}
                                alt={item.product.title}
                              />
                              <p className="text-wrap "> {item.product.title}</p>
                            </th>
                            <td className="px-4 py-4">{item.count}</td>
                            <td className="px-4 py-4">
                              ${item.price * item.count}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr className="font-semibold text-gray-900 dark:text-white">
                        <th scope="row" className="px-4 py-3 text-base">
                          Total
                        </th>
                        <td className="px-4 py-3"></td>
                        <td className="px-4 py-3">{order.totalOrderPrice}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="  pt-8 text-center">
          <p className="  text-3xl capitalize  mb-4 text-gray-500">
            You don't have any orders yet.
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
