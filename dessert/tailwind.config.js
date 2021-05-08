module.exports = {
  purge: ['./index.html', './src/**/*.{svelte,js,ts}'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [({ addBase, theme }) => {
    addBase({
      'button:focus': { outline: 0 },
    })
  }],
}
