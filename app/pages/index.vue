<script setup lang="ts">
import { Scissors, Truck, Banknote, ShieldCheck, Phone } from "lucide-vue-next";

const { categories, featured } = useProducts();

const features = [
  {
    icon: Scissors,
    title: "ປັກມືແທ້ 100%",
    text: "ທຸກຜືນປັກດ້ວຍມືໂດຍຊ່າງມີຝີມື",
  },
  { icon: Truck, title: "ສົ່ງໄວທົ່ວປະເທດ", text: "ຈັດສົ່ງພາຍໃນ 1-3 ວັນ" },
  { icon: Banknote, title: "ຈ່າຍເງິນປາຍທາງ", text: "ຮັບສິນຄ້າກ່ອນ ຈ່າຍທີຫຼັງ" },
  {
    icon: ShieldCheck,
    title: "ຮັບປະກັນຄຸນນະພາບ",
    text: "ປ່ຽນ-ຄືນໄດ້ພາຍໃນ 7 ວັນ",
  },
];
</script>

<template>
  <div>
    <!-- Hero -->
    <section
      class="bg-linear-to-br from-primary-800 via-primary-700 to-primary-600 text-white"
    >
      <div
        class="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-16 text-center sm:py-24"
      >
        <span
          class="rounded-full bg-primary-600/60 px-4 py-1 text-sm font-medium"
        >
          ✦ ສືບສານວັດທະນະທຳມົ້ງ ✦
        </span>
        <h1 class="text-3xl leading-snug font-bold sm:text-5xl">
          ເສື້ອຜ້າມົ້ງແທ້<br class="sm:hidden" />
          ປັກມືດ້ວຍໃຈ ໃສ່ແລ້ວສະຫງ່າງາມ
        </h1>
        <p class="max-w-2xl text-primary-100 sm:text-lg">
          ຄັດສັນຊຸດມົ້ງຄຸນນະພາບດີ ລວດລາຍປານີດ ສຳລັບທຸກເພດທຸກໄວ
          ພ້ອມສົ່ງເຖິງໜ້າບ້ານທົ່ວປະເທດ
        </p>
        <div class="flex flex-wrap justify-center gap-3">
          <NuxtLink
            to="/products"
            class="rounded-lg bg-white px-6 py-3 font-bold text-primary-700 shadow transition hover:bg-primary-50"
          >
            ຊື້ເລີຍ
          </NuxtLink>
          <NuxtLink
            to="/products"
            class="rounded-lg border border-white/60 px-6 py-3 font-bold transition hover:bg-primary-600"
          >
            ເບິ່ງສິນຄ້າທັງໝົດ
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="mx-auto max-w-6xl px-4 py-10">
      <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="rounded-xl bg-white p-4 text-center shadow-sm ring-1 ring-gray-100"
        >
          <component
            :is="feature.icon"
            class="mx-auto h-8 w-8 text-primary-600"
          />
          <h3 class="mt-2 font-bold text-gray-800">{{ feature.title }}</h3>
          <p class="mt-1 text-xs text-gray-500 sm:text-sm">
            {{ feature.text }}
          </p>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="mx-auto max-w-6xl px-4 py-4">
      <h2 class="mb-4 text-xl font-bold text-gray-800 sm:text-2xl">
        ໝວດສິນຄ້າ
      </h2>
      <div class="flex flex-wrap gap-2">
        <NuxtLink
          v-for="category in categories"
          :key="category"
          :to="{ path: '/products', query: { cat: category } }"
          class="rounded-full bg-white px-4 py-2 text-sm font-medium text-primary-700 ring-1 ring-primary-200 transition hover:bg-primary-600 hover:text-white"
        >
          {{ category }}
        </NuxtLink>
      </div>
    </section>

    <!-- Featured products -->
    <section class="mx-auto max-w-6xl px-4 py-8">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-xl font-bold text-gray-800 sm:text-2xl">
          ສິນຄ້າແນະນຳ
        </h2>
        <NuxtLink
          to="/products"
          class="text-sm font-semibold text-primary-700 hover:underline"
        >
          ເບິ່ງທັງໝົດ →
        </NuxtLink>
      </div>
      <div class="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        <ProductCard
          v-for="product in featured()"
          :key="product.id"
          :product="product"
        />
      </div>
    </section>

    <!-- CTA banner -->
    <section class="mx-auto max-w-6xl px-4 py-8">
      <div
        class="flex flex-col items-center gap-4 rounded-2xl bg-primary-700 px-6 py-10 text-center text-white sm:flex-row sm:justify-between sm:text-left"
      >
        <div>
          <h2 class="text-xl font-bold sm:text-2xl">
            ສັ່ງຕັດຊຸດມົ້ງຕາມແບບທີ່ທ່ານຕ້ອງການ
          </h2>
          <p class="mt-1 text-primary-100">
            ທັກຫາເຮົາໄດ້ເລີຍ ຊ່າງຂອງເຮົາພ້ອມອອກແບບໃຫ້ຟຣີ
          </p>
        </div>
        <a
          href="tel:02055555555"
          class="flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-bold whitespace-nowrap text-primary-700 transition hover:bg-primary-50"
        >
          <Phone class="h-5 w-5" />
          ໂທ 020 5555 5555
        </a>
      </div>
    </section>
  </div>
</template>
