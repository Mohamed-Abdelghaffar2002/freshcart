import React from "react";
import style from "./Categories.module.css";
import useCategories from "../../Hooks/useCategories";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";

export default function Categories() {
  let { data, isLoading } = useCategories();
  console.log(data);

  return (
    <>
      <p className=" text-2xl capitalize mt-4 pb-0 mb-0">all categories</p>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="center py-8 gap-y-4 gap-x-4">
          {data?.map((category) => {
            return (
              <Link to={`/category/${category._id}`} className="my-3 bg-light category p-2 rounded-md" key={category._id}>
              <img
                className="w-[290px] rounded-md  h-[290px] object-fill"
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
