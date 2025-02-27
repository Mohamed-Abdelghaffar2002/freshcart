import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let WishlistContext = createContext();

export function WishlistContextProvider({ children }) {
  const headers = { token: localStorage.getItem("userToken") };
  const [wishlist, setWishlist] = useState({});
  const [wishlistIds, setWishlistIds] = useState([]);

  async function addProductToWishlist(productId) {
    try {
      const { data } = await axios?.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId },
        { headers }
      );
      getProductsWishlist();
      // console.log(data);
      localStorage.setItem("wishlist", data?.data?.toString());
      setWishlistIds(data?.data);
      toast.success(data.message, { position: "bottom-right" });
    } catch (error) {
      // console.log(error);
      toast.error(error.message, { position: "bottom-right" });
    }
  }

  async function removeProductFromWishlist(productId) {
    try {
      const { data } = await axios?.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers }
      );
      getProductsWishlist();
      localStorage.setItem("wishlist", data?.data?.toString());
      setWishlistIds(data?.data);
      // console.log(data);
      toast.success(data.message, { position: "top-center", duration: 800 });
    } catch (error) {
      // console.log(error);
      toast.error(error.statusMsg, { position: "top-center", duration: 800 });
    }
  }

  async function getProductsWishlist() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { headers }
      );

      // console.log(data);
      const allData = data;
      setWishlist(allData);
      // console.log(wishlist);
      const ids = data?.data?.map((prod) => prod.id);
      // console.log(ids);
      setWishlistIds(ids);
      localStorage.setItem("wishlist", ids?.toString());
    } catch (error) {
      // console.error(error);
    }
  }
  // useEffect(() => {
  //   if (!wishlistIds) {
  //     return;
  //   } else {
  //     localStorage.setItem("wishlist", wishlistIds?.toString());
  //   }
  // }, [wishlistIds]);

  useEffect(() => {
    getProductsWishlist();
    // setWishlistIds(localStorage?.getItem("wishlist")?.split(","));
    // localStorage.setItem("wishlist", wishlistIds?.toString());
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        addProductToWishlist,
        wishlist,
        setWishlist,
        removeProductFromWishlist,
        wishlistIds,
        setWishlistIds,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
