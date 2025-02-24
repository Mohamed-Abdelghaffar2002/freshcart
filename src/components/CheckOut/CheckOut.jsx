import React, { useContext, useState } from "react";
import style from "./CheckOut.module.css";
import { useFormik } from "formik";
import values from "./../../../node_modules/lodash-es/values";
import * as Yup from "yup";
import axios from "axios";
import getNative from "./../../../node_modules/lodash-es/_getNative";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext";

export default function CheckOut() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let { cart } = useContext(CartContext);

  async function CheckOut(shippingAddress) {
    console.log(shippingAddress);

    if (shippingAddress.paymentMethod === "cashPayment") {
      await CashPayment(shippingAddress);
      console.log(1);
    } else if (shippingAddress.paymentMethod === "onlinePayment") {
      await OnlinePayment(shippingAddress);
      console.log(0);
    }
  }
  async function OnlinePayment(shippingAddress) {
    console.log(shippingAddress);

    try {
      setLoading(true);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=http://localhost:5173`,
        { shippingAddress },
        { headers: { token: localStorage.getItem("userToken") } }
      );
      setLoading(false);
      console.log(data);
      location.href = data.session.url;
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }
  async function CashPayment(shippingAddress) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cart.cartId}`,
        { shippingAddress },
        { headers: { token: localStorage.getItem("userToken") } }
      );
      setLoading(false);
      // console.log(data);
      navigate("/allorders");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
      paymentMethod: "cashPayment",
    },
    onSubmit: CheckOut,
  });

  return (
    <>
      <form
        className="md:w-1/2 mx-auto py-[26.5px]"
        onSubmit={formik.handleSubmit}
      >
        <div className="mb-5">
          <label
            htmlFor="city"
            className="block mb-2 text-sm font-medium text-main dark:text-white"
          >
            Your city:
          </label>
          <input
            type="text"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="city"
            className="shadow-xs bg-gray-50 border border-main text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main dark:focus:border-main dark:shadow-xs-light"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="details"
            className="block mb-2 text-sm font-medium text-main dark:text-white"
          >
            Your details:
          </label>
          <input
            type="text"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="details"
            className="shadow-xs bg-gray-50 border border-main text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main dark:focus:border-main dark:shadow-xs-light"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-main dark:text-white"
          >
            Your phone:
          </label>
          <input
            type="tel"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="phone"
            className="shadow-xs bg-gray-50 border border-main text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main dark:focus:border-main dark:shadow-xs-light"
            required
          />
        </div>

        <div className="w-full mx-auto pb-4">
          <label
            htmlFor="paymentMethod"
            className="block  mb-2 text-sm font-medium text-main dark:text-white"
          >
            Select your payment method
          </label>
          <select
            value={formik.values.paymentMethod}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            id="paymentMethod"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main dark:focus:border-main"
          >
            <option value={"cashPayment"}>Cash on delivery</option>
            <option value={"onlinePayment"}>Debit/Credit card</option>
          </select>
        </div>

        {loading ? (
          <button
            type="button"
            className="text-white button text-sm px-3 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <i className="fas fa-spinner fa-spin"></i> Loading...
          </button>
        ) : (
          <button
            type="submit"
            className="text-white button text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            submit
          </button>
        )}
      </form>
    </>
  );
}
