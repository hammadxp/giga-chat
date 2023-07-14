/** @type {import('tailwindcss').Config} */
export default {
  content: ["*.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "600px": { max: "600px" },
      },
    },
  },
  plugins: [],
};
