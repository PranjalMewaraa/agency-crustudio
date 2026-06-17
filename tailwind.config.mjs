/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0a",
        paper: "#f1efe8",
        "paper-2": "#e6e3d8",
        accent: "#ff4500",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        serif: ["var(--font-serif)", "Times New Roman", "serif"],
        mono: ["var(--font-mono)", "Courier New", "monospace"],
      },
    },
  },
  plugins: [],
};
