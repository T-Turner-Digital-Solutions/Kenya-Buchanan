import type { Config } from "tailwindcss";

/**
 * KENYA BUCHANAN — design tokens.
 *
 * The palette is deliberately restrained: ink, bone, champagne. Colour is used
 * as punctuation, never as decoration — the gowns are the artwork.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0B0B0C",
          soft: "#16161A",
          muted: "#2A2A30",
        },
        bone: {
          DEFAULT: "#F7F4EF",
          deep: "#EFE9E0",
          shadow: "#E2DACE",
        },
        champagne: {
          DEFAULT: "#C1A16B",
          light: "#DCC79C",
          deep: "#9A7F4F",
        },
        clay: "#8C8377",
        wine: "#5A2032",
      },
      fontFamily: {
        display: ["var(--font-display)", "Cormorant Garamond", "Didot", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        luxe: "0.28em",
        wide2: "0.18em",
      },
      maxWidth: {
        editorial: "78rem",
      },
      borderRadius: {
        none: "0",
      },
      transitionTimingFunction: {
        silk: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fade: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        sheen: {
          "0%": { backgroundPosition: "-120% 0" },
          "100%": { backgroundPosition: "220% 0" },
        },
      },
      animation: {
        rise: "rise 0.9s cubic-bezier(0.16, 1, 0.3, 1) both",
        fade: "fade 1.2s ease both",
        sheen: "sheen 6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
