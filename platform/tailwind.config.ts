import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        hai: {
          primary: "#0a1628",
          accent: "#e8740c",
          "accent-dark": "#c76200",
          blue: "#1a5276",
          "blue-light": "#2980b9",
          navy: "#111d33",
          steel: "#2a3a5a",
          teal: "#007B83",
        },
      },
      fontFamily: {
        sans: ["'Segoe UI'", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
