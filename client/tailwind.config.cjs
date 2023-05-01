/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        100: "45.5rem",
        120: "35.5rem",
      },
      animation: {
        scroll: "scroll 40s linear infinite",
        bounce200: "bounce 1s infinite 200ms",
        bounce400: "bounce 1s infinite 400ms",
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
      white: "#ffffff",
      "dark-blue": "#364e68",
      "light-blue": "#98ccd3",
      "light-green": "#28B397",
      red: "#FFB6B3",
      green: "#BDE7BD",
      yellow: "#FDE992",
      "light-gray": "#DEDEDE",
    },
  },
  plugins: [],
};
