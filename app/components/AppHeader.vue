<script setup lang="ts">
import { ShoppingCart, Menu, X, User, LogIn, Globe } from "lucide-vue-next";
import { useAuthStore } from "~/stores/auth";
import { useCartStore } from "~/stores/cart";

const { locale, locales, setLocale } = useI18n();
const auth = useAuthStore();
const cart = useCartStore();
const menuOpen = ref(false);
const route = useRoute();

const links = [
  { to: "/", key: "nav.home" },
  { to: "/products", key: "nav.products" },
  { to: "/about", key: "nav.about" },
  { to: "/contact", key: "nav.contact" },
];

const menuLinks = computed(() => [
  ...links,
  { to: "/cart", key: "nav.cart" },
  ...(auth.isLoggedIn
    ? [
        { to: "/profile", key: "nav.profile" },
        { to: "/orders", key: "nav.orders" },
      ]
    : [
        { to: "/login", key: "nav.login" },
        { to: "/register", key: "nav.register" },
      ]),
]);

function changeLocale(event: Event) {
  setLocale((event.target as HTMLSelectElement).value as "en" | "lo" | "hmn");
}

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false;
  },
);
</script>

<template>
  <header class="sticky top-0 z-50 bg-primary-700 text-white shadow-md">
    <div
      class="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:gap-4"
    >
      <NuxtLink to="/" class="flex items-center gap-2">
        <span
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white font-bold text-primary-700"
          >ມ</span
        >
        <span class="hidden text-lg font-bold whitespace-nowrap sm:inline">{{
          $t("brand")
        }}</span>
      </NuxtLink>

      <nav class="hidden items-center gap-6 md:flex">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="font-medium transition hover:text-primary-200"
          active-class="text-primary-200 underline underline-offset-4"
        >
          {{ $t(link.key) }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-1.5 sm:gap-2">
        <div class="relative">
          <Globe
            class="pointer-events-none absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2"
          />
          <select
            :value="locale"
            class="cursor-pointer appearance-none rounded-lg bg-primary-600 py-2 pr-2 pl-7 text-sm font-medium transition hover:bg-primary-500"
            aria-label="Language"
            @change="changeLocale"
          >
            <option
              v-for="loc in locales"
              :key="loc.code"
              :value="loc.code"
              class="bg-white text-gray-800"
            >
              {{ loc.name }}
            </option>
          </select>
        </div>

        <NuxtLink
          to="/cart"
          class="relative flex items-center gap-1 rounded-lg bg-primary-600 px-3 py-2 font-medium transition hover:bg-primary-500"
          :aria-label="$t('nav.cart')"
        >
          <ShoppingCart class="h-5 w-5" />
          <ClientOnly>
            <span
              v-if="cart.count > 0"
              class="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-xs font-bold"
            >
              {{ cart.count }}
            </span>
          </ClientOnly>
        </NuxtLink>

        <NuxtLink
          v-if="auth.isLoggedIn"
          to="/profile"
          class="flex items-center gap-1.5 rounded-lg bg-primary-600 px-3 py-2 font-medium transition hover:bg-primary-500"
          :aria-label="$t('nav.profile')"
        >
          <User class="h-5 w-5" />
          <span class="hidden max-w-24 truncate text-sm lg:inline">{{
            auth.user?.name
          }}</span>
        </NuxtLink>
        <NuxtLink
          v-else
          to="/login"
          class="flex items-center gap-1.5 rounded-lg bg-primary-600 px-3 py-2 font-medium transition hover:bg-primary-500"
          :aria-label="$t('nav.login')"
        >
          <LogIn class="h-5 w-5" />
          <span class="hidden text-sm lg:inline">{{ $t("nav.login") }}</span>
        </NuxtLink>

        <button
          class="rounded-lg p-2 transition hover:bg-primary-600 md:hidden"
          aria-label="Menu"
          @click="menuOpen = !menuOpen"
        >
          <Menu v-if="!menuOpen" class="h-6 w-6" />
          <X v-else class="h-6 w-6" />
        </button>
      </div>
    </div>

    <nav
      v-if="menuOpen"
      class="border-t border-primary-600 bg-primary-700 md:hidden"
    >
      <NuxtLink
        v-for="link in menuLinks"
        :key="link.to"
        :to="link.to"
        class="block px-4 py-3 font-medium transition hover:bg-primary-600"
        active-class="bg-primary-800"
      >
        {{ $t(link.key) }}
      </NuxtLink>
    </nav>
  </header>
</template>
