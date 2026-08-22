<script setup lang="ts">
import { useCartStore } from "~/stores/cart";

const cart = useCartStore();
const menuOpen = ref(false);
const route = useRoute();

const links = [
  { to: "/", label: "ໜ້າຫຼັກ" },
  { to: "/products", label: "ສິນຄ້າ" },
  { to: "/cart", label: "ກະຕ່າສິນຄ້າ" },
];

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
      class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3"
    >
      <NuxtLink to="/" class="flex items-center gap-2">
        <span
          class="flex h-9 w-9 items-center justify-center rounded-full bg-white font-bold text-primary-700"
          >ມ</span
        >
        <span class="text-lg font-bold whitespace-nowrap">ຮ້ານເສື້ອຜ້າມົ້ງ</span>
      </NuxtLink>

      <nav class="hidden items-center gap-6 md:flex">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="font-medium transition hover:text-primary-200"
          active-class="text-primary-200 underline underline-offset-4"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-2">
        <NuxtLink
          to="/cart"
          class="relative flex items-center gap-1 rounded-lg bg-primary-600 px-3 py-2 font-medium transition hover:bg-primary-500"
          aria-label="ກະຕ່າສິນຄ້າ"
        >
          <svg
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 4.6a1 1 0 0 0 .9 1.4H19M9 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
            />
          </svg>
          <span
            v-if="cart.count > 0"
            class="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-xs font-bold"
          >
            {{ cart.count }}
          </span>
        </NuxtLink>

        <button
          class="rounded-lg p-2 transition hover:bg-primary-600 md:hidden"
          aria-label="ເມນູ"
          @click="menuOpen = !menuOpen"
        >
          <svg
            class="h-6 w-6"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              v-if="!menuOpen"
              stroke-linecap="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path v-else stroke-linecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </div>

    <nav
      v-if="menuOpen"
      class="border-t border-primary-600 bg-primary-700 md:hidden"
    >
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="block px-4 py-3 font-medium transition hover:bg-primary-600"
        active-class="bg-primary-800"
      >
        {{ link.label }}
      </NuxtLink>
    </nav>
  </header>
</template>
