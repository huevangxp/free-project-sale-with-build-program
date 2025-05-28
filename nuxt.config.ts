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
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
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
    '@vite-pwa/nuxt',
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

  // devServer: {
  //   host: '0.0.0.0'
  // },

  // use pwa 
  pwa: {
    manifest: {
      name: 'Lis Foom',
      short_name: 'LFV',
      description: 'lis foom vaj project salve soap',
      theme_color: '#2275A8',
      icons: [
        {
          src: './static/qr.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: './static/qr.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: './static/qr.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    devOptions: {
      enabled: true,
      type: 'module'
    }
  }

})