import React from "react";
import style from "./Brands.module.css";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import useBrands from "../../Hooks/useBrands";

export default function Categories() {
  let { data, isLoading } = useBrands();
  // console.log(data);

  return (
    <>
      <p className=" text-2xl capitalize mt-4 pb-0 mb-0">all brands</p>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="center  py-8 gap-y-4 gap-x-4">
          {data?.map((category) => {
            return (
              <Link to={`/brand/${category._id}`} className="my-3 bg-light category p-2 rounded-md" key={category._id}>
              <img
                className="w-[230px] rounded-md  h-[230px] object-fill"
                src={category.image}
                alt={category.name}
              />
              <h3 className="text-[8px] sm:text-base">{category.name}</h3>
            </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
