<template>
    <div class="px-2 my-4">
      <HomeSlide />
  
      <!-- Header Card with Menu Button -->
      <v-card class="my-4" color="primary" dark elevation="3" rounded="xl">
        <v-card-title class="d-flex align-center justify-space-between">
          <h4>ຮູບໂຄສະນາ</h4>
          <v-avatar color="white" size="small" @click="showMenu = !showMenu">
            <v-icon size="20">{{ showMenu ? 'mdi-menu' : 'mdi-dots-horizontal' }}</v-icon>
          </v-avatar>
        </v-card-title>
      </v-card>
  
      <!-- Grid of Items -->
      <v-row dense>
        <v-col :cols="showMenu ? 12 : 6" md="4" v-for="(item, i) in promotions" :key="i">
          <v-card class="rounded-xl" elevation="3">
            <v-img :src="'http://localhost:8000/' + item.image" height="200" cover />
  
            <v-card-title class="d-flex align-center justify-space-between">
              <h4>
                <v-icon size="20">mdi-heart</v-icon>
                <span style="font-size: 16px;">29</span>
              </h4>
              <h4>
                <v-icon size="20" @click="downloadImage(item.image)">mdi-download</v-icon>
              </h4>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { storeToRefs } from 'pinia'
  
  const showMenu = ref(true)
  
  const apiPromotionStore = useApiPromotionStore()
  const { promotions } = storeToRefs(apiPromotionStore)
  
  const { fetchPromotions } = apiPromotionStore
  
  onMounted(() => {
    fetchPromotions()
  })
  
  // Computed items to show: 2 (1 row) or 4 (2 rows)
  const visibleItems = computed(() => (showMenu.value ? promotions : promotions.slice(0, 2)))

  const downloadImage = (image) => {
    const link = document.createElement('a')
    link.href = 'http://localhost:8000/' + image
    link.download = image
    link.click()
  }
  </script>
  