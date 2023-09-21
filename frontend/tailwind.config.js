/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        "300px": "300px",
        "250px": "250px",
        "calc(100% - 300px)": "calc(100% - 300px)",
        "30%": "30%",
        "70%": "70%",
        "40px": "40px",
        "44px": "44px",
        "12px": "12px",
        "4px": "4px",
        "2px": "2px",
        "6px": "6px",
        "280px": "280px",
        "200px": "200px",
        "28px": "28px",
        "50px": "50px",
        "150px": "150px",
        "75px": "75px",
      },
      translate: {
        "2px": "2px",
        "-50%": "-50%",
      },
    },
  },
  plugins: [],
};
