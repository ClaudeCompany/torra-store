import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F6F5F2",
        surface: "#FFFFFF",
        ink: "#1C1714",
        muted: "#6B625A",
        line: "#E3DED5",
        cherry: "#D33F2C",
        "cherry-dark": "#B33322",
        // tons de torra: so para os visuais de produto (derivados do tema)
        "roast-light": "#C9A47A",
        "roast-medium": "#8A5A33",
        "roast-dark": "#3E2519",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
