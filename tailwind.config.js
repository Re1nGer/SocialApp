/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          "100%": {
            "transform": "translateX(100%)",
          },
        },
        pulse: {
          "0%": {
            "transform": "scale(0.95)",
            "box-shadow": "0 0 1 1 rgba(0, 0, 0, 0.9)"
          },
          "70%": {
            "transform": "scale(1)",
            "box-shadow": "0 0 0 10px rgba(0, 0, 0, 0)"
          },
          "100%": {
            "transform": "scale(0.95)",
            "box-shadow": "0 0 0 0 rgba(0, 0, 0, 0)"
          },
        }
      }
    },
  },
  plugins: [],
}

