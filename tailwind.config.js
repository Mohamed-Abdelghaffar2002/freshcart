/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // backgroundImage: {
      //   "light-pattern": "url('src/assets/images/light-patten.svg')",
      // },
      colors: {
        main: "#0aad0a",
        light: "#f0f3f2",
        rate: "#ffc908",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
    },
  },
  plugins: [],
};
