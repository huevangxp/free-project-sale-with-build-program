// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  app: {
    head: {
      title: "Lisfoom",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
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
  modules: ["@vite-pwa/nuxt", "@nuxt/eslint", "@pinia/nuxt"],
  vite: {
    plugins: [tailwindcss()],
  },

 
  // use pwa
  pwa: {
    manifest: {
      name: "Lis Foom Vaj",
      short_name: "LFV",
      theme_color: "#0d9488",
      description: "Lis Foom Vaj",
      icons: [
        {
          src: "icon.png",
          sizes: "64x64",
          type: "image/png",
        },
        {
          src: "icon.png",
          sizes: "144x144",
          type: "image/png",
        },
        {
          src: "icon.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "icon.png",
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
