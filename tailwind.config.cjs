/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8024FF",
        "primary-hover": "#6D11EF",
        "purple-light": "#FBF8FF",
        white: "#FFFFFF",
        "main-black": "#1D1D1D",
        "main-black-hover": "#222222",
        "secondary-gray": "#5A5A5A",
        "text-gray": "#8E9399",
        "text-gray-2": "#C7C7C7",
        line: "#EAEEF1",
        gray: "#F2F2F2",
        background: "#FAFAFA",
        red: {
          DEFAULT: "#FF1717",
          2: "#FFBB96",
          3: "#FFF5EE",
        },
        green: {
          DEFAULT: "#52C41A",
          dark: "#135200",
          light: "#F6FFED",
        },
        yellow: "#F8D347",
      },
      keyframes: {
        slideOut: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(40rem)" },
        },
        slideIn: {
          "0%": { transform: "translateX(40rem)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        slideOut: "slideOut .3s ease-out",
        slideIn: "slideIn .3s ease-out",
      },
      backgroundImage: () => ({
        "primary-linear": `linear-gradient(102deg, #8024FF 2.24%, #833BE7 44.52%, #924BF5 91.45%)`,
        "main-black-linear": `linear-gradient(180deg, rgba(14, 14, 14, 0.00) 34.74%, rgba(14, 14, 14, 0.35) 58.91%, #0E0E0E 110.3%)`,
      }),
      spacing: {
        5: ".3125rem",
        10: ".625rem",
        15: ".9375rem",
        20: "1.25rem",
        30: "1.875rem",
        40: "2.5rem",
        60: "3.75rem",
        80: "5rem",
        120: "7.5rem",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
