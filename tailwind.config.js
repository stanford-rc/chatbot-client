/** @type {import('tailwindcss').config} */
module.exports = {
  theme: {
    extend: {
      maxWidth: {
        50: '50%',
        60: '60%',
        70: '70%',
        80: '80%',
        90: '90%',
        // 100% is not required as max-w-full will be present by default
      }
    }
  },
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
      pattern: /(bg|text|border|items|max|w|h|gap|leading)-./
    },
  ],
}