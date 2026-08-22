<script setup lang="ts">
import { Phone, Facebook, MapPin } from "lucide-vue-next";
</script>

<template>
  <footer class="mt-16 bg-primary-900 text-primary-100">
    <!-- Custom-order CTA banner -->
    <div class="mx-auto max-w-6xl px-4 pt-6">
      <div
        class="flex flex-col items-center gap-3 rounded-xl bg-primary-700 px-5 py-4 text-center text-white sm:flex-row sm:justify-between sm:text-left"
      >
        <div>
          <h2 class="text-sm font-bold sm:text-base">{{ $t("footer.cta") }}</h2>
          <p class="mt-0.5 text-xs text-primary-100">
            {{ $t("footer.ctaSub") }}
          </p>
        </div>
        <a
          href="tel:02055555555"
          class="flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-sm font-bold whitespace-nowrap text-primary-700 transition hover:bg-primary-50"
        >
          <Phone class="h-4 w-4" />
          {{ $t("footer.call") }}
        </a>
      </div>
    </div>

    <div
      class="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-3"
    >
      <div>
        <h3 class="mb-3 text-lg font-bold text-white">{{ $t("brand") }}</h3>
        <p class="text-sm leading-6">{{ $t("footer.text") }}</p>
      </div>
      <div>
        <h3 class="mb-3 text-lg font-bold text-white">{{ $t("footer.menu") }}</h3>
        <ul class="space-y-2 text-sm">
          <li>
            <NuxtLink to="/" class="transition hover:text-white">{{
              $t("nav.home")
            }}</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/products" class="transition hover:text-white">{{
              $t("nav.products")
            }}</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/cart" class="transition hover:text-white">{{
              $t("nav.cart")
            }}</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/orders" class="transition hover:text-white">{{
              $t("nav.orders")
            }}</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/about" class="transition hover:text-white">{{
              $t("nav.about")
            }}</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/contact" class="transition hover:text-white">{{
              $t("nav.contact")
            }}</NuxtLink>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="mb-3 text-lg font-bold text-white">
          {{ $t("footer.contactTitle") }}
        </h3>
        <ul class="space-y-2 text-sm">
          <li class="flex items-center gap-2">
            <Phone class="h-4 w-4" />
            {{ $t("footer.phone") }}
          </li>
          <li class="flex items-center gap-2">
            <Facebook class="h-4 w-4" />
            {{ $t("footer.facebook") }}
          </li>
          <li class="flex items-center gap-2">
            <MapPin class="h-4 w-4" />
            {{ $t("footer.address") }}
          </li>
        </ul>
      </div>
    </div>
    <div
      class="border-t border-primary-800 py-4 text-center text-xs text-primary-300"
    >
      {{ $t("footer.rights") }}
    </div>
  </footer>
</template>
