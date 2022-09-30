const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.html", "./src/**/*.jsx"],
  theme: {
    colors: {
      // Build your palette here
      transparent: "transparent",
      current: "currentColor",
      gray: colors.slate,
      red: colors.red,
      green: colors.emerald,
      cyan: colors.cyan,
      blue: colors.sky,
      darkBlue: colors.blue,
      purple: colors.purple,
      fuchsia: colors.fuchsia,
      yellow: colors.yellow,
      white: colors.white,
      orange: colors.orange,
    },
    extend: {
      fontFamily: {
        main: ["Roboto,Arial,sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};