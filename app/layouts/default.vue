<script setup lang="ts">
const { locale } = useI18n();

useHead(() => ({
  htmlAttrs: { lang: locale.value },
}));
</script>

<template>
  <div class="flex min-h-screen flex-col bg-teal-50">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
