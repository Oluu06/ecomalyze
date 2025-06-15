import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // modo oscuro activado con la clase 'dark'
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",      // si usas carpeta app (Next.js 13+)
    "./pages/**/*.{ts,tsx,js,jsx}",    // si usas carpeta pages
    "./components/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
