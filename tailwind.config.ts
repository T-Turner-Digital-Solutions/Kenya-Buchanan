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
        /* True black through charcoal — dark sections are layered, not flat. */
        ink: {
          DEFAULT: "#0A0A0B",
          soft: "#141417",
          muted: "#26262C",
          /*
           * A lifted black for the opening section — lighter than ink, but
           * warm rather than neutral, so it never reads as grey next to the
           * bone and champagne.
           */
          raised: "#1D1A17",
        },
        charcoal: {
          DEFAULT: "#1A1A1E",
          light: "#2C2C33",
        },
        /* Warm ivory and a cleaner soft white, so light sections are not all beige. */
        bone: {
          DEFAULT: "#F7F4EF",
          deep: "#EFE9E0",
          shadow: "#E2DACE",
        },
        ivory: {
          DEFAULT: "#F4EFE7",
          deep: "#E9E1D5",
        },
        paper: "#FCFBF9",
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
        script: ["var(--font-script)", "cursive"],
      },
      letterSpacing: {
        luxe: "0.28em",
        wide2: "0.18em",
        display: "0.06em",
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
        /* Slow Ken Burns drift for hero imagery. */
        kenburns: {
          "0%": { transform: "scale(1.02) translate3d(0, 0, 0)" },
          "100%": { transform: "scale(1.14) translate3d(-1.5%, -1.5%, 0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        rise: "rise 0.9s cubic-bezier(0.16, 1, 0.3, 1) both",
        fade: "fade 1.2s ease both",
        sheen: "sheen 6s linear infinite",
        kenburns: "kenburns 9s ease-out forwards",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
