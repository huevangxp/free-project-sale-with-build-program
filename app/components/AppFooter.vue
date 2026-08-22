<script setup lang="ts">
import { Phone, Facebook, MapPin } from "lucide-vue-next";
</script>

<template>
  <footer class="mt-16 bg-primary-900 text-primary-100">
    <div
      class="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-3"
    >
      <div>
        <h3 class="mb-3 text-lg font-bold text-white">ຮ້ານເສື້ອຜ້າມົ້ງ</h3>
        <p class="text-sm leading-6">
          ຈຳໜ່າຍເສື້ອຜ້າມົ້ງແທ້ ປັກລາຍມືທຸກຜືນ ສືບສານວັດທະນະທຳ
          ແລະ ພູມປັນຍາຂອງຊົນເຜົ່າມົ້ງ ສົ່ງໄວທົ່ວປະເທດ.
        </p>
      </div>
      <div>
        <h3 class="mb-3 text-lg font-bold text-white">ເມນູ</h3>
        <ul class="space-y-2 text-sm">
          <li>
            <NuxtLink to="/" class="transition hover:text-white">ໜ້າຫຼັກ</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/products" class="transition hover:text-white"
              >ສິນຄ້າທັງໝົດ</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/cart" class="transition hover:text-white"
              >ກະຕ່າສິນຄ້າ</NuxtLink
            >
          </li>
        </ul>
      </div>
      <div>
        <h3 class="mb-3 text-lg font-bold text-white">ຕິດຕໍ່ເຮົາ</h3>
        <ul class="space-y-2 text-sm">
          <li class="flex items-center gap-2">
            <Phone class="h-4 w-4" />
            ໂທ / WhatsApp: 020 5555 5555
          </li>
          <li class="flex items-center gap-2">
            <Facebook class="h-4 w-4" />
            Facebook: ຮ້ານເສື້ອຜ້າມົ້ງ
          </li>
          <li class="flex items-center gap-2">
            <MapPin class="h-4 w-4" />
            ທີ່ຢູ່: ນະຄອນຫຼວງວຽງຈັນ, ລາວ
          </li>
        </ul>
      </div>
    </div>
    <div
      class="border-t border-primary-800 py-4 text-center text-xs text-primary-300"
    >
      © 2026 ຮ້ານເສື້ອຜ້າມົ້ງ. ສະຫງວນລິຂະສິດ.
    </div>
  </footer>
</template>
