<script setup lang="ts">
import { Heart, Scissors, Users, Award } from "lucide-vue-next";
const { t } = useI18n();
useHead(() => ({ title: t("nav.about") }));

const values = [
  { icon: Scissors, title: "about.v1t", text: "about.v1x" },
  { icon: Heart, title: "about.v2t", text: "about.v2x" },
  { icon: Users, title: "about.v3t", text: "about.v3x" },
  { icon: Award, title: "about.v4t", text: "about.v4x" },
];
</script>

<template>
  <div>
    <section class="bg-linear-to-br from-primary-800 to-primary-600 text-white">
      <div class="mx-auto max-w-4xl px-4 py-14 text-center">
        <h1 class="text-3xl font-bold sm:text-4xl">{{ $t("about.title") }}</h1>
        <p class="mx-auto mt-3 max-w-2xl text-primary-100">
          {{ $t("about.subtitle") }}
        </p>
      </div>
    </section>

    <section class="mx-auto max-w-4xl px-4 py-10">
      <div
        class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8"
      >
        <h2 class="text-xl font-bold text-gray-800">
          {{ $t("about.storyTitle") }}
        </h2>
        <p class="mt-3 leading-7 text-gray-600">{{ $t("about.storyText") }}</p>
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
            <h3 class="font-bold text-gray-800">{{ $t(value.title) }}</h3>
            <p class="mt-1 text-sm text-gray-500">{{ $t(value.text) }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
