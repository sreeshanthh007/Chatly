/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#100D08",
        surface: "#1C1814",
        elevated: "#28241E",
        border: "#3D3528",
        accent: {
          DEFAULT: "#D4A84B",
          hover: "#F0C060",
        },
        text: {
          primary: "#F5F0E8",
          secondary: "#A89880",
        },
        online: "#4CAF78",
        error: "#C0503A",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}

