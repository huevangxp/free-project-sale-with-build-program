<script setup lang="ts">
import { Phone, Lock, LogIn } from "lucide-vue-next";
import { useAuthStore } from "~/stores/auth";

const auth = useAuthStore();
const route = useRoute();

if (auth.isLoggedIn) {
  await navigateTo("/profile", { replace: true });
}

const phone = ref("");
const password = ref("");
const error = ref("");

async function submit() {
  error.value = auth.login(phone.value, password.value) ?? "";
  if (!error.value) {
    await navigateTo((route.query.redirect as string) || "/", {
      replace: true,
    });
  }
}
</script>

<template>
  <div class="mx-auto flex max-w-md flex-col px-4 py-12">
    <div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
      <h1 class="text-center text-2xl font-bold text-gray-800">ເຂົ້າສູ່ລະບົບ</h1>
      <p class="mt-1 text-center text-sm text-gray-500">
        ຍິນດີຕ້ອນຮັບກັບຄືນສູ່ຮ້ານເສື້ອຜ້າມົ້ງ
      </p>

      <form class="mt-6 space-y-4" @submit.prevent="submit">
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700"
            >ເບີໂທລະສັບ</label
          >
          <div class="relative">
            <Phone
              class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400"
            />
            <input
              v-model="phone"
              type="tel"
              required
              placeholder="020 XXXX XXXX"
              class="w-full rounded-lg border border-gray-200 py-2.5 pr-3 pl-9 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
            />
          </div>
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700"
            >ລະຫັດຜ່ານ</label
          >
          <div class="relative">
            <Lock
              class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400"
            />
            <input
              v-model="password"
              type="password"
              required
              placeholder="••••••••"
              class="w-full rounded-lg border border-gray-200 py-2.5 pr-3 pl-9 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
            />
          </div>
        </div>

        <p v-if="error" class="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-600">
          {{ error }}
        </p>

        <button
          type="submit"
          class="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 py-3 font-bold text-white transition hover:bg-primary-700"
        >
          <LogIn class="h-5 w-5" />
          ເຂົ້າສູ່ລະບົບ
        </button>
      </form>

      <p class="mt-5 text-center text-sm text-gray-500">
        ຍັງບໍ່ມີບັນຊີ?
        <NuxtLink
          to="/register"
          class="font-semibold text-primary-700 hover:underline"
          >ລົງທະບຽນ</NuxtLink
        >
      </p>
    </div>
  </div>
</template>
