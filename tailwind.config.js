export default {
  important: true,
  purge: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      transitionProperty: {
        'scale': 'transform',
      },
      transitionDuration: {
        '300': '300ms',
      },
      transitionTimingFunction: {
        'in-out': 'ease-in-out',
      },
      scale: {
        '105': '1.05',
        "110":'1.10',
      },
    },
  },
  plugins: [],
};
