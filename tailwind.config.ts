import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        torra: {
          bean: "#3b2417",
          roast: "#6b4423",
          crema: "#c9a37a",
          foam: "#f4ece2",
        },
      },
    },
  },
  plugins: [],
};

export default config;
