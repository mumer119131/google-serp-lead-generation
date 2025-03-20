
const config = {
    darkMode: 'selector', // or 'media' or 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}', // If using Next.js app directory
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF', // Custom primary color
        secondary: '#9333EA', // Custom secondary color
        blackBg: "#0a0a0a",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
  ],
};

export default config;
