import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0D1B2A",
          light: "#162233",
        },
        dark: "#070E16",
        teal: {
          DEFAULT: "#1B9AAA",
          dark: "#158A99",
          light: "#22B5C7",
        },
        gold: {
          DEFAULT: "#F7B32B",
          dark: "#E5A220",
          light: "#F9C35C",
        },
        white: "#F0F2F4",
        "text-light": "#E8EDF2",
      },
      fontFamily: {
        display: ["var(--font-display)", "cursive"],
        editorial: ["var(--font-editorial)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      fontSize: {
        hero: "clamp(80px, 15vw, 200px)",
        title: "clamp(48px, 7vw, 96px)",
        sub: "clamp(18px, 2vw, 28px)",
        label: "11px",
      },
      letterSpacing: {
        "tight-display": "-0.01em",
        "wide-label": "0.2em",
      },
      lineHeight: {
        display: "0.85",
        editorial: "1.1",
        airy: "1.8",
      },
    },
  },
  plugins: [],
};
export default config;
