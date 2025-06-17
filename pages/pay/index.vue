<template>
    <div class="px-2 my-4">
        <v-card  elevation="3" rounded="xl">
            <v-card-title class="bg-primary mb-2">
                <h4>ຈ່າຍເງິນ</h4>
            </v-card-title>
            <v-card-text class="d-flex align-center justify-center">
                 <div>
                    <v-img src="/static/qr.png" height="250" width="240" cover></v-img>
                 </div>
            </v-card-text>
            
        </v-card>

       <v-card elevation="3" rounded="xl" class="mt-4">
        <div>
                    <v-card-title>
                        <h4>ຈຳນວນ: <span class="text-primary">{{ formatNumber(cart.length) }}</span></h4>
                    </v-card-title>
                    <v-card-title>
                        <h4>ລາຄາ: <span class="text-primary">{{ formatMoneyLAK(cart.reduce((total, item) => total + item.product.price * item.all_quantity, 0)) }}</span> ກິບ</h4>
                    </v-card-title>
                </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" rounded="pill" size="large" variant="outlined" @click="navigateTo('/pay/comfirm')">
            <v-icon size="30">mdi-close</v-icon> ຍົກເລີກ
        </v-btn>
        <v-btn color="primary" rounded="pill" size="large" variant="elevated" @click="navigateTo('/pay/comfirm')">
            <v-icon size="30">mdi-check-decagram</v-icon> ອານຸຍາດ
        </v-btn>
      </v-card-actions>
       </v-card>
    </div>
</template>

<script setup>
import { useFormat } from '@/composables/useFormat';
import { storeToRefs } from 'pinia'
import { useApiCartStore } from '@/stores/apiCart';

const { formatMoneyLAK, formatNumber } = useFormat();

const apiCartStore = useApiCartStore()
const { cart } = storeToRefs(apiCartStore)

onMounted(() => {
    apiCartStore.fetchCart()
})
</script>