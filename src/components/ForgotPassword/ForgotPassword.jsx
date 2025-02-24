import React, { useContext, useState } from "react";
import style from "./ForgotPassword.module.css";
import { useFormik } from "formik";
import values from "./../../../node_modules/lodash-es/values";
import * as Yup from "yup";
import axios from "axios";
import getNative from "./../../../node_modules/lodash-es/_getNative";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function ForgotPassword() {
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function ForgotPassword(values) {
    try {
      setApiError(null);
      setLoading(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );
      setLoading(false);
      navigate("/verifycode");
    } catch (err) {
      setApiError(err.response.data.message);
      setLoading(false);
    }
  }

  let validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("email is required")
      .email("email is invalid."),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    // validate: validateForm,
    onSubmit: ForgotPassword,
  });

  return (
    <>
      <form
        className="md:w-1/2 mx-auto py-[26.5px]"
        onSubmit={formik.handleSubmit}
      >
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

        {apiError && (
          <div
            className="flex items-center p-4  text-sm text-red-600 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
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
