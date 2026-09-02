import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        // Palette sampled from the approved mockup
        ink: "#2C1D12", // near-black warm brown — header/footer, body text
        forest: "#1B2F2A", // deep green — banners, pensamiento section
        forest2: "#16241F",
        parchment: "#F1E4D0", // main cream background
        parchment2: "#EADFCE", // card background, slightly deeper cream
        gold: "#A2783D", // primary accent — buttons, dividers
        goldLight: "#C9A227", // secondary accent — small labels, links
        clay: "#D3B38C", // warm hero background tone
        muted: "#6B5A45", // muted brown for supporting text
      },
      fontFamily: {
        serif: ["'Playfair Display'", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "72rem",
      },
    },
  },
  plugins: [],
};
