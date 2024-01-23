/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "node_modules/preline/dist/*.js"],
  theme: {
    extend: {
      colors: {
        "primary-100": "#d1f5f9",
        "primary-200": "#B6E4EA",
      },
      height: {
        "1h": "10vh",
      },
    },
  },
  plugins: [require("preline/plugin")],
};
