<script setup lang="ts">
import { ShoppingCart, PartyPopper, X, Minus, Plus } from "lucide-vue-next";
import { useCartStore } from "~/stores/cart";

const cart = useCartStore();
const { formatNumber } = useFormat();
const ordered = ref(false);

function checkout() {
  cart.clear();
  ordered.value = true;
}
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 py-8">
    <h1 class="text-2xl font-bold text-gray-800 sm:text-3xl">ກະຕ່າສິນຄ້າ</h1>

    <div
      v-if="ordered"
      class="mt-6 rounded-xl bg-white p-8 text-center shadow-sm ring-1 ring-gray-100"
    >
      <PartyPopper class="mx-auto h-14 w-14 text-primary-600" />
      <h2 class="mt-3 text-xl font-bold text-primary-700">
        ສັ່ງຊື້ສຳເລັດແລ້ວ!
      </h2>
      <p class="mt-2 text-gray-500">
        ຂອບໃຈທີ່ອຸດໜູນ ທີມງານຈະຕິດຕໍ່ກັບເພື່ອຢືນຢັນການຈັດສົ່ງ
      </p>
      <NuxtLink
        to="/products"
        class="mt-4 inline-block rounded-lg bg-primary-600 px-6 py-3 font-bold text-white transition hover:bg-primary-700"
      >
        ຊື້ສິນຄ້າຕໍ່
      </NuxtLink>
    </div>

    <div
      v-else-if="cart.items.length === 0"
      class="mt-6 rounded-xl bg-white p-8 text-center shadow-sm ring-1 ring-gray-100"
    >
      <ShoppingCart class="mx-auto h-14 w-14 text-primary-300" />
      <p class="mt-3 text-gray-500">ກະຕ່າຂອງທ່ານຍັງຫວ່າງຢູ່</p>
      <NuxtLink
        to="/products"
        class="mt-4 inline-block rounded-lg bg-primary-600 px-6 py-3 font-bold text-white transition hover:bg-primary-700"
      >
        ເລືອກຊື້ສິນຄ້າ
      </NuxtLink>
    </div>

    <div v-else class="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start">
      <ul class="flex-1 space-y-3">
        <li
          v-for="item in cart.items"
          :key="`${item.id}-${item.size}`"
          class="flex gap-3 rounded-xl bg-white p-3 shadow-sm ring-1 ring-gray-100 sm:gap-4 sm:p-4"
        >
          <div class="h-20 w-20 shrink-0 overflow-hidden rounded-lg sm:h-24 sm:w-24">
            <ProductImage :colors="item.colors" :seed="item.id" />
          </div>
          <div class="flex min-w-0 flex-1 flex-col">
            <div class="flex items-start justify-between gap-2">
              <div class="min-w-0">
                <NuxtLink
                  :to="`/products/${item.id}`"
                  class="line-clamp-1 font-semibold text-gray-800 hover:text-primary-700"
                >
                  {{ item.name }}
                </NuxtLink>
                <p class="text-xs text-gray-400">ຂະໜາດ: {{ item.size }}</p>
              </div>
              <button
                class="text-gray-300 transition hover:text-rose-500"
                aria-label="ລຶບອອກ"
                @click="cart.remove(item.id, item.size)"
              >
                <X class="h-5 w-5" />
              </button>
            </div>
            <div class="mt-auto flex items-center justify-between pt-2">
              <div
                class="flex items-center rounded-lg ring-1 ring-gray-200"
              >
                <button
                  class="px-3 py-1.5 text-primary-700 hover:bg-primary-50"
                  aria-label="ຫຼຸດຈຳນວນ"
                  @click="cart.setQty(item.id, item.size, item.qty - 1)"
                >
                  <Minus class="h-3.5 w-3.5" />
                </button>
                <span class="w-8 text-center text-sm font-semibold">{{
                  item.qty
                }}</span>
                <button
                  class="px-3 py-1.5 text-primary-700 hover:bg-primary-50"
                  aria-label="ເພີ່ມຈຳນວນ"
                  @click="cart.setQty(item.id, item.size, item.qty + 1)"
                >
                  <Plus class="h-3.5 w-3.5" />
                </button>
              </div>
              <p class="font-bold text-primary-700">
                {{ formatNumber(item.price * item.qty) }} ₭
              </p>
            </div>
          </div>
        </li>
      </ul>

      <div
        class="w-full rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 lg:w-72"
      >
        <h2 class="font-bold text-gray-800">ສະຫຼຸບຄຳສັ່ງຊື້</h2>
        <div class="mt-3 flex justify-between text-sm text-gray-500">
          <span>ຈຳນວນສິນຄ້າ</span>
          <span>{{ cart.count }} ຊິ້ນ</span>
        </div>
        <div class="mt-1 flex justify-between text-sm text-gray-500">
          <span>ຄ່າສົ່ງ</span>
          <span>ຟຣີ</span>
        </div>
        <div
          class="mt-3 flex justify-between border-t border-gray-100 pt-3 font-bold text-gray-800"
        >
          <span>ລວມທັງໝົດ</span>
          <span class="text-primary-700">{{ formatNumber(cart.total) }} ₭</span>
        </div>
        <button
          class="mt-4 w-full rounded-lg bg-primary-600 py-3 font-bold text-white transition hover:bg-primary-700"
          @click="checkout"
        >
          ສັ່ງຊື້ເລີຍ
        </button>
      </div>
    </div>
  </div>
</template>
