/*
 * The Catppuccin values that server-rendered surfaces need as literals: the
 * browser theme-color meta and the OG card, neither of which can read the CSS
 * custom properties in globals.css. Keep these in step with that palette.
 */
export const palette = {
  latte: {
    bg: "#eff1f5",
  },
  mocha: {
    bg: "#1e1e2e",
    text: "#cdd6f4",
    muted: "#a6adc8",
    accent: "#fab387",
  },
} as const;
