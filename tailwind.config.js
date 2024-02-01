/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "node_modules/preline/dist/*.js"],
  theme: {
    extend: {
      colors: {
        "primary-100": "#d1f5f9",
        "primary-200": "#B6E4EA",
        "secondary-100": "#E5E7EB",
      },
      width: {
        "1w": "10vw",
        "2.5w": "25vw",
        "6w": "60vw",
      },
      height: {
        "1/2h": "5vh",
        "1h": "10vh",
        "7h": "70vh",
      },
      margin: {
        "1/2h": "5vh",
      },
      fontFamily: {
        bree: "Bree Serif",
      },
    },
  },
  plugins: [require("preline/plugin")],
};
