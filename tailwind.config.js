/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "D5DFE5", // Light theme primary color
        secondary: "C9B1BD", // Light theme secondary color
        darkPrimary: "7F9172", // Dark theme primary color
        darkSecondary: "567568", // Dark theme secondary color
      },
    },
  },
  plugins: [],
};
