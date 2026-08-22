<script setup lang="ts">
import { MapPin, Banknote, Landmark, Send } from "lucide-vue-next";
import { useAuthStore } from "~/stores/auth";
import { useCartStore } from "~/stores/cart";
import { useOrdersStore } from "~/stores/orders";

definePageMeta({ middleware: "auth" });

const auth = useAuthStore();
const cart = useCartStore();
const ordersStore = useOrdersStore();
const { formatNumber } = useFormat();

const name = ref(auth.user?.name ?? "");
const phone = ref(auth.user?.phone ?? "");
const address = ref(auth.user?.address ?? "");
const note = ref("");
const payment = ref("ຈ່າຍເງິນປາຍທາງ (COD)");
const error = ref("");

async function submit() {
  if (cart.items.length === 0) {
    error.value = "ກະຕ່າຂອງທ່ານຫວ່າງຢູ່";
    return;
  }
  if (!name.value.trim() || !phone.value.trim() || !address.value.trim()) {
    error.value = "ກະລຸນາປ້ອນຂໍ້ມູນຈັດສົ່ງໃຫ້ຄົບຖ້ວນ";
    return;
  }
  const order = ordersStore.place(
    {
      name: name.value.trim(),
      phone: phone.value.trim(),
      address: address.value.trim(),
      note: note.value.trim() || undefined,
      payment: payment.value,
    },
    cart.items,
    cart.total,
  );
  auth.updateProfile({ address: address.value.trim() });
  cart.clear();
  await navigateTo(`/orders?new=${order.id}`, { replace: true });
}
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 py-8">
    <h1 class="text-2xl font-bold text-gray-800 sm:text-3xl">ຢືນຢັນການສັ່ງຊື້</h1>

    <div
      v-if="cart.items.length === 0"
      class="mt-6 rounded-xl bg-white p-8 text-center shadow-sm ring-1 ring-gray-100"
    >
      <p class="text-gray-500">ກະຕ່າຂອງທ່ານຫວ່າງຢູ່ ຍັງບໍ່ສາມາດສັ່ງຊື້ໄດ້</p>
      <NuxtLink
        to="/products"
        class="mt-4 inline-block rounded-lg bg-primary-600 px-6 py-3 font-bold text-white transition hover:bg-primary-700"
      >
        ເລືອກຊື້ສິນຄ້າ
      </NuxtLink>
    </div>

    <form
      v-else
      class="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start"
      @submit.prevent="submit"
    >
      <div class="flex-1 space-y-4">
        <div class="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
          <h2 class="flex items-center gap-2 font-bold text-gray-800">
            <MapPin class="h-5 w-5 text-primary-600" />
            ຂໍ້ມູນຈັດສົ່ງ
          </h2>
          <div class="mt-4 space-y-3">
            <div class="grid gap-3 sm:grid-cols-2">
              <input
                v-model="name"
                type="text"
                required
                placeholder="ຊື່ຜູ້ຮັບ"
                class="w-full rounded-lg border border-gray-200 px-3 py-2.5 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
              />
              <input
                v-model="phone"
                type="tel"
                required
                placeholder="ເບີໂທຕິດຕໍ່"
                class="w-full rounded-lg border border-gray-200 px-3 py-2.5 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
              />
            </div>
            <textarea
              v-model="address"
              rows="3"
              required
              placeholder="ທີ່ຢູ່ຈັດສົ່ງ: ບ້ານ, ເມືອງ, ແຂວງ"
              class="w-full rounded-lg border border-gray-200 px-3 py-2.5 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
            ></textarea>
            <textarea
              v-model="note"
              rows="2"
              placeholder="ໝາຍເຫດ (ຖ້າມີ)"
              class="w-full rounded-lg border border-gray-200 px-3 py-2.5 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
            ></textarea>
          </div>
        </div>

        <div class="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
          <h2 class="font-bold text-gray-800">ວິທີຊຳລະເງິນ</h2>
          <div class="mt-3 space-y-2">
            <label
              class="flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition"
              :class="
                payment.includes('COD')
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200'
              "
            >
              <input
                v-model="payment"
                type="radio"
                value="ຈ່າຍເງິນປາຍທາງ (COD)"
                class="accent-primary-600"
              />
              <Banknote class="h-5 w-5 text-primary-600" />
              <span class="text-sm font-medium">ຈ່າຍເງິນປາຍທາງ (COD)</span>
            </label>
            <label
              class="flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition"
              :class="
                payment.includes('ໂອນ')
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200'
              "
            >
              <input
                v-model="payment"
                type="radio"
                value="ໂອນເງິນຜ່ານທະນາຄານ"
                class="accent-primary-600"
              />
              <Landmark class="h-5 w-5 text-primary-600" />
              <span class="text-sm font-medium">ໂອນເງິນຜ່ານທະນາຄານ</span>
            </label>
          </div>
        </div>

        <p v-if="error" class="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-600">
          {{ error }}
        </p>
      </div>

      <div
        class="w-full rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 lg:w-80"
      >
        <h2 class="font-bold text-gray-800">ສະຫຼຸບຄຳສັ່ງຊື້</h2>
        <ul class="mt-3 space-y-2">
          <li
            v-for="item in cart.items"
            :key="`${item.id}-${item.size}`"
            class="flex justify-between gap-2 text-sm"
          >
            <span class="line-clamp-1 text-gray-600">
              {{ item.name }} ({{ item.size }}) × {{ item.qty }}
            </span>
            <span class="shrink-0 font-medium text-gray-800">
              {{ formatNumber(item.price * item.qty) }} ₭
            </span>
          </li>
        </ul>
        <div
          class="mt-3 flex justify-between border-t border-gray-100 pt-3 font-bold text-gray-800"
        >
          <span>ລວມທັງໝົດ</span>
          <span class="text-primary-700">{{ formatNumber(cart.total) }} ₭</span>
        </div>
        <button
          type="submit"
          class="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 py-3 font-bold text-white transition hover:bg-primary-700"
        >
          <Send class="h-5 w-5" />
          ຢືນຢັນສັ່ງຊື້
        </button>
      </div>
    </form>
  </div>
</template>
