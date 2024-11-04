/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        HeaderBg: "#878f9a",
        FooterBg: "#1d2228",
        themeBg: "rgb(29 34 40)",
      },
      fontFamily: {
        HomePageFont: ["Titillium Web", "sans-serif"],
      },
      flex: {
        "2/3": "2 1 66.666%", // Two-thirds
        "1/3": "1 1 33.333%", // One-third
      },
    },
  },
  plugins: [],
};
