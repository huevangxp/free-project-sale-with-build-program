// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Lisfoom',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: 'default-150x150.png' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Lao:wght@100..900&family=Saira:ital,wght@0,100..900;1,100..900&display=swap',
        },
      ],
    },

  },

  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    "@vite-pwa/nuxt",
    '@nuxt/content', 
    '@nuxt/eslint',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    //...
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  devServer: {
    host: '0.0.0.0'
  },

  // use pwa 
  pwa: {
    manifest: {
      name: "Lis Foom Vaj",
      short_name: "LFV",
      theme_color:'#8a8a5e',
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
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    injectManifest: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallback: '/',
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    }

  }

})