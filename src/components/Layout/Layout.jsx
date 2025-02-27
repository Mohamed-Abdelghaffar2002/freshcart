import React from "react";
import style from "./Layout.module.css";
import Navbar from "./../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./../Footer/Footer";
import { Offline } from "react-detect-offline";
export default function Layout() {
  return (
    <>
      <Navbar />
      <div className={`container bg-light-pattern py-12 mt-6`}>
        <Offline>
          <div className=" p-3 inset-0 bg-slate-300/50 fixed center z-50">
            <div className="bg-white p-3 text-center text-red-700 font-semibold">
              check your internet connection and try again
            </div>
          </div>
        </Offline>
        <Outlet></Outlet>
      </div>
      <Footer />
    </>
  );
}
