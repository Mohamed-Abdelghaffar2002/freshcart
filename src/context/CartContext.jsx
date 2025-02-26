import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();

export function CartContextProvider({ children }) {
  const headers = { token: localStorage.getItem("userToken") };
  const [cart, setCart] = useState(null);

  async function addProductToCart(productId) {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        { headers }
      );
      getProductsCart();
      // console.log(data);
      toast.success(data.message, { position: "bottom-right" });
    } catch (error) {
      // console.log(error);
      toast.error(error.message, { position: "bottom-right" });
    }
  }
  async function updateProductAtCart(productId, count) {
    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers }
      );
      setCart(data);
      // console.log(data);
      toast.success(data.status, { position: "top-center", duration: 800});
    } catch (error) {
      // console.log(error);
      toast.error(error.status, { position: "top-center", duration: 800 });
    }
  }
  async function removeProductFromCart(productId) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers }
      );
      setCart(data);
      // console.log(data);
      toast.success(data.status, { position: "top-center", duration: 800});
    } catch (error) {
      // console.log(error);
      toast.error(error.status, { position: "top-center", duration: 800 });
    }
  }

  async function getProductsCart(productId) {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/cart`,

        { headers }
      );
      setCart(data);
      // console.log(data);
    } catch (error) {
      // console.log(error);
    }
  }

  useEffect(() => {
    getProductsCart();
  }, []);

  return (
    <CartContext.Provider
      value={{ addProductToCart, cart, updateProductAtCart ,removeProductFromCart}}
    >
      {children}
    </CartContext.Provider>
  );
}
