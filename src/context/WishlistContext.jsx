import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UserContext } from "./UserContext";

export let WishlistContext = createContext();

export function WishlistContextProvider({ children }) {
  const { userToken } = useContext(UserContext);
  const headers = { token: localStorage.getItem("userToken") };
  const [wishlist, setWishlist] = useState({});

  async function addProductToWishlist(productId) {
    try {
      const { data } = await axios?.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId },
        { headers }
      );
      getProductsWishlist();
      // console.log(data);
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
    } catch (error) {
      // console.error(error);
    }
  }
  useEffect(() => {
    if (userToken) {
      getProductsWishlist();
    }
  }, [userToken]);

  return (
    <WishlistContext.Provider
      value={{
        addProductToWishlist,
        wishlist,
        setWishlist,
        removeProductFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
