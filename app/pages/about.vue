<script setup lang="ts">
import { Heart, Scissors, Users, Award } from "lucide-vue-next";

const values = [
  {
    icon: Scissors,
    title: "ຝີມືປານີດ",
    text: "ທຸກຜືນປັກດ້ວຍມືໂດຍຊ່າງທີ່ມີປະສົບການຫຼາຍກວ່າ 10 ປີ",
  },
  {
    icon: Heart,
    title: "ຮັກໃນວັດທະນະທຳ",
    text: "ເຮົາສືບສານລວດລາຍ ແລະ ພູມປັນຍາຂອງບັນພະບຸລຸດ",
  },
  {
    icon: Users,
    title: "ສ້າງລາຍຮັບຊຸມຊົນ",
    text: "ສະໜັບສະໜູນຊ່າງປັກໃນທ້ອງຖິ່ນ ໃຫ້ມີວຽກເຮັດງານທຳ",
  },
  {
    icon: Award,
    title: "ຄຸນນະພາບຮັບປະກັນ",
    text: "ຄັດເລືອກຜ້າ ແລະ ວັດສະດຸຢ່າງດີ ທົນທານ ໃສ່ໄດ້ດົນ",
  },
];
</script>

<template>
  <div>
    <section class="bg-linear-to-br from-primary-800 to-primary-600 text-white">
      <div class="mx-auto max-w-4xl px-4 py-14 text-center">
        <h1 class="text-3xl font-bold sm:text-4xl">ກ່ຽວກັບເຮົາ</h1>
        <p class="mx-auto mt-3 max-w-2xl text-primary-100">
          ຮ້ານເສື້ອຜ້າມົ້ງ ກໍ່ຕັ້ງຂຶ້ນດ້ວຍຄວາມຮັກໃນວັດທະນະທຳຂອງຊົນເຜົ່າມົ້ງ
          ເພື່ອສືບສານລວດລາຍປັກອັນເປັນເອກະລັກ ໃຫ້ຄົງຢູ່ຄູ່ລູກຫຼານສືບໄປ
        </p>
      </div>
    </section>

    <section class="mx-auto max-w-4xl px-4 py-10">
      <div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
        <h2 class="text-xl font-bold text-gray-800">ເລື່ອງລາວຂອງເຮົາ</h2>
        <p class="mt-3 leading-7 text-gray-600">
          ເລີ່ມຈາກຮ້ານນ້ອຍໆໃນນະຄອນຫຼວງວຽງຈັນ ທີ່ຮັບຕັດ ແລະ
          ປັກຊຸດມົ້ງໃຫ້ຄົນໃນຊຸມຊົນ ມື້ນີ້ເຮົາໄດ້ຂະຫຍາຍສູ່ຮ້ານອອນລາຍ
          ເພື່ອນຳເອົາຄວາມງາມຂອງຜ້າປັກມົ້ງ ສົ່ງເຖິງມືທຸກຄົນທົ່ວປະເທດ.
          ທຸກຊິ້ນງານແມ່ນຜ່ານການຄັດເລືອກ ແລະ ກວດກາຄຸນນະພາບຢ່າງລະອຽດ
          ກ່ອນສົ່ງເຖິງມືລູກຄ້າ.
        </p>
      </div>

      <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div
          v-for="value in values"
          :key="value.title"
          class="flex gap-4 rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100"
        >
          <component
            :is="value.icon"
            class="h-8 w-8 shrink-0 text-primary-600"
          />
          <div>
            <h3 class="font-bold text-gray-800">{{ value.title }}</h3>
            <p class="mt-1 text-sm text-gray-500">{{ value.text }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
