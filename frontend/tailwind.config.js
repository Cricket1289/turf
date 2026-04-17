/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0f172a", // Dark navy/slate
        primary: "#38bdf8",    // Sky blue
        accent: "#f472b6",     // Pink/Neon
        dark: "#1e293b",
        neon: "#00ffcc",       // Neon green/teal accents
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        sports: ['Orbitron', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
