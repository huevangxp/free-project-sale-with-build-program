<script setup lang="ts">
import {
  User,
  Phone,
  MapPin,
  Save,
  LogOut,
  PackageSearch,
  Check,
} from "lucide-vue-next";
import { useAuthStore } from "~/stores/auth";

definePageMeta({ middleware: "auth" });

const auth = useAuthStore();

const name = ref(auth.user?.name ?? "");
const address = ref(auth.user?.address ?? "");
const saved = ref(false);

function save() {
  auth.updateProfile({ name: name.value.trim(), address: address.value.trim() });
  saved.value = true;
  setTimeout(() => (saved.value = false), 2000);
}

async function logout() {
  auth.logout();
  await navigateTo("/", { replace: true });
}
</script>

<template>
  <div class="mx-auto max-w-2xl px-4 py-8">
    <h1 class="text-2xl font-bold text-gray-800 sm:text-3xl">ໂປຣໄຟລຂອງຂ້ອຍ</h1>

    <div class="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
      <div class="flex items-center gap-4">
        <div
          class="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-700"
        >
          <User class="h-8 w-8" />
        </div>
        <div>
          <p class="text-lg font-bold text-gray-800">{{ auth.user?.name }}</p>
          <p class="flex items-center gap-1 text-sm text-gray-500">
            <Phone class="h-3.5 w-3.5" />
            {{ auth.user?.phone }}
          </p>
        </div>
      </div>

      <form class="mt-6 space-y-4" @submit.prevent="save">
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700"
            >ຊື່ ແລະ ນາມສະກຸນ</label
          >
          <input
            v-model="name"
            type="text"
            required
            class="w-full rounded-lg border border-gray-200 px-3 py-2.5 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
          />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700"
            >ທີ່ຢູ່ຈັດສົ່ງ</label
          >
          <div class="relative">
            <MapPin class="absolute top-3 left-3 h-4 w-4 text-gray-400" />
            <textarea
              v-model="address"
              rows="3"
              placeholder="ບ້ານ, ເມືອງ, ແຂວງ"
              class="w-full rounded-lg border border-gray-200 py-2.5 pr-3 pl-9 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          class="flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 font-bold text-white transition hover:bg-primary-700"
        >
          <Check v-if="saved" class="h-4 w-4" />
          <Save v-else class="h-4 w-4" />
          {{ saved ? "ບັນທຶກແລ້ວ" : "ບັນທຶກ" }}
        </button>
      </form>
    </div>

    <div class="mt-4 grid gap-3 sm:grid-cols-2">
      <NuxtLink
        to="/orders"
        class="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 transition hover:ring-primary-300"
      >
        <PackageSearch class="h-6 w-6 text-primary-600" />
        <div>
          <p class="font-semibold text-gray-800">ປະຫວັດການສັ່ງຊື້</p>
          <p class="text-xs text-gray-400">ເບິ່ງຄຳສັ່ງຊື້ທັງໝົດຂອງທ່ານ</p>
        </div>
      </NuxtLink>
      <button
        class="flex items-center gap-3 rounded-xl bg-white p-4 text-left shadow-sm ring-1 ring-gray-100 transition hover:ring-rose-300"
        @click="logout"
      >
        <LogOut class="h-6 w-6 text-rose-500" />
        <div>
          <p class="font-semibold text-gray-800">ອອກຈາກລະບົບ</p>
          <p class="text-xs text-gray-400">ອອກຈາກບັນຊີນີ້</p>
        </div>
      </button>
    </div>
  </div>
</template>
