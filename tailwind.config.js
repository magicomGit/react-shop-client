/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content:  [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'my': '1px 1px 4px 0px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
})
