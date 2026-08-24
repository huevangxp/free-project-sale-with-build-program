// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  app: {
    head: {
      title: "Hmong Clothing Shop",
      titleTemplate: "%s · Hmong Clothing Shop",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
        {
          name: "description",
          content:
            "Authentic hand-embroidered Hmong clothing — traditional outfits, hats, silver belts and scarves, delivered nationwide. ຮ້ານເສື້ອຜ້າມົ້ງ.",
        },
        { name: "theme-color", content: "#0d9488" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/logo.png" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Noto+Sans+Lao:wght@100..900&family=Saira:ital,wght@0,100..900;1,100..900&display=swap",
        },
      ],
    },
  },

  devServer: {
    port: 4000,
  },

  css: ["~/assets/css/main.css"],

  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@vite-pwa/nuxt", "@nuxt/eslint", "@pinia/nuxt", "@nuxtjs/i18n"],

  i18n: {
    defaultLocale: "en",
    strategy: "no_prefix",
    locales: [
      { code: "en", language: "en-US", name: "English", file: "en.json" },
      { code: "lo", language: "lo-LA", name: "ລາວ", file: "lo.json" },
      { code: "hmn", language: "hmn", name: "Hmoob", file: "hmn.json" },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "shop_lang",
      fallbackLocale: "en",
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },

 
  // use pwa
  pwa: {
    // Unregisters any previously-installed (stale) service worker from
    // visitors' browsers. The old Lisfoom SW keeps requesting deleted
    // files like /components/Footer.vue, crashing the Vite dev server.
    // Set back to false when you want to enable the PWA again.
    selfDestroying: true,
    manifest: {
      name: "Hmong Clothing Shop",
      short_name: "HmongShop",
      theme_color: "#0d9488",
      description: "Authentic hand-embroidered Hmong clothing",
      icons: [
        {
          src: "logo.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "logo.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 20,
    },
    workbox: {
      navigateFallback: "/",
      // Don't serve index.html (SPA fallback) for these — otherwise the
      // Vue router tries to match paths like /workbox-*.js and warns
      // "No match found for location with path ...".
      navigateFallbackDenylist: [
        /^\/workbox-.*\.js$/,
        /^\/sw\.js$/,
        /^\/dev-sw\.js$/,
        /^\/manifest.*\.(json|webmanifest)$/,
        /\.(js|css|png|jpg|jpeg|svg|ico|json|txt|map)$/,
      ],
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
    },
    injectManifest: {
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallback: "/",
      navigateFallbackAllowlist: [/^\/$/],
      type: "module",
    },
  },
});
