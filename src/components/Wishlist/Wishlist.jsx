import React, { useContext } from "react";
import { WishlistContext } from "../../context/WishlistContext";
import Loading from "./../Loading/Loading";
import placeHolder from "../../assets/images/emptyWishlist.svg";
import { CartContext } from "../../context/CartContext";

export default function Wishlist() {
  const { wishlist, removeProductFromWishlist } = useContext(WishlistContext);
  const { addProductToCart } = useContext(CartContext);
  return (
    <>
      {wishlist ? (
        wishlist?.count == 0 ? (
          <div className="center pt-8 ">
            {
              <img
                className="w-full sm:w-1/2"
                src={placeHolder}
                alt="empty wishlist"
              />
            }
          </div>
        ) : (
          <table className=" w-full min-h-[41svh]  text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100  ">
              <tr>
                <th scope="col" className="sm:px-4 py-3 rounded-s-lg">
                  Product
                </th>
                <th scope="col" className="sm:px-4 py-3">
                  Price
                </th>
                <th scope="col" className="sm:px-4 py-3 ">
                  Action
                </th>
                <th scope="col" className="sm:px-4 py-3 rounded-e-lg">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {wishlist?.data?.map((item) => {
                return (
                  <tr key={item.id} className="bg-white  ">
                    <td className="sm:px-4 py-4">
                      <div className="sm:px-4 flex items-center justify-start gap-4 py-4 font-medium text-gray-900 whitespace-nowrap ">
                        <img
                          className=" h-12"
                          src={item.imageCover}
                          alt={item.title}
                        />
                        <p className="text-wrap text-base ">{item.title}</p>
                      </div>
                    </td>
                    <td className="sm:px-4 py-4">
                      {item.price}
                      <span className="ms-1">EGP</span>
                    </td>
                    <td className="sm:px-4 py-4">
                      <button
                        onClick={() => removeProductFromWishlist(item.id)}
                        className=" bg-transparent focus:ring-transparent hover:underline hover:bg-transparent sm:font-medium text-red-600"
                      >
                        Remove
                      </button>
                    </td>
                    <td className="sm:px-4 py-4">
                      <button
                        onClick={() => addProductToCart(item.id)}
                        className=" bg-transparent focus:ring-transparent text-nowrap hover:underline hover:bg-transparent sm:font-medium text-main"
                      >
                        Add to
                        <br /> cart
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )
      ) : (
        <Loading />
      )}
    </>
  );
}
