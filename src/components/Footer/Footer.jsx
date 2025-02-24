import React from "react";
import style from "./Footer.module.css";

import img1 from "../../assets/images/visa-svgrepo-com.svg";
import img2 from "../../assets/images/mastercard-svgrepo-com.svg";
import img3 from "../../assets/images/paypal-svgrepo-com.svg";
import img4 from "../../assets/images/download-on-the-app-store-apple-logo-svgrepo-com.svg";
import img5 from "../../assets/images/google-play-badge-logo-svgrepo-com.svg";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <>
      <div className="bg-[#f0f0f0] p-4">
        <div>
          <p className="sm:text-2xl">Get the FreshCart App</p>
          <p className="text-[12px] sm:text-base text-gray-500">
            We will send you a link, open it on your phone to download the app.
          </p>

          <div className="flex  items-center justify-center px-4 w-full py-2">
            <div className="px-4 w-5/6">
              <input
                type="email"
                className=" w-full px-4 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  ps-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="E-mail..."
              />
            </div>
            <div className="w-1/6 ">
            
              <button
                type="button"
                className=" w-full hidden sm:inline-block text-nowrap sm:text-base text-[12px] px-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Share App Link
              </button>
              <button
                type="button"
                className=" w-full  sm:hidden text-nowrap text-[12px]  px-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Share
              </button>
            </div>
          </div>

          <div className="sm:flex sm:items-center sm:justify-between mt-2 mb-0  border-y-[2px]">
            <div className="flex items-center  justify-center  gap-x-2">
              <span className="text-[14px] sm:text-base">Payment partners</span>
              <img className=" cursor-pointer  w-12" src={img1} alt="payment" />
              <img className=" cursor-pointer  w-12" src={img2} alt="payment" />
              <img className=" cursor-pointer  w-12" src={img3} alt="payment" />
            </div>

            <div className="flex  items-center justify-center gap-x-2">
              <span className="text-[12px] sm:text-base text-nowrap">Get deliveries with FreshCart</span>
              <Link
                target="-blank"
                to={"https://www.apple.com/eg-ar/app-store/"}
              >
                <img
                  className=" cursor-pointer  w-28 sm:w-32 "
                  src={img4}
                  alt="installation"
                />
              </Link>
              <Link
                target="-blank"
                to={"https://play.google.com/store/games?device=windows"}
              >
                <img
                  className=" cursor-pointer  w-28 sm:w-32"
                  src={img5}
                  alt="installation"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
