module.exports = {
  // mode: 'jit',
  purge: {
    content: ['./src/**/*.{html,ts}'],
    safelist: [
      /^bg-/, /^text-/, /^border-/, /^from-/, /^to-/, /^hover:border-/
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
