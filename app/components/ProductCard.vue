<script setup lang="ts">
import { ShoppingCart } from "lucide-vue-next";
import type { Product } from "~/composables/useProducts";
import { useCartStore } from "~/stores/cart";

const props = defineProps<{ product: Product }>();
const cart = useCartStore();
const { formatNumber } = useFormat();

function quickAdd() {
  cart.add(props.product, props.product.sizes[0]!);
}
</script>

<template>
  <div
    class="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100 transition hover:shadow-lg"
  >
    <NuxtLink :to="`/products/${product.id}`" class="relative block">
      <div class="aspect-square w-full overflow-hidden">
        <ProductImage
          :colors="product.colors"
          :seed="product.id"
          :kind="product.kind"
          :image="product.image"
          :alt="product.name"
          class="transition duration-300 group-hover:scale-105"
        />
      </div>
      <span
        v-if="product.badge"
        class="absolute top-2 left-2 rounded-full bg-rose-500 px-2 py-0.5 text-xs font-bold text-white"
      >
        {{ product.badge }}
      </span>
    </NuxtLink>
    <div class="flex flex-1 flex-col gap-1 p-3 sm:p-4">
      <p class="text-xs text-gray-400">{{ product.category }}</p>
      <NuxtLink
        :to="`/products/${product.id}`"
        class="line-clamp-2 font-semibold text-gray-800 transition hover:text-primary-700"
      >
        {{ product.name }}
      </NuxtLink>
      <div class="mt-auto flex items-end justify-between gap-2 pt-2">
        <div>
          <p
            v-if="product.oldPrice"
            class="text-xs text-gray-400 line-through"
          >
            {{ formatNumber(product.oldPrice) }} ₭
          </p>
          <p class="font-bold text-primary-700">
            {{ formatNumber(product.price) }} ₭
          </p>
        </div>
        <button
          class="flex items-center gap-1 rounded-lg bg-primary-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-primary-700"
          @click="quickAdd"
        >
          <ShoppingCart class="h-4 w-4" />
          ກະຕ່າ
        </button>
      </div>
    </div>
  </div>
</template>
