import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FAF7F1",
        paperDark: "#F3EEE4",
        ink: "#161513",
        inkSoft: "#3A3732",
        inkMuted: "#78736A",
        rule: "#E4DED0",
        ruleSoft: "#ECE7DA",
        rust: "#B04A1D",
        rustDeep: "#8C3A14",
        rustSoft: "#F2DCCE",
        teal: "#0D4A45",
        tealSoft: "#D9E5E3",
        gold: "#A0801C",
        goldSoft: "#EFE4C2",
        leaf: "#4A6B2A",
        leafSoft: "#E3EAD6",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
    },
  },
  plugins: [],
};
export default config;
