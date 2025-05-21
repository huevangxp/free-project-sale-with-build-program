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
        <v-col :cols="showMenu ? 12 : 6" md="4" v-for="(item, i) in items" :key="i">
          <v-card class="rounded-xl" elevation="3">
            <v-img :src="item.src" height="200" cover />
  
            <v-card-title class="d-flex align-center justify-space-between">
              <h4>
                <v-icon size="20">mdi-heart</v-icon>
                <span style="font-size: 16px;">29</span>
              </h4>
              <h4>
                <v-icon size="20">mdi-download</v-icon>
              </h4>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const showMenu = ref(true)
  
  const items = [
    {
      src: 'https://satopradhan.com/cdn/shop/files/Preview-1Almond_SheaSoap.jpg?v=1713608647',
      title: 'ສະບຸ',
      price: '10000',
      description: 'Description 1',
    },
    {
      src: 'https://cdn.shopify.com/s/files/1/0623/4688/7385/files/soap_bar_600x600.jpg?v=1682486305',
      title: 'Product 2',
      price: '10000',
      description: 'Description 2',
    },
    {
      src: 'https://m.media-amazon.com/images/I/71ECuJ8sqdL._AC_UF1000,1000_QL80_.jpg',
      title: 'Product 3',
      price: '10000',
      description: 'Description 3',
    },
    {
      src: 'https://i5.walmartimages.com/seo/Dove-Shea-Butter-Beauty-Cream-Moisturizing-Bar-Soap-with-Vanilla-Scent_c3c85a38-2507-421b-8590-f16a35e8c487.cb095ab01faff492695f18981601cb6f.jpeg',
      title: 'Product 4',
      price: '10000',
      description: 'Description 4',
    },
  ]
  
  // Computed items to show: 2 (1 row) or 4 (2 rows)
  const visibleItems = computed(() => (showMenu.value ? items : items.slice(0, 2)))
  </script>
  