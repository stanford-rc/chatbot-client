/** @type {import('tailwindcss').config} */
module.exports = {
  mode: "jit",
  content: [
    "./templates/*",
    "./static/*.js"
  ],
  presets: [
    require('decanter')
  ],
  plugins: [],
  safelist: [
    "px-4",
     "py-2",
    {
      pattern: /(bg|text|border|items|max|w)-./
    },
  ],
}