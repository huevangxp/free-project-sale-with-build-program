<script setup lang="ts">
import { Phone, Facebook, MapPin, Clock, Send, Check } from "lucide-vue-next";
const { t } = useI18n();
useHead(() => ({ title: t("contact.title") }));

const name = ref("");
const phone = ref("");
const message = ref("");
const sent = ref(false);

function submit() {
  sent.value = true;
  name.value = "";
  phone.value = "";
  message.value = "";
  setTimeout(() => (sent.value = false), 3000);
}
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 py-8">
    <h1 class="text-2xl font-bold text-gray-800 sm:text-3xl">
      {{ $t("contact.title") }}
    </h1>
    <p class="mt-1 text-gray-500">{{ $t("contact.subtitle") }}</p>

    <div class="mt-6 grid gap-6 md:grid-cols-2">
      <div class="space-y-3">
        <div
          class="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100"
        >
          <Phone class="h-6 w-6 text-primary-600" />
          <div>
            <p class="text-sm font-bold text-gray-800">
              {{ $t("contact.phone") }}
            </p>
            <p class="text-sm text-gray-500">020 5555 5555</p>
          </div>
        </div>
        <div
          class="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100"
        >
          <Facebook class="h-6 w-6 text-primary-600" />
          <div>
            <p class="text-sm font-bold text-gray-800">
              {{ $t("contact.facebook") }}
            </p>
            <p class="text-sm text-gray-500">{{ $t("brand") }}</p>
          </div>
        </div>
        <div
          class="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100"
        >
          <MapPin class="h-6 w-6 text-primary-600" />
          <div>
            <p class="text-sm font-bold text-gray-800">
              {{ $t("contact.address") }}
            </p>
            <p class="text-sm text-gray-500">{{ $t("contact.addressValue") }}</p>
          </div>
        </div>
        <div
          class="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100"
        >
          <Clock class="h-6 w-6 text-primary-600" />
          <div>
            <p class="text-sm font-bold text-gray-800">
              {{ $t("contact.hours") }}
            </p>
            <p class="text-sm text-gray-500">{{ $t("contact.hoursValue") }}</p>
          </div>
        </div>
      </div>

      <form
        class="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100"
        @submit.prevent="submit"
      >
        <h2 class="font-bold text-gray-800">{{ $t("contact.formTitle") }}</h2>
        <div class="mt-4 space-y-3">
          <input
            v-model="name"
            type="text"
            required
            :placeholder="$t('contact.yourName')"
            class="w-full rounded-lg border border-gray-200 px-3 py-2.5 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
          />
          <input
            v-model="phone"
            type="tel"
            required
            :placeholder="$t('contact.yourPhone')"
            class="w-full rounded-lg border border-gray-200 px-3 py-2.5 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
          />
          <textarea
            v-model="message"
            rows="4"
            required
            :placeholder="$t('contact.message')"
            class="w-full rounded-lg border border-gray-200 px-3 py-2.5 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
          ></textarea>
          <button
            type="submit"
            class="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 py-3 font-bold text-white transition hover:bg-primary-700"
          >
            <Check v-if="sent" class="h-5 w-5" />
            <Send v-else class="h-5 w-5" />
            {{ sent ? $t("contact.sent") : $t("contact.send") }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
