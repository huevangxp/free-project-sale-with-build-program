# Hmong Clothing Shop · ຮ້ານເສື້ອຜ້າມົ້ງ

An e-commerce storefront for authentic hand-embroidered Hmong clothing, built
with **Nuxt 4**, **Tailwind CSS v4**, **Pinia**, and **@nuxtjs/i18n**.
Fully responsive (mobile / tablet / desktop) and trilingual:
**English (default), ລາວ (Lao), Hmoob (Hmong RPA)**.

## Features

- 🏠 Home page with hero, feature highlights, categories, and featured products
- 🛍️ Product catalog with category filters, product detail pages (size, quantity)
- 🛒 Cart (persisted in the browser) → checkout (COD / bank transfer) → order history
- 👤 Accounts: register, sign in / out, profile with delivery address
- 🌐 Language switcher in the header; choice saved in a cookie, SSR-aware
- 🎨 Teal theme + Noto Sans Lao font; generative Hmong-pattern product art (SVG)
  with support for real photos
- 📱 PWA-ready config (currently serving a self-destroying service worker —
  see below)

## Setup

```bash
npm install
npm run dev      # http://localhost:4000
npm run build    # production build
npx nuxt typecheck
```

## Project structure

| Path | Purpose |
|---|---|
| `app/pages/` | Routes: home, products, cart, checkout, orders, profile, login, register, about, contact |
| `app/components/` | `AppHeader`, `AppFooter`, `ProductCard`, `ProductImage` |
| `app/stores/` | Pinia stores: `cart`, `auth`, `orders` |
| `app/composables/useProducts.ts` | Product data + localized name/size helpers |
| `app/middleware/auth.ts` | Redirects guests to `/login` (used by profile, orders, checkout) |
| `i18n/locales/` | Translations: `en.json`, `lo.json`, `hmn.json` |
| `app/assets/css/main.css` | Tailwind v4 theme: `primary` (teal) palette + Noto Sans Lao |

## Editing content

- **Products**: edit `app/composables/useProducts.ts` (prices, categories,
  sizes, colors) and the `products` section of each file in `i18n/locales/`
  (names + descriptions per language).
- **Real product photos**: drop files into `public/images/products/` and set
  `image: "/images/products/<file>"` on the product. The photo replaces the
  generated SVG art everywhere automatically.
- **UI text**: everything lives in `i18n/locales/*.json`.

## Important notes

- **Demo auth/orders**: accounts and orders are stored in the browser
  (cookie + localStorage) with no server and no password hashing. Before going
  live, replace the functions in `app/stores/auth.ts` and
  `app/stores/orders.ts` with real API calls — the pages won't need changes.
- **Service worker**: `pwa.selfDestroying: true` in `nuxt.config.ts` purges a
  stale service worker left by a previous app on the same origin. Set it to
  `false` when you want to re-enable the installable PWA.
- The Hmong (RPA) translations in `i18n/locales/hmn.json` were machine-written —
  have a native speaker review them before launch.
