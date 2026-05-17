import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "#FAFAF9",
          pure: "#FFFFFF",
          soft: "#F4F4F2",
        },
        ink: {
          950: "#0A0A0B",
          900: "#1A1A1D",
          700: "#3F3F46",
          500: "#71717A",
          400: "#A1A1AA",
          300: "#D4D4D8",
          200: "#E4E4E7",
          100: "#F1F1F0",
        },
        samgal: {
          DEFAULT: "#17553A",
          light: "#1F7A52",
          dark: "#103D2A",
          tint: "#E8F1EC",
          glow: "rgba(23, 85, 58, 0.18)",
        },
      },
      fontFamily: {
        sans: ["var(--font-heebo)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(10, 10, 11, 0.04), 0 8px 24px rgba(10, 10, 11, 0.04)",
        "card-hover": "0 4px 12px rgba(10, 10, 11, 0.06), 0 16px 40px rgba(10, 10, 11, 0.08)",
        accent: "0 8px 24px rgba(23, 85, 58, 0.22)",
        "accent-hover": "0 12px 32px rgba(23, 85, 58, 0.32)",
      },
      keyframes: {
        tick: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.04)" },
        },
      },
      animation: {
        tick: "tick 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
