import React, { useContext, useState } from "react";
import style from "./Login.module.css";
import { useFormik } from "formik";
import values from "./../../../node_modules/lodash-es/values";
import * as Yup from "yup";
import axios from "axios";
import getNative from "./../../../node_modules/lodash-es/_getNative";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function Login() {
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  let { setUserToken } = useContext(UserContext);

  async function login(values) {
    try {
      setApiError(null);
      setLoading(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      setLoading(false);
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      navigate("/");
    } catch (err) {
      setApiError(err.response.data.message);
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
    email: Yup.string()
      .required("email is required")
      .email("email is invalid."),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])[A-Za-z\d#?!@$%^&*_)(-]{8,}$/,
        "Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character."
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    // validate: validateForm,
    onSubmit: login,
  });

  return (
    <>
      <form
        className="md:w-1/2 mx-auto py-[16.5px]"
        onSubmit={formik.handleSubmit}
      >
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-main "
          >
            Your email:
          </label>
          <input
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="email"
            className="shadow-xs bg-gray-50 border border-main text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5 "
            required
          />
          {formik.errors.email && formik.touched.email && (
            <p className="mt-2 mb-0 text-sm text-red-600 ">
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
        <div className="mb-2">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-main "
          >
            Your password:
          </label>
          <input
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="password"
            className="shadow-xs bg-gray-50 border border-main text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5 "
            required
          />
          {formik.errors.password && formik.touched.password && (
            <p className="mt-2 mb-0 text-sm text-red-600 ">
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

        {apiError && (
          <div
            className="flex items-center p-4  text-sm text-red-600 rounded-lg bg-red-50 "
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

        <p className="text-gray-600 mb-2">
          Forgot your password?
          <Link to={'/forgotpassword'}  className=" text-main font-semibold hover:underline duration-500">
            Reset it here
          </Link>
        </p>
        {loading ? (
          <button
            type="button"
            className="text-white button text-sm px-3 py-2.5 text-center "
          >
            <i className="fas fa-spinner fa-spin"></i> Loading...
          </button>
        ) : (
          <button
            type="submit"
            className="text-white button text-sm px-5 py-2.5 text-center "
          >
            submit
          </button>
        )}
      </form>
    </>
  );
}
