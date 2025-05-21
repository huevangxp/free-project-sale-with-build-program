<script setup lang="ts">
    const count = ref(1)
</script>

<template>
  <v-app-bar color="primary" dark>
    <v-app-bar-title class="font-weight-bold">Lisfoom</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn v-if="count > 0" class="text-none" stacked to="/cart">
      <v-badge  color="error" :content="count">
        <v-icon>mdi-cart</v-icon>
      </v-badge>
    </v-btn>
    <v-btn v-else class="text-none" stacked>
      <v-icon>mdi-cart</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<style scoped></style>
