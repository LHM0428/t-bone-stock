module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        "px500": "500px",
        "11/12": "91.666666%",
      },
      height: {
        "px100": "100px",
        "px200": "200px",
        "px300": "300px"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
