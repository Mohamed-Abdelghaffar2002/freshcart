import React from "react";
import style from "./NotFound.module.css";
import notFoundPage from "../../assets/images/error.svg";
export default function NotFound() {
  return (
    <>
      <div className="mt-5 center">
        <img
          className="md:w-2/3 w-full"
          src={notFoundPage}
          alt="not found page"
        />
      </div>
    </>
  );
}
