/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      boxShadow: {
        full: "0  0 15px rgba(0, 0, 0, 0.1) ",
    },
    },
  },
  plugins: ['macros'],
}

