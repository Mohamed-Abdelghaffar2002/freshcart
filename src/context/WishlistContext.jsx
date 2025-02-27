import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let WishlistContext = createContext();

export function WishlistContextProvider({ children }) {
  const headers = { token: localStorage.getItem("userToken") };
  const [wishlist, setWishlist] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);

  async function addProductToWishlist(productId) {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId },
        { headers }
      );

      let existingWishlist = localStorage?.getItem("wishlist");

      // Convert to an array (if it exists)
      existingWishlist = existingWishlist ? existingWishlist.split(",") : [];
      const updatedWishlist = Array.from(
        new Set([...existingWishlist, ...wishlistIds])
      );
      if (updatedWishlist.join(",") !== existingWishlist.join(",")) {
        localStorage.setItem("wishlist", updatedWishlist.join(","));
        setWishlistIds(updatedWishlist);
      }

      toast.success(data.message, { position: "bottom-right" });
    } catch (error) {
      // console.log(error);
      toast.error(error.message, { position: "bottom-right" });
    }
  }

  async function removeProductFromWishlist(productId) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers }
      );
      getProductsWishlist();
      localStorage.setItem("wishlist", data?.data?.toString());
      setWishlistIds(data?.data);

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
      console.log("1")
      const filteredWishlist = data.data?.map((prod) => ({
        id: prod.id,
        title: prod.title,
        imageCover: prod.imageCover,
        price: prod.price,
      })) || [];
  
      console.log("Wishlist Items:", filteredWishlist);
  
      // Store only IDs in localStorage
      const wishlistIds = filteredWishlist?.map((prod) => prod.id).join(",");
      const existingWishlist = localStorage?.getItem("wishlist");
  
      if (wishlistIds !== existingWishlist) {
        localStorage.setItem("wishlist", wishlistIds);
        setWishlistIds(wishlistIds);
      }
  
      // Update state with filtered data
      setWishlist(filteredWishlist);
    } catch (error) {
      console.log(error);
      setWishlist([])
    }
  }

  useEffect(() => {
    getProductsWishlist();
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
