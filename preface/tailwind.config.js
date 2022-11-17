/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        layout: "19rem 1fr"
      },
      gridTemplateRows: {
        basicContent: "6rem 1fr 4rem",
        sideContent: "6rem auto"
      },
      height: {
        vh100: "100vh"
      },
      colors: {
        primary1: "#091e3b",
        primary2: "#07162c",
        primary3: "#3B8EF5",
        white1: "#ffffff",
        gray1: "#d0d0d0",
        gray2: "#333333",
        myDarkBlue: "#041627",
        myBlue: "#458ff7",
        myGray: "#eff2f5",
        myLightGray: "#f0f0f0",
        myBeigeGray: "#f5f5f5",
        myLightBlack: "#2a2a2a",
        myBeige: "#fafafa"
      }
    }
  },
  plugins: []
};
