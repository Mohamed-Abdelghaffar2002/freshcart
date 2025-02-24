import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";

export default function useProducts() {

  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(true);

  // async function getProducts() {
  //   const { data } = await axios.get(
  //     `https://ecommerce.routemisr.com/api/v1/products`
  //   );
  //   setProducts(data.data);
  //   setLoading(false);
  // }
  // useEffect(() => {
  //   getProducts();
  // }, []);
  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
  let response = useQuery({
    queryKey: ["recentProducts"],
    queryFn: getProducts,
    select: (data) => data.data.data,
  });

  // console.log(data);
  return response;
}
