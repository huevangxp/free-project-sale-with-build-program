<script setup lang="ts">
import {
  ArrowLeft,
  ShoppingCart,
  Check,
  Minus,
  Plus,
  Truck,
  Banknote,
  ShieldCheck,
} from "lucide-vue-next";
import { useCartStore } from "~/stores/cart";

const route = useRoute();
const { byId } = useProducts();
const cart = useCartStore();
const { formatNumber } = useFormat();

const product = byId(Number(route.params.id));
if (!product) {
  throw createError({ statusCode: 404, statusMessage: "ບໍ່ພົບສິນຄ້ານີ້" });
}

const selectedSize = ref(product.sizes[0]!);
const qty = ref(1);
const added = ref(false);

function addToCart() {
  cart.add(product!, selectedSize.value, qty.value);
  added.value = true;
  setTimeout(() => (added.value = false), 2000);
}
</script>

<template>
  <div v-if="product" class="mx-auto max-w-6xl px-4 py-8">
    <NuxtLink
      to="/products"
      class="inline-flex items-center gap-1 text-sm font-medium text-primary-700 hover:underline"
    >
      <ArrowLeft class="h-4 w-4" />
      ກັບຄືນໜ້າສິນຄ້າ
    </NuxtLink>

    <div class="mt-4 grid gap-8 md:grid-cols-2">
      <div
        class="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100"
      >
        <div class="aspect-square w-full">
          <ProductImage :colors="product.colors" :seed="product.id" />
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <div>
          <span
            v-if="product.badge"
            class="rounded-full bg-rose-500 px-3 py-1 text-xs font-bold text-white"
          >
            {{ product.badge }}
          </span>
          <h1 class="mt-2 text-2xl font-bold text-gray-800 sm:text-3xl">
            {{ product.name }}
          </h1>
          <p class="mt-1 text-sm text-gray-400">{{ product.category }}</p>
        </div>

        <div class="flex items-end gap-3">
          <p class="text-3xl font-bold text-primary-700">
            {{ formatNumber(product.price) }} ₭
          </p>
          <p
            v-if="product.oldPrice"
            class="text-lg text-gray-400 line-through"
          >
            {{ formatNumber(product.oldPrice) }} ₭
          </p>
        </div>

        <p class="leading-7 text-gray-600">{{ product.description }}</p>

        <div>
          <p class="mb-2 font-semibold text-gray-800">ຂະໜາດ</p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="size in product.sizes"
              :key="size"
              class="rounded-lg px-4 py-2 text-sm font-medium transition"
              :class="
                size === selectedSize
                  ? 'bg-primary-700 text-white'
                  : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:ring-primary-400'
              "
              @click="selectedSize = size"
            >
              {{ size }}
            </button>
          </div>
        </div>

        <div>
          <p class="mb-2 font-semibold text-gray-800">ຈຳນວນ</p>
          <div class="flex w-fit items-center rounded-lg ring-1 ring-gray-200">
            <button
              class="px-4 py-2.5 text-primary-700 hover:bg-primary-50"
              aria-label="ຫຼຸດຈຳນວນ"
              @click="qty = Math.max(1, qty - 1)"
            >
              <Minus class="h-4 w-4" />
            </button>
            <span class="w-12 text-center font-semibold">{{ qty }}</span>
            <button
              class="px-4 py-2.5 text-primary-700 hover:bg-primary-50"
              aria-label="ເພີ່ມຈຳນວນ"
              @click="qty++"
            >
              <Plus class="h-4 w-4" />
            </button>
          </div>
        </div>

        <div class="mt-2 flex flex-col gap-3 sm:flex-row">
          <button
            class="flex-1 rounded-lg bg-primary-600 px-6 py-3 font-bold text-white transition hover:bg-primary-700"
            @click="addToCart"
          >
            {{ added ? "✓ ເພີ່ມແລ້ວ" : "ເພີ່ມໃສ່ກະຕ່າ" }}
          </button>
          <NuxtLink
            to="/cart"
            class="flex-1 rounded-lg border border-primary-600 px-6 py-3 text-center font-bold text-primary-700 transition hover:bg-primary-50"
          >
            ໄປທີ່ກະຕ່າ
          </NuxtLink>
        </div>

        <ul class="mt-2 space-y-1 text-sm text-gray-500">
          <li>🚚 ສົ່ງໄວທົ່ວປະເທດ 1-3 ວັນ</li>
          <li>💵 ຈ່າຍເງິນປາຍທາງໄດ້</li>
          <li>✅ ປ່ຽນ-ຄືນໄດ້ພາຍໃນ 7 ວັນ</li>
        </ul>
      </div>
    </div>
  </div>
</template>
