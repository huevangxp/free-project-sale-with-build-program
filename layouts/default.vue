<script setup lang="ts"></script>

<template>
  <div>
    <VitePwaManifest />
    <v-app>
      <!-- <Header /> -->
      <v-main>
        <slot />
      </v-main>
      <v-footer fixed app style="padding: 0px; margin: 0px">
        <Footer />
      </v-footer>
    </v-app>
  </div>
</template>

<style>
* {
  font-family: "Noto Sans Lao", sans-serif;
}
</style>
