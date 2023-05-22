/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      backgroundImage: {
        "logo-mask": "url('/external-auth/assets/login-mask.svg')",
        eye: "url('/external-auth/assets/eye.svg')",
        eyeCrossedOut: "url('/external-auth/assets/eyeCrossedOut.svg')",
      },
    },
  },
  plugins: [],
};
