/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5f8ff",
          100: "#ebf1ff",
          200: "#d7e3ff",
          300: "#b3c8ff",
          400: "#86a4ff",
          500: "#5d83ff",
          600: "#3c65f5",
          700: "#2d4fd4",
          800: "#243fa9",
          900: "#213987"
        }
      }
    }
  },
  plugins: []
};
