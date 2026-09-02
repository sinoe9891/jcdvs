// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2026-01-01",
  devtools: { enabled: false },

  modules: ["@nuxtjs/tailwindcss", "@nuxt/image"],

  css: ["~/assets/css/main.css"],

  app: {
    head: {
      htmlAttrs: { lang: "es" },
      title: "José Cecilio del Valle | El Sabio Valle",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Sitio dedicado a la vida, el pensamiento y el legado de José Cecilio del Valle, El Sabio Valle, redactor del Acta de Independencia de Centroamérica de 1821. Conversa con su asistente virtual y descubre su historia.",
        },
        { property: "og:title", content: "José Cecilio del Valle | El Sabio Valle" },
        {
          property: "og:description",
          content:
            "La vida, el pensamiento y el legado del redactor del Acta de Independencia de Centroamérica.",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "/jose-cecilio-del-valle.png" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: "José Cecilio del Valle — El Sabio Valle" },
        { property: "og:locale", content: "es_HN" },
        { property: "og:site_name", content: "El Sabio Valle" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "José Cecilio del Valle | El Sabio Valle" },
        {
          name: "twitter:description",
          content:
            "La vida, el pensamiento y el legado del redactor del Acta de Independencia de Centroamérica.",
        },
        { name: "twitter:image", content: "/jose-cecilio-del-valle.png" },
        { name: "twitter:image:alt", content: "Retrato de José Cecilio del Valle" },
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/perfi.png" },
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=Inter:wght@400;500;600;700&display=swap",
        },
      ],
    },
  },

  // Security headers — kept lightweight and safe for a static-leaning marketing site.
  routeRules: {
    "/**": {
      headers: {
        "X-Frame-Options": "SAMEORIGIN",
        "X-Content-Type-Options": "nosniff",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
      },
    },
  },

  runtimeConfig: {
    // Server-only — never exposed to the client.
    openaiApiKey: process.env.OPENAI_API_KEY || "",
    mongodbUri: process.env.MONGODB_URI || "",
    public: {
      // (no public keys needed — the OpenAI key must never reach the browser)
    },
  },

  nitro: {
    preset: "vercel",
  },
});
