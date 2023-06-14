/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  daisyui: {
    themes: [
      {
        cmyk: {
          ...require("daisyui/src/theming/themes")["[data-theme=cmyk]"],
          primary: "#0089ED",
          "primary-content": "white",
          "@media only screen and (max-width: 850px)": {
            ".btn": {
              "padding-left": "0.75rem",
              "padding-right": "0.75rem",
            },
          },
        },
      },
    ],
  },
};
