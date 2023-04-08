/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        100: "45.5rem",
      },
      animation: {
        scroll: "scroll 40s linear infinite",
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-250px * 14))" },
        },
      },
    },
    colors: {
      "dark-cyan": "#132238",
      "white": "#ffffff",
      "dark-blue": "#364e68",
      "light-blue": "#98ccd3",
      "light-green": "#28B397",
      "red": "#ff5349",
    },
  },
  plugins: [],
};
