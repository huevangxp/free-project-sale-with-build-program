<script setup lang="ts">
import { SearchX, Home } from "lucide-vue-next";
import type { NuxtError } from "#app";

defineProps<{ error: NuxtError }>();

function goHome() {
  clearError({ redirect: "/" });
}
</script>

<template>
  <div class="flex min-h-screen flex-col bg-teal-50">
    <AppHeader />
    <main class="flex flex-1 items-center justify-center px-4 py-16">
      <div class="text-center">
        <SearchX class="mx-auto h-20 w-20 text-primary-300" />
        <h1 class="mt-4 text-5xl font-bold text-primary-700">
          {{ error.statusCode }}
        </h1>
        <p class="mt-3 text-lg text-gray-600">
          {{
            error.statusCode === 404 ? $t("error.notFound") : $t("error.general")
          }}
        </p>
        <button
          class="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 font-bold text-white transition hover:bg-primary-700"
          @click="goHome"
        >
          <Home class="h-5 w-5" />
          {{ $t("error.home") }}
        </button>
      </div>
    </main>
    <AppFooter />
  </div>
</template>
