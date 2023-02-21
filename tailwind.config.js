module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  theme: {

    extend: {
      fontFamily:{
        sans: ["iranyekan"],
      },
    },

    screens: {
      'sm': '420px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    // ...
  ],
}
