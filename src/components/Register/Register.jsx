import React, { useContext, useState } from "react";
import style from "./Register.module.css";
import { useFormik } from "formik";
import values from "./../../../node_modules/lodash-es/values";
import * as Yup from "yup";
import axios from "axios";
import getNative from "./../../../node_modules/lodash-es/_getNative";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function Register() {
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  let { setUserToken } = useContext(UserContext);

  async function register(values) {
    setLoading(true);
    try {
      setApiError(null);
      const { data } = await axios.post(
        ` https://ecommerce.routemisr.com/api/v1/auth/signup`,
        values
      );
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setApiError(error.response.data.message);
      setLoading(false);
    }
  }

  // function validateForm(values) {
  //   let errors = {};
  //   if (!values.name) {
  //     errors.name = "name is required.";
  //   } else if (!/^[A-Z]\w{3,15}$/.test(values.name)) {
  //     errors.name = "name must start with capital letter. ";
  //   }

  //   if (!values.phone) {
  //     errors.phone = "phone is required.";
  //   } else if (!/^01[0125][0-9]{8}$/.test(values.phone)) {
  //     errors.phone = "phone must be egyptian number. ";
  //   }

  //   return errors;
  // }

  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("name is required")
      .min(3, "min number required of characters are 3 .")
      .max(15, "max number required of characters are 15 .")
      .matches(/^[A-Z]\w{3,15}$/, "name must start with capital letter."),
    email: Yup.string()
      .required("email is required")
      .email("email is invalid."),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number."
      ),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")], "password and rePassword does not match."),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^01[0125][0-9]{8}$/, "phone must be egyptian number."),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: validationSchema,
    // validate: validateForm,
    onSubmit: register,
  });

  return (
    <>
      <form className="md:w-1/2 mx-auto" onSubmit={formik.handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-main dark:text-white"
          >
            Your name:
          </label>
          <input
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            id="name"
            className="shadow-xs bg-gray-50 border border-main text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main dark:focus:border-main dark:shadow-xs-light"
            required
          />
          {formik.errors.name && formik.touched.name && (
            <p className="mt-2 mb-0 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">
                <svg
                  className="shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                {formik.errors.name}
              </span>
            </p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-main dark:text-white"
          >
            Your email:
          </label>
          <input
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="email"
            className="shadow-xs bg-gray-50 border border-main text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main dark:focus:border-main dark:shadow-xs-light"
            required
          />
          {formik.errors.email && formik.touched.email && (
            <p className="mt-2 mb-0 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">
                <svg
                  className="shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                {formik.errors.email}
              </span>
            </p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-main dark:text-white"
          >
            Your password:
          </label>
          <input
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="password"
            className="shadow-xs bg-gray-50 border border-main text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main dark:focus:border-main dark:shadow-xs-light"
            required
          />
          {formik.errors.password && formik.touched.password && (
            <p className="mt-2 mb-0 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">
                <svg
                  className="shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                {formik.errors.password}
              </span>
            </p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="rePassword"
            className="block mb-2 text-sm font-medium text-main dark:text-white"
          >
            Repeat password:
          </label>
          <input
            type="password"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="rePassword"
            className="shadow-xs bg-gray-50 border border-main text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main dark:focus:border-main dark:shadow-xs-light"
            required
          />
          {formik.errors.rePassword && formik.touched.rePassword && (
            <p className="mt-2 mb-0 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">
                <svg
                  className="shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                {formik.errors.rePassword}
              </span>
            </p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-main dark:text-white"
          >
            your phone:
          </label>
          <input
            type="tel"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="phone"
            className="shadow-xs bg-gray-50 border border-main text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main dark:focus:border-main dark:shadow-xs-light"
            required
          />
          {formik.errors.phone && formik.touched.phone && (
            <p className="mt-2 mb-0 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">
                <svg
                  className="shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                {formik.errors.phone}
              </span>
            </p>
          )}
        </div>
        {apiError && (
          <div
            className="flex items-center p-4 mb-4 text-sm text-red-600 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <svg
              className="shrink-0 inline w-4 h-4 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span>{apiError}</span>
            </div>
          </div>
        )}
        {loading ? (
          <button
            type="button"
            className="text-white button text-sm px-3 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <i className="fas fa-spinner fa-spin"></i> Loading...
          </button>
        ) : (
          <button
            type="submit"
            className="text-white button text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            submit
          </button>
        )}
      </form>
    </>
  );
}
