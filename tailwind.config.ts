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
        background: "var(--background)",
        foreground: "var(--foreground)",
        navy: "#1a2332",
        charcoal: "#2d3748",
        terracotta: "#c17250",
        teal: "#319795",
        olive: "#6b8e23",
      },
      fontFamily: {
        heading: ["Montserrat", "sans-serif"],
        body: ["Source Serif Pro", "serif"],
        ui: ["Inter", "sans-serif"],
      },
      maxWidth: {
        content: "1280px",
      },
    },
  },
  plugins: [],
};
export default config;
