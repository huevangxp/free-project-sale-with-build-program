<template>
    <div class="px-2 my-4">
        <v-card elevation="3" rounded="xl">
            <v-card-title class="bg-primary">
                <h4>ສິນຄ້າ</h4>
           </v-card-title>
            <v-card-title>
            <v-row>
                <v-col cols="8">
              <v-select
                v-model="select_id"
                :items="types"
                placeholder="ຄົ້ນຫາ"
                item-text="title"
                item-value="id"
                variant="solo"
                elevation="3"
                rounded="xl"
              ></v-select>
            </v-col>
            <v-col cols="4">
                <v-btn color="primary" elevation="0" rounded="xl" height="55" block @click="fetchProducts">ຄົ້ນຫາ</v-btn>
            </v-col>
            </v-row>
           </v-card-title>
        </v-card>
        <v-card class="my-4 " color="primary" dark elevation="3" rounded="xl" >
           <v-card-title class="d-flex align-center justify-space-between">
            <h4>ສິນຄ້າທັງໝົດ</h4>
            <!-- <v-avatar color="white" size="small" @click="addProductToCart"><v-icon size="20">mdi-arrow-right</v-icon></v-avatar> -->
           </v-card-title>
          
        </v-card>
        <v-row dense>
            <v-col cols="6" md="4" v-for="(item,i) in products" :key="i">
                <v-card class="rounded-xl" elevation="3">
                    <v-img
                        :src="'http://localhost:8000/' + item.image"
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
                        <v-btn color="primary" elevation="0" rounded="pill" variant="text" @click="addProductToCart(item)"><v-icon size="30">mdi-cart</v-icon></v-btn>
                    </div>
                </div>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
 
import { storeToRefs } from 'pinia'
import { useApiProductStore } from '@/stores/apiProduct'
import { useApiProductTypeStore } from '@/stores/apiProductType'
import { useFormat } from '@/composables/useFormat';
import { useApiCartStore } from '@/stores/apiCart';

const { formatMoneyLAK } = useFormat();

 const apiProductStore = useApiProductStore()
 const { products } = storeToRefs(apiProductStore)

 const apiProductTypeStore = useApiProductTypeStore()
 const { types } = storeToRefs(apiProductTypeStore)

 const apiCartStore = useApiCartStore()
 const { addCart, fetchCart } = apiCartStore

 const { fetchProducts } = apiProductStore
 const { fetchProductTypes } = apiProductTypeStore

 const select_id = ref(null)

 onMounted(() => {
    fetchProducts()
    fetchProductTypes()
 })

 const addProductToCart = async (item) => {
  try {

    const token = useCookie('token');
    const userId=useCookie('id');

    if (!token.value || !userId.value) {
        return navigateTo('/login')
    }

    const data = {
        user_id: userId.value,
        product_id: item.id,
        quantity: 1
    }

    await addCart(data)
    await fetchCart(userId.value)
 
  } catch (error) {
    console.log(error)
  }  
 }


</script>

    