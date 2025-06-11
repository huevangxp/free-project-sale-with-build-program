<template>
    <div class=" my-4">
        <div>
            <v-row dense >
                <v-col v-for="i in types" cols="4" md="4">
                <v-card class="d-flex align-center justify-center" elevation="3" rounded="xl">
                   <div>
                    <v-img
                        :src=" 'http://localhost:8000/' + i.image"
                        cover
                        height="40" 
                        width="40"
                    ></v-img>

                   </div>
                    <v-card-title class="text-center">{{ i.title }}</v-card-title>
                </v-card>
                </v-col>
            </v-row>
        </div>
        <v-card class="my-4 " color="primary" dark elevation="3" rounded="xl" >
           <v-card-title class="d-flex align-center justify-space-between">
            <h4>ສິນຄ້າ</h4>
            <v-avatar color="white" size="small" @click="navigateTo('/product')"><v-icon size="20">mdi-arrow-right</v-icon></v-avatar>
           </v-card-title>
          
        </v-card>
        <v-row dense>
            <v-col cols="6" md="4" v-for="(item,i) in products" :key="i">
                <v-card class="rounded-xl" elevation="3">
                    <v-img
                        :src=" 'http://localhost:8000/' + item.image"
                        height="120"
                        contain
                    ></v-img>

                <div class="d-flex align-center justify-space-between">
                    <div>
                        <v-card-title>
                        <h4 class="text-primary">
                            {{ item.title }}
                        </h4>
                    </v-card-title>
                    <v-card-text>
                        <h3 class="text-secondary">
                            {{ formatMoneyLAK(item.price) }}
                        </h3>
                    </v-card-text>
                    </div>
                    <div>
                        <v-btn color="primary" elevation="0" rounded="pill" variant="text"><v-icon size="30">mdi-cart</v-icon></v-btn>
                    </div>
                </div>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
import { useFormat } from '@/composables/useFormat';
import { storeToRefs } from 'pinia'
import { useApiProductTypeStore } from '@/stores/apiProductType';
import { useApiProductStore } from '@/stores/apiProduct';

const apiProductTypeStore = useApiProductTypeStore()
const { types } = storeToRefs(apiProductTypeStore)

const apiProductStore = useApiProductStore()
const { products } = storeToRefs(apiProductStore)

const { fetchProductTypes } = apiProductTypeStore
const { fetchProducts } = apiProductStore

onMounted(() => {
    fetchProductTypes()
    fetchProducts()
})

const { formatMoneyLAK } = useFormat();

   
</script>

    