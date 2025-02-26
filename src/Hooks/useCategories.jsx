import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useCategories() {
  function getAllCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  let response = useQuery({
    queryKey: ["allCategories"],
    queryFn: getAllCategories,
    select: (data) => data.data.data,
  });

  return response;
}
