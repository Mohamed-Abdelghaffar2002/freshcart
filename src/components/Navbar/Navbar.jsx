import React, { useContext, useState } from "react";
import style from "./Navbar.module.css";
import logo from "../../assets/images/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  let { userToken, setUserToken } = useContext(UserContext);
  let { cart } = useContext(CartContext);
  let navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/login");
  }
  return (
    <>
      <header className="bg-gray-200 fixed items-center  inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between px-6 py-4 lg:px-8"
          aria-label="Global"
        >
          <Link to={"/"} className="lg:pe-4">
            <span className="sr-only">Your Company</span>
            <img className="" src={logo} width={138} alt="logo" />
          </Link>
          <div onClick={() => setIsOpen(true)} className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 bg-transparent hover:bg-gray-100"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
          {userToken && (
            <div className="hidden lg:flex lg:gap-x-4 capitalize">
              <NavLink to={"/"} className=" font-medium text-gray-900 text-lg">
                home
              </NavLink>

              <NavLink
                to={"brands"}
                className=" font-medium text-gray-900 text-lg"
              >
                brands
              </NavLink>
              <NavLink
                to={"categories"}
                className=" font-medium text-gray-900 text-lg"
              >
                categories
              </NavLink>
              <NavLink
                to={"products"}
                className=" font-medium text-gray-900 text-lg"
              >
                products
              </NavLink>
            </div>
          )}

          <div className="hidden lg:flex lg:flex-1 lg:justify-end space-x-4">
            <ul className="center space-x-3">
              <li>
                <Link target="-bank" to={"https://www.facebook.com"}>
                  <i className="fab fa-facebook-f fa-lg cursor-pointer"></i>
                </Link>
              </li>
              <li>
                <Link target="-blank" to={"https://x.com/"}></Link>
                <i className="fab fa-x-twitter fa-lg cursor-pointer"></i>
              </li>
              <li>
                <Link target="-blank" to={"https://www.instagram.com/"}>
                  <i className="fab fa-instagram fa-lg cursor-pointer"></i>
                </Link>
              </li>
              <li>
                <Link target="-blank" to={"https://web.telegram.org/a/"}>
                  <i className="fab fa-telegram-plane fa-lg cursor-pointer"></i>
                </Link>
              </li>
              {userToken && (
                <li className="px-2">
                  <NavLink
                    to={"cart"}
                    className=" font-medium text-gray-900 text-lg"
                  >
                    {
                      <div className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white">
                        <i className="fas fa-shopping-cart text-2xl text-main"></i>
                        <div
                          className={`${
                            cart?.numOfCartItems == 0 && "hidden"
                          } absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-main border-2 border-white rounded-full -top-[1px] end-[13px] dark:border-gray-900`}
                        >
                          {cart?.numOfCartItems}
                        </div>
                      </div>
                    }
                  </NavLink>
                </li>
              )}
            </ul>
            {userToken ? (
              <span
                onClick={() => logOut()}
                className=" font-medium cursor-pointer center text-gray-900 text-lg"
              >
                Log Out
              </span>
            ) : (
              <>
                {" "}
                <NavLink
                  to={"/register"}
                  className=" font-medium text-gray-900"
                >
                  Register
                </NavLink>
                <NavLink to={"login"} className=" font-medium text-gray-900">
                  Login <span aria-hidden="true">→</span>
                </NavLink>
              </>
            )}
          </div>
        </nav>
        {/* Mobile menu, show/hide based on menu open state. */}
        <div
          className={isOpen ? "lg:hidden" : "hidden"}
          role="dialog"
          aria-modal="true"
        >
          {/* Background backdrop, show/hide based on slide-over state. */}
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <NavLink to={"/"} className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img className="" src={logo} width={120} alt="logo" />
              </NavLink>
              <button
                onClick={() => setIsOpen(false)}
                type="button"
                className="-m-2.5  bg-transparent hover:bg-gray-100 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                {userToken && (
                  <div className="space-y-2 py-6">
                    <NavLink
                      to={"/"}
                      className="block rounded-lg  text-base/7 font-medium text-gray-900 hover:bg-gray-50"
                    >
                      home
                    </NavLink>
                    <NavLink
                      to={"cart"}
                      className="block rounded-lg  text-base/7 font-medium text-gray-900 hover:bg-gray-50"
                    >
                      cart
                    </NavLink>
                    <NavLink
                      to={"brands"}
                      className="block rounded-lg  text-base/7 font-medium text-gray-900 hover:bg-gray-50"
                    >
                      brands
                    </NavLink>
                    <NavLink
                      to={"categories"}
                      className="block rounded-lg  text-base/7 font-medium text-gray-900 hover:bg-gray-50"
                    >
                      categories
                    </NavLink>
                    <NavLink
                      to={"products"}
                      className="block rounded-lg  text-base/7 font-medium text-gray-900 hover:bg-gray-50"
                    >
                      products
                    </NavLink>
                  </div>
                )}

                <div className="py-6">
                  {userToken ? (
                    <span
                      onClick={() => logOut()}
                      className="block rounded-lg cursor-pointer  text-base/7 font-medium text-gray-900 hover:bg-gray-50"
                    >
                      Log Out
                    </span>
                  ) : (
                    <>
                      {" "}
                      <NavLink
                        to={"/register"}
                        className="block rounded-lg  text-base/7 font-medium text-gray-900 hover:bg-gray-50"
                      >
                        Register
                      </NavLink>
                      <NavLink
                        to={"login"}
                        className="block rounded-lg  text-base/7 font-medium text-gray-900 hover:bg-gray-50"
                      >
                        Log in <span aria-hidden="true">→</span>
                      </NavLink>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
