const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: {
            DEFAULT: "#f4d35e",
            light: "#faf0ca",
          },
          blue: {
            DEFAULT: "#0d3b66",
          },
        },
      },
      backgroundImage: (theme) => ({
        "grid-pattern":
          "linear-gradient(	90deg,	#eee 1.39%,	transparent 1.39%,	transparent 50%,	#eee 50%,	#eee 51.39%,	transparent 51.39%,	transparent 100%),linear-gradient(	0deg,	#eee 1.39%,	#fff 1.39%,	#fff 50%,	#eee 50%,	#eee 51.39%,	#fff 51.39%,	#fff 100%)",
      }),
      backgroundSize: {
        "72x72": "72px 72px",
      },
    },
  },
  plugins: [],
};

module.exports = config;
