<template>
  <div>
    <!-- {{ image }} -->
    <v-carousel height="200" cycle interval="5000" :show-arrows="false">
      <v-carousel-item v-for="(item, i) in image" :key="i" :src="'http://localhost:8000/' + item.image" cover>
        <!-- <v-img ></v-img> -->
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script setup>

import { storeToRefs } from 'pinia'
import { useApiSliderImageStore } from '@/stores/apiSliderImage'

const apiSliderImageStore = useApiSliderImageStore()
const { image } = storeToRefs(apiSliderImageStore)

const { fetchSliderImages } = apiSliderImageStore

onMounted(() => {
  fetchSliderImages()
})


</script>