<script setup lang="ts">
import { User, Phone, Lock, UserPlus } from "lucide-vue-next";
import { useAuthStore } from "~/stores/auth";

const auth = useAuthStore();

if (auth.isLoggedIn) {
  await navigateTo("/profile", { replace: true });
}

const name = ref("");
const phone = ref("");
const password = ref("");
const errorCode = ref("");

async function submit() {
  errorCode.value =
    auth.register(name.value, phone.value, password.value) ?? "";
  if (!errorCode.value) {
    await navigateTo("/", { replace: true });
  }
}
</script>

<template>
  <div class="mx-auto flex max-w-md flex-col px-4 py-12">
    <div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
      <h1 class="text-center text-2xl font-bold text-gray-800">
        {{ $t("auth.registerTitle") }}
      </h1>
      <p class="mt-1 text-center text-sm text-gray-500">
        {{ $t("auth.registerSubtitle") }}
      </p>

      <form class="mt-6 space-y-4" @submit.prevent="submit">
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700">{{
            $t("auth.fullName")
          }}</label>
          <div class="relative">
            <User
              class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400"
            />
            <input
              v-model="name"
              type="text"
              required
              :placeholder="$t('auth.namePlaceholder')"
              class="w-full rounded-lg border border-gray-200 py-2.5 pr-3 pl-9 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
            />
          </div>
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700">{{
            $t("auth.phone")
          }}</label>
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
          <label class="mb-1 block text-sm font-medium text-gray-700">{{
            $t("auth.password")
          }}</label>
          <div class="relative">
            <Lock
              class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400"
            />
            <input
              v-model="password"
              type="password"
              required
              :placeholder="$t('auth.passwordHint')"
              class="w-full rounded-lg border border-gray-200 py-2.5 pr-3 pl-9 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
            />
          </div>
        </div>

        <p
          v-if="errorCode"
          class="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-600"
        >
          {{ $t(`auth.errors.${errorCode}`) }}
        </p>

        <button
          type="submit"
          class="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 py-3 font-bold text-white transition hover:bg-primary-700"
        >
          <UserPlus class="h-5 w-5" />
          {{ $t("auth.registerBtn") }}
        </button>
      </form>

      <p class="mt-5 text-center text-sm text-gray-500">
        {{ $t("auth.haveAccount") }}
        <NuxtLink
          to="/login"
          class="font-semibold text-primary-700 hover:underline"
          >{{ $t("auth.loginLink") }}</NuxtLink
        >
      </p>
    </div>
  </div>
</template>
